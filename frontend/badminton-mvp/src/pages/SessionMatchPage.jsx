import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../api/axios";

const SessionMatchPage = () => {
  const { sessionId } = useParams();

  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [matchStatus, setMatchStatus] = useState("ongoing");

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const res = await api.get(`/api/v1/sessions/${sessionId}`);
        setSession(res.data);
        setError("");
      } catch {
        setError("Failed to load session");
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, [sessionId]);

  const handleStartGame = async () => {
    try {
      await api.post("/api/v1/matches", { sessionId });
      setSuccess("Game started");
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to start game");
      setSuccess("");
    }
  };

  const handleFinishGame = async () => {
    const currentMatchId = session?.queue?.[0];
    if (!currentMatchId) return;

    try {
      await api.patch(`/api/v1/matches/${currentMatchId}/finish`);
      setSuccess("Game finished");
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to finish game");
      setSuccess("");
    }
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

        {!loading && session && (
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* LEFT – Teams */}
            <div className="bg-white p-6 rounded shadow flex flex-col justify-between">
              <div className="space-y-6">
                <div>
                  <p className="font-semibold mb-2">Players</p>
                  {session.players.map((player) => (
                    <div
                      key={player._id}
                      className="border p-3 rounded mb-2"
                    >
                      {player.username}
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
                  Game No. {session.queue.length || 1}
                </p>

                <p className="font-medium mb-2">Players</p>

                <div className="space-y-3 mb-6">
                  {session.players.map((player) => (
                    <div
                      key={player._id}
                      className="border p-3 rounded"
                    >
                      {player.username}
                    </div>
                  ))}
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
                Game Master
              </p>

              <div className="border p-3 rounded">
                {session.gameMasterID?.username}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default SessionMatchPage;
