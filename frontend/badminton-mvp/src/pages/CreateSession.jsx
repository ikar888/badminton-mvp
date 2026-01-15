import Navbar from "../components/Navbar";
import TextBox from "../components/TextBox";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CreateSession = () => {
  const [date, setDate] = useState();
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();

  const rowClass = "flex items-center justify-center mb-4";
  const labelClass = "text-lg font-medium text-emerald-900 w-32 text-right mr-4";
  const inputClass = "border border-gray-300 rounded px-3 py-2 w-64 focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white text-left";

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="pt-24 px-8 text-center">
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
            onChange={(endTime) => setEndTime(startTime)}
            showTimeSelect
            showTimeSelectOnly 
            timeIntervals={15}
            timeCaption="Time" 
            dateFormat="h:mm aa" 
            placeholderText="Select Start Time"
          />
        </div>
      </main>
    </div>
  );
};

export default CreateSession;
