import Session from "../models/session.js";

export const createSession = async (req, res) => {
  try {
    const { date, startTime, endTime, perGameFee, location } = req.body;

    if (!date || !startTime || !endTime || !perGameFee || !location) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newStartTime = new Date(startTime);
    const newEndTime = new Date(endTime);

    if (newStartTime >= newEndTime) {
      return res.status(400).json({
        message: "Start time must be before end time",
      });
    }

    const existingSessions = await Session.find({
      gameMasterID: req.user._id,
      date,
    });

    for (const session of existingSessions) {
      const existingStart = new Date(session.startTime);
      const existingEnd = new Date(session.endTime);

      if (
        newStartTime < existingEnd &&
        newEndTime > existingStart
      ) {
        return res.status(400).json({
          message: "Session time overlaps with an existing session",
        });
      }
    }

    const session = await Session.create({
      gameMasterID: req.user._id,
      date,
      startTime: newStartTime,
      endTime: newEndTime,
      perGameFee,
      location,
    });

    res.status(201).json(session);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const joinSession = async (req, res) => {
  try {
    const session = await Session.findById(req.params.id);

    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    const userId = req.user._id.toString();

    if (session.players.includes(userId)) {
      return res.status(400).json({
        message: "User already joined this session",
      });
    }

    session.players.push(userId);
    await session.save();

    return res.status(200).json(session);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getSessionById = async (req, res) => {
  try {
    const { sessionId } = req.params;

    const session = await Session.findById(sessionId)
      .populate("players", "username email");

    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    const userId = req.user._id.toString();

    const isGameMaster =
      session.gameMasterID.toString() === userId;

    const isParticipant =
      session.players.some(id => id.toString() === userId);

    if (!isGameMaster && !isParticipant) {
      return res.status(403).json({
        message: "Not authorized to view this session",
      });
    }

    return res.status(200).json(session);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
