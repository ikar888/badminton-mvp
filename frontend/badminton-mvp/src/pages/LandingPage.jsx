import React, { useState } from "react";
import Navbar from "../components/Navbar";
import LoginModal from "../components/LoginModal";
import SignupModal from "../components/SignupModal";

const LandingPage = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const isModalOpen = showLogin || showSignup;

  return (
    <div className="h-screen w-full overflow-hidden relative bg-black">
      {/* Navbar */}
      <div className="fixed top-0 left-0 right-0 z-30">
        <Navbar
          onLoginClick={() => setShowLogin(true)}
          onSignupClick={() => setShowSignup(true)}
        />
      </div>

      {/* Background layer */}
      <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/bg5.1.jpg')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Hero section */}
      <main
        className={`flex flex-col items-center justify-start min-h-screen text-center px-6 pt-32 relative z-10 ${
          isModalOpen ? "blur-sm" : ""
        } transition duration-300`}
      >
        <h1 className="text-6xl font-extrabold text-lime-500 mb-5">
          Rally with the Right Partner
        </h1>
        <p className="text-2xl text-gray-100 max-w-2xl mb-8">
          Pairing up has never been simpler, find your match and play as one.
        </p>
        <button
          onClick={() => setShowLogin(true)}
          className="flex items-center gap-2 px-6 py-2 bg-lime-400 hover:bg-lime-500 text-black text-lg font-semibold rounded-full shadow-md transition duration-300"
        >
          Ready to Play? <span className="text-xl">→</span>
        </button>
      </main>

      {/* Modal layer */}
      {isModalOpen && (
        <div className="absolute inset-0 z-40 flex items-center justify-center">
          {showLogin && (
            <LoginModal
              onClose={() => setShowLogin(false)}
              openSignup={() => {
                setShowLogin(false);
                setShowSignup(true);
              }}
            />
          )}
          {showSignup && (
            <SignupModal
              onClose={() => setShowSignup(false)}
              openLogin={() => {
                setShowSignup(false);
                setShowLogin(true);
              }}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default LandingPage;
