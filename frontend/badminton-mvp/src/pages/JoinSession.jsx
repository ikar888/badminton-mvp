import Navbar from "../components/Navbar";
import TextBox from "../components/TextBox";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const JoinSession = () => {
  const [sessionCode, setSessionCode] = useState("");
  const navigate = useNavigate();

  const rowClass = "flex items-center justify-center mb-4";
  const labelClass =
    "text-lg font-medium text-emerald-900 w-32 text-right mr-4";
  const inputClass =
    "border border-gray-300 rounded px-3 py-2 w-64 focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white text-left";

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!sessionCode.trim()) {
      alert("Session code is required");
      return;
    }

    try {
      await api.patch(`/api/v1/sessions/${sessionCode}/join`);
      navigate("/home");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to join session");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <main className="pt-24 px-8 text-center">
        <form onSubmit={handleSubmit}>
          <h1 className="text-4xl font-bold text-emerald-900 mb-6">
            Join a Game Session
          </h1>

          <div className={rowClass}>
            <label className={labelClass}>Session Code:</label>
            <TextBox
              className={inputClass}
              type="text"
              placeholderText="Enter session code"
              value={sessionCode}
              onChange={(value) => setSessionCode(value)}
              required
            />
          </div>

          <button
            type="submit"
            className="bg-emerald-700 text-white px-6 py-2 rounded hover:bg-emerald-800"
          >
            Join Session
          </button>
        </form>
      </main>
    </div>
  );
};

export default JoinSession;
