import Navbar from "../components/Navbar";
import TextBox from "../components/TextBox";
import { useState } from "react";
import Button01 from "../components/Button01";

const ProfilePage = () => {
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
          My Profile
        </h1>
        <div className={rowClass}>
          <label 
          className={labelClass}
          >
            Name:</label>
          <TextBox 
          className = {inputClass}
          type="text"
          placeholderText="name"
          required
          />
        </div>
        <div className={rowClass}>
          <label 
          className={labelClass}
          >
            Email:
          </label>
          <TextBox 
            className = {inputClass}
            type="email"
            placeholderText="email"
            required
          />
        </div>
        <div className={rowClass}>
          <label 
          className={labelClass}
          >
            Password:
          </label>
          <TextBox 
            className = {inputClass}
            type="text"
            placeholderText="********"
            required
          />
        </div>
        <div className={rowClass}>
          <label
          className={labelClass}
          >
            Skill Level:
          </label>
          <TextBox 
            className = {inputClass}
            type="text"
            placeholderText="Skill Level"
            required
          />
        </div>
        <div>
          <Button01 
            buttonName="Edit Profile" 
            onClick={() => {}}
          />
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;