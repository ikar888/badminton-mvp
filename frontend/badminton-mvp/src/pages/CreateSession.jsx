import Navbar from "../components/Navbar";
import TextBox from "../components/TextBox";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { createSession } from "../api/sessionApi";

const CreateSession = () => {

  const [location, setLocation] = useState(""); 
  const [date, setDate] = useState();
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const [perGameFee, setPerGameFee] = useState("");
  const [sessionCode, setSessionCode] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await createSession({
        location,
        date,
        startTime,
        endTime,
        perGameFee,
      });

      const code = res.sessionId || res._id;
      setSessionCode(code);

    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to create session");
    }
  };

  const rowClass = "flex items-center justify-center mb-4";
  const labelClass = "text-lg font-medium text-emerald-900 w-32 text-right mr-4";
  const inputClass = "border border-gray-300 rounded px-3 py-2 w-64 focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white text-left";

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="pt-24 px-8 text-center">
        <form onSubmit={handleSubmit}>
            <h1 className="text-4xl font-bold text-emerald-900 mb-6">
              Create a Game Session
            </h1>
            <div className={rowClass}>
              <label 
              className={labelClass}
              >
                Location:</label>
              <TextBox 
              className = {inputClass}
              type="text"
              placeholderText="Location"
              value={location}
              onChange={(location) => setLocation(location)}
              required
              />
            </div>
            <div className={rowClass}>
              <label 
              className={labelClass}
              >
                Date:
              </label>
              <DatePicker 
                className = {inputClass}
                placeholderText="Select Date"
                selected={date} 
                onChange={(date) => setDate(date)}
                dateFormat="MMMM d, yyyy"
              />
            </div>
            <div className={rowClass}>
              <label 
              className={labelClass}
              >
                Start Time:
              </label>
              <DatePicker 
                className = {inputClass}
                selected={startTime} 
                onChange={(startTime) => setStartTime(startTime)}
                showTimeSelect
                showTimeSelectOnly 
                timeIntervals={15}
                timeCaption="Time" 
                dateFormat="h:mm aa" 
                placeholderText="Select Start Time"
              />
            </div>
            <div className={rowClass}>
              <label
              className={labelClass}
              >
                End Time:
              </label>
              <DatePicker 
                className = {inputClass}
                selected={endTime} 
                onChange={(endTime) => setEndTime(endTime)}
                showTimeSelect
                showTimeSelectOnly 
                timeIntervals={15}
                timeCaption="Time" 
                dateFormat="h:mm aa" 
                placeholderText="Select Start Time"
              />
            </div>

            <div className={rowClass}>
            <label className={labelClass}
              >
                Per Game Fee:
              </label>
              <TextBox
                className={inputClass}
                type="number"
                placeholderText="Per Game Fee"
                value={perGameFee}
                onChange={(perGameFee) => setPerGameFee(perGameFee)}
                required
              />
            </div>
              <button
                type="submit"
                className="bg-emerald-700 text-white px-6 py-2 rounded hover:bg-emerald-800"
                >
                Create Session
            </button>

            {sessionCode && (
              <div className="mt-6 text-emerald-900">
                <p className="text-lg font-medium">Session Code:</p>
                <p className="mt-2 font-mono bg-white px-4 py-2 rounded border inline-block">
                  {sessionCode}
                </p>
              </div>
            )}

          </form>
        </main>
    </div>
  );
};

export default CreateSession;
