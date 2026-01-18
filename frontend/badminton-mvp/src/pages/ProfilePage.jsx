import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Navbar from "../components/Navbar";
import TextBox from "../components/TextBox";
import Button01 from "../components/Button01";
import axiosInstance from "../api/api";

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    username: "",
    email: "",
    password: "",
    skillLevel: ""
  });
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const rowClass = "flex items-center justify-center mb-4";
  const labelClass = "text-lg font-medium text-emerald-900 w-32 text-right mr-4";
  const inputClass = `border border-gray-300 rounded px-3 py-2 w-64 focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white text-left 
  ${!isEditing ? "pointer-events-none caret-transparent cursor-default select-none focus:ring-0" : "caret-black cursor-text"}`;

  useEffect (() => {
    const fetchProfile = async() => {
      try {
        const profile = await axiosInstance.get(
          "/api/v1/users/me"
        )
        const { username, email, skillLevel } = profile.data.user;
        setProfileData((prev) => ({ ...prev, username, email, skillLevel }));
      } catch (error) {
        setError(error.response?.data?.message || "Failed to Fetch Profile");
        setSuccess("");
      }
    }
    fetchProfile();
  },[]);

    const handleButtonClick = async () => {
    if (!isEditing) {
      setIsEditing(true);
    } else {
      await handleUpdate(); 
      setIsEditing(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  }

  const handleUpdate = async () => {
    try {
      await axiosInstance.put("/api/v1/users/me", profileData)
      setSuccess("Profile Successfully Updated");
      setError("");
    } catch (err) {
        setError(err.response?.data?.message || "Failed to Update Profile");
        setSuccess("");
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="pt-24 px-8 text-center">
        <h1 className="text-4xl font-bold text-emerald-900 mb-6">
          My Profile
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
        <div className={rowClass}>
          <label 
          className={labelClass}
          >
            Name:</label>
          <TextBox
            className={inputClass}
            name="username"
            value={profileData.username}
            onChange={handleChange}
            type="text"
            placeholderText="Full Name"
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
            name="email"
            value={profileData.email}
            onChange={handleChange}
            type="email"
            placeholderText="Email"
            required
          />
        </div>
        <div className={rowClass}>
          <label 
          className={labelClass}
          >
            Password:
          </label>
          <div className="relative w-64">
          <TextBox 
            name="password"
            value={profileData.password}
            onChange={handleChange}
            className = {inputClass}
            type={showPassword ? "text" : "password"}
            placeholderText={"********"}
            required
          />
    {isEditing && (
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-700 hover:text-emerald-900"
      >
        {showPassword ? <FaEyeSlash /> : <FaEye />}
      </button>
    )}
            </div>
        </div>
        <div className={rowClass}>
          <label
          className={labelClass}
          >
            Skill Level:
          </label>
          <select
            name="skillLevel"
            value={profileData.skillLevel}
            onChange={handleChange}
            className = {inputClass}
          >
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>
        <div>
          <Button01 
              buttonName={isEditing ? "Save" : "Update Profile"} 
              onClick={handleButtonClick} 
          />
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;