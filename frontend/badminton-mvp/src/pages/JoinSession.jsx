import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../api/axios";

const JoinSession = () => {
  const [sessions, setSessions] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(true);
  const [joiningId, setJoiningId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const res = await api.get("/api/v1/sessions/upcoming");
        setSessions(res.data);
        setError("");
      } catch (err) {
        setError("Failed to load sessions");
      } finally {
        setLoading(false);
      }
    };

    fetchSessions();
  }, []);

  const handleJoin = async (sessionId) => {
    setJoiningId(sessionId);

    try {
      await api.patch(`/api/v1/sessions/${sessionId}/join`);

      setSuccess("Successfully joined the session");
      setError("");

      setTimeout(() => {
        navigate("/home");
      }, 1500);
    } catch (err) {
      const message = err.response?.data?.message;

      if (message === "User already joined this session") {
        setSuccess("");
        setError("You are already part of this session");
        return;
      }

      setError(message || "Failed to join session");
      setSuccess("");
    } finally {
      setJoiningId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <main className="pt-24 px-8 text-center">
        <h1 className="text-4xl font-bold text-emerald-900 mb-6">
          Join a Game Session
        </h1>

        {error && (
          <div className="bg-red-100 text-red-700 p-2 mb-4 rounded text-sm">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-100 text-green-700 p-2 mb-4 rounded text-sm">
            {success}
          </div>
        )}

        {loading && (
          <p className="text-gray-600">Loading sessions...</p>
        )}

        {!loading && sessions.length === 0 && (
          <p className="text-gray-600">
            No upcoming sessions available.
          </p>
        )}

        <div className="max-w-xl mx-auto">
          {sessions.map((session) => (
            <div
              key={session._id}
              className="bg-white p-4 rounded shadow mb-4 text-left"
            >
              <p>
                <span className="font-medium">Location:</span>{" "}
                {session.location}
              </p>

              <p>
                <span className="font-medium">Date:</span>{" "}
                {new Date(session.date).toLocaleDateString()}
              </p>

              <p>
                <span className="font-medium">Time:</span>{" "}
                {new Date(session.startTime).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}{" "}
                –{" "}
                {new Date(session.endTime).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>

              <p>
                <span className="font-medium">Fee:</span>{" "}
                ₱{session.perGameFee}
              </p>

              <button
                onClick={() => handleJoin(session._id)}
                disabled={joiningId === session._id}
                className="mt-3 bg-emerald-700 text-white px-4 py-2 rounded hover:bg-emerald-800 disabled:opacity-50"
              >
                {joiningId === session._id ? "Joining..." : "Join Session"}
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default JoinSession;
