import Navbar from "../components/Navbar";
import TextBox from "../components/TextBox";
import { useState, useEffect } from "react";
import Button01 from "../components/Button01";
import axiosInstance from "../api/api";
import { uploadAndAnalyzeVideo } from "../api/videoApi";

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    username: "",
    email: "",
    password: "",
    skillLevel: "",
  });
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);

  const inputClass =
    "border border-gray-300 rounded px-3 py-2 w-full focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white";

  // Fetch profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profile = await axiosInstance.get("/api/v1/users/me", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        const { username, email, skillLevel } = profile.data.user;
        setProfileData((prev) => ({ ...prev, username, email, skillLevel }));
      } catch (error) {
        setError(error.response?.data?.message || "Failed to Fetch Profile");
        setTimeout(() => setError(""), 3000);
      }
    };
    fetchProfile();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
    setSuccess("");
    setError("");
  };

  // Handle save/update
  const handleSave = async () => {
    try {
      await axiosInstance.put("/api/v1/users/me", profileData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setSuccess("Profile saved!");
      setError("");
      setIsEditing(false);
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to Update Profile");
      setTimeout(() => setError(""), 3000);
    }
  };

  // Handle video upload
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    setLoading(true);
    try {
      const result = await uploadAndAnalyzeVideo(selectedFile);
      setAnalysisResult(result.insights || result);
    } catch (err) {
      setError("Video analysis failed. Check console for details.");
      setTimeout(() => setError(""), 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="pt-24 px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Profile Card */}
          <div className="bg-white shadow rounded-lg p-8">
            <h1 className="text-3xl font-bold text-emerald-900 mb-8">
              My Profile
            </h1>
            <form className="space-y-6">
              <div>
                <label
                  htmlFor="profile-name"
                  className="block text-lg font-medium text-emerald-900 mb-2"
                >
                  Name
                </label>
                <TextBox
                  id="profile-name"
                  name="username"
                  className={inputClass}
                  type="text"
                  value={profileData.username}
                  onChange={handleChange}
                  placeholderText="Enter your name"
                  required
                  disabled={!isEditing}
                />
              </div>
              <div>
                <label
                  htmlFor="profile-email"
                  className="block text-lg font-medium text-emerald-900 mb-2"
                >
                  Email
                </label>
                <TextBox
                  id="profile-email"
                  name="email"
                  className={inputClass}
                  type="email"
                  value={profileData.email}
                  onChange={handleChange}
                  placeholderText="Enter your email"
                  required
                  disabled={!isEditing}
                />
              </div>
              <div>
                <label
                  htmlFor="profile-password"
                  className="block text-lg font-medium text-emerald-900 mb-2"
                >
                  Password
                </label>
                <TextBox
                  id="profile-password"
                  name="password"
                  className={inputClass}
                  type="password"
                  value={profileData.password}
                  onChange={handleChange}
                  placeholderText="********"
                  required
                  disabled={!isEditing}
                />
              </div>
              <div>
                <label
                  htmlFor="profile-skill"
                  className="block text-lg font-medium text-emerald-900 mb-2"
                >
                  Skill Level
                </label>
                <div>
                  <label
                    htmlFor="profile-skill"
                    className="block text-lg font-medium text-emerald-900 mb-2"
                  ></label>
                  <select
                    id="profile-skill"
                    name="skillLevel"
                    className={inputClass}
                    value={profileData.skillLevel}
                    onChange={handleChange}
                    required
                    disabled={!isEditing}
                  >
                    <option value="">Select skill level</option>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>
              </div>

              <div className="pt-4">
                {!isEditing ? (
                  <Button01
                    buttonName="Edit Profile"
                    onClick={() => {
                      setIsEditing(true);
                      setSuccess("");
                      setError("");
                    }}
                  />
                ) : (
                  <Button01 buttonName="Save Changes" onClick={handleSave} />
                )}
              </div>
            </form>
            {success && <p className="text-green-600 mt-4">{success}</p>}
            {error && <p className="text-red-600 mt-4">{error}</p>}
          </div>

          {/* Training Video + AI Insight */}
          <div className="flex flex-col space-y-6">
            <div className="bg-white shadow rounded-lg p-8">
              <h2 className="text-2xl font-semibold text-emerald-900 mb-4">
                Upload Training Video
              </h2>
              <input
                type="file"
                accept="video/mp4"
                onChange={handleFileChange}
                className="mb-4"
              />
              <Button01
                buttonName={loading ? "Analyzing..." : "Upload & Analyze"}
                onClick={handleUpload}
              />
              {loading && (
                <div className="mt-4 flex justify-center">
                  <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
            </div>

            {analysisResult && (
              <div className="bg-white shadow rounded-lg p-8 border border-emerald-200 h-96 overflow-y-auto">
                <h3 className="text-2xl font-bold text-emerald-900 mb-4">
                  AI Insight
                </h3>
                <div className="text-gray-800 whitespace-pre-wrap leading-relaxed">
                  {analysisResult.raw || analysisResult}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
