import Match from "../models/match.js";
import Session from "../models/session.js";
import Payment from "../models/payment.js";

export const createMatchFromSession = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const { teamA, teamB } = req.body;

    if (!Array.isArray(teamA) || !Array.isArray(teamB)) {
      return res.status(400).json({ message: "Teams must be arrays" });
    }

    if (teamA.length !== 2 || teamB.length !== 2) {
      return res.status(400).json({
        message: "Each team must have exactly 2 players",
      });
    }

    const allPlayers = [...teamA, ...teamB];
    const uniquePlayers = new Set(allPlayers);

    if (uniquePlayers.size !== allPlayers.length) {
      return res.status(400).json({ message: "Duplicate players detected" });
    }

    const session = await Session.findById(sessionId);
    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    if (session.gameMasterID.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const sessionPlayers = session.players.map(id => id.toString());
    const invalidPlayers = allPlayers.filter(
      id => !sessionPlayers.includes(id)
    );

    if (invalidPlayers.length > 0) {
      return res.status(400).json({
        message: "Some players are not part of this session",
      });
    }

    const activeMatch = await Match.findOne({
      sessionID: session._id,
      status: { $in: ["Scheduled", "Ongoing"] },
      $or: [
        { teamA: { $in: allPlayers } },
        { teamB: { $in: allPlayers } },
      ],
    });

    if (activeMatch) {
      return res.status(400).json({
        message: "One or more players already have an active match",
      });
    }

    const matchCount = await Match.countDocuments({
      sessionID: session._id
    });

    const match = await Match.create({
      sessionID: session._id,
      teamA,
      teamB,
      status: "Scheduled",
      sequenceNumber: matchCount + 1
    });

    session.queue.push(match._id);
    await session.save();

    res.status(201).json(match);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const startMatch = async (req, res) => {
  try {
    const { id } = req.params;

    const match = await Match.findById(id);
    if (!match) {
      return res.status(404).json({ message: "Match not found" });
    }

    if (match.status !== "Scheduled") {
      return res.status(400).json({
        message: "Only scheduled matches can be started",
      });
    }

    const session = await Session.findById(match.sessionID);
    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    if (session.gameMasterID.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    match.status = "Ongoing";
    await match.save();

    return res.status(200).json(match);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const completeMatch = async (req, res) => {
  try {
    const { id } = req.params;

    const match = await Match.findById(id);
    if (!match) {
      return res.status(404).json({ message: "Match not found" });
    }

    if (match.status !== "Ongoing") {
      return res.status(400).json({
        message: "Only ongoing matches can be completed",
      });
    }

    const session = await Session.findById(match.sessionID);
    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    if (session.gameMasterID.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    match.status = "Completed";
    await match.save();

    const players = [...match.teamA, ...match.teamB];

    for (const playerId of players) {
      let payment = await Payment.findOne({
        playerID: playerId,
        sessionID: session._id,
      });

      if (!payment) {
        payment = await Payment.create({
          playerID: playerId,
          gameMasterID: session.gameMasterID,
          sessionID: session._id,
          gamesPlayed: 1,
          perGameFee: session.perGameFee,
          totalAmount: session.perGameFee,
          status: "Pending",
        });
      } else {
        payment.gamesPlayed += 1;
        payment.totalAmount =
          payment.gamesPlayed * payment.perGameFee;

        await payment.save();
      }
    }

    return res.status(200).json({
      match, 
      message: "Match Completed and Payments updated"
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const substitutePlayer = async (req, res) => {
  try {
    const { id } = req.params;
    const { playerInId, playerOutId, team } = req.body;

    const match = await Match.findById(id);
    if (!match) {
      return res.status(404).json({ message: "Match not found" });
    }

    if (match.status !== "Scheduled") {
      return res.status(400).json({
        message: "Substitution only allowed before match starts",
      });
    }

    const session = await Session.findById(match.sessionID);
    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    if (session.gameMasterID.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    if (team === "A") {
      match.teamA = match.teamA
        .filter(id => id.toString() !== playerOutId)
        .concat(playerInId);
    } else if (team === "B") {
      match.teamB = match.teamB
        .filter(id => id.toString() !== playerOutId)
        .concat(playerInId);
    } else {
      return res.status(400).json({ message: "Invalid team" });
    }

    await match.save();
    return res.status(200).json(match);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getMatchesBySession = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const session = await Session.findById(sessionId);

    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    const userId = req.user._id.toString();

    const isGameMaster =
      session.gameMasterID.toString() === userId;

    const isParticipant =
      session.players.some(id => id.toString() === userId);

    if (!isGameMaster && !isParticipant) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const matches = await Match.find({ sessionID: sessionId })
      .populate("teamA teamB", "username email")
      .sort({ createdAt: -1 });

    return res.status(200).json(matches);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
