import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../api/axios";

const SessionMatchPage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Placeholder state (to be wired later)
  const [teams, setTeams] = useState({
    team1: ["Team 1 Player 1", "Team 1 Player 2"],
    team2: ["Team 2 Player 1", "Team 2 Player 2"],
  });

  const [availablePlayers, setAvailablePlayers] = useState([
    "Player A",
    "Player B",
    "Player C",
    "Player D",
  ]);

  const [matchStatus, setMatchStatus] = useState("ongoing"); // ongoing | finished

  useEffect(() => {
    // Later: fetch session + match data here
    setLoading(false);
  }, []);

  const handleStartGame = () => {
    setSuccess("Game started");
    setError("");
  };

  const handleFinishGame = () => {
    setSuccess("Game finished");
    setError("");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <main className="pt-24 px-8">
        <h1 className="text-4xl font-bold text-emerald-900 mb-6 text-center">
          Match Session
        </h1>

        {error && (
          <div className="bg-red-100 text-red-700 p-2 mb-4 rounded text-sm text-center">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-100 text-green-700 p-2 mb-4 rounded text-sm text-center">
            {success}
          </div>
        )}

        {loading && (
          <p className="text-gray-600 text-center">Loading match...</p>
        )}

        {!loading && (
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* LEFT – Teams */}
            <div className="bg-white p-6 rounded shadow flex flex-col justify-between">
              <div className="space-y-6">
                <div>
                  <p className="font-semibold mb-2">Team 1</p>
                  {teams.team1.map((player, idx) => (
                    <div
                      key={idx}
                      className="border p-3 rounded mb-2"
                    >
                      {player}
                    </div>
                  ))}
                </div>

                <div>
                  <p className="font-semibold mb-2">Team 2</p>
                  {teams.team2.map((player, idx) => (
                    <div
                      key={idx}
                      className="border p-3 rounded mb-2"
                    >
                      {player}
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={handleStartGame}
                className="mt-6 bg-emerald-700 text-white px-4 py-2 rounded hover:bg-emerald-800"
              >
                Start Game
              </button>
            </div>

            {/* CENTER – Match Status */}
            <div className="bg-white p-6 rounded shadow flex flex-col">
              <div className="flex border-b mb-6">
                <button
                  className={`px-6 py-2 font-medium ${
                    matchStatus === "ongoing"
                      ? "border-b-2 border-emerald-700 text-emerald-700"
                      : "text-gray-500"
                  }`}
                  onClick={() => setMatchStatus("ongoing")}
                >
                  Ongoing
                </button>
                <button
                  className={`px-6 py-2 font-medium ${
                    matchStatus === "finished"
                      ? "border-b-2 border-emerald-700 text-emerald-700"
                      : "text-gray-500"
                  }`}
                  onClick={() => setMatchStatus("finished")}
                >
                  Finished
                </button>
              </div>

              <div className="flex-1">
                <p className="font-semibold mb-4">
                  Game No. 1 (Queue No.)
                </p>

                <p className="font-medium mb-2">Players</p>

                <div className="space-y-3 mb-6">
                  {[...teams.team1, ...teams.team2].map(
                    (player, idx) => (
                      <div
                        key={idx}
                        className="border p-3 rounded"
                      >
                        {player}
                      </div>
                    )
                  )}
                </div>
              </div>

              <button
                onClick={handleFinishGame}
                className="self-center bg-emerald-700 text-white px-6 py-2 rounded hover:bg-emerald-800"
              >
                Finish Game
              </button>
            </div>

            {/* RIGHT – Available Players */}
            <div className="bg-white p-6 rounded shadow">
              <p className="font-semibold mb-4">
                Available Players
              </p>

              {availablePlayers.length === 0 && (
                <p className="text-gray-600">
                  No available players
                </p>
              )}

              <div className="space-y-3">
                {availablePlayers.map((player, idx) => (
                  <div
                    key={idx}
                    className="border p-3 rounded"
                  >
                    {player}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default SessionMatchPage;
