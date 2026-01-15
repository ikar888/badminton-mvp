import React from "react";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import Button01 from "../components/Button01"

const HomePage = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <main className="pt-24 px-8 text-center">
        <h1 className="text-4xl font-bold text-emerald-900 mb-6">
          Welcome {user ? user.username : "to Match Matrix"}
        </h1>
        <p className="text-lg text-gray-700 mb-8">
          You're logged in! Use the navigation bar above to explore your
          sessions, profile, and payments.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold text-emerald-800 mb-2">
              Sessions
            </h2>
            <p className="text-gray-600">
              Manage your badminton sessions and find the right partner.
            </p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold text-emerald-800 mb-2">
              Profile
            </h2>
            <p className="text-gray-600">
              Update your personal details and skill level to match better.
            </p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold text-emerald-800 mb-2">
              Payments
            </h2>
            <p className="text-gray-600">
              View and manage your payment history securely.
            </p>
          </div>
        </div>
        <p className="text-xl text-gray-700 mb-2 mt-10">
          You can choose to:
        </p>
        <Button01 
        buttonName="Create a Session" 
        onClick={() => {}}/>
        <Button01 
        buttonName="Join a Session" 
        onClick={() => {}}/>
      </main>
    </div>
  );
};

export default HomePage;
