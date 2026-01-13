import React, { useState } from "react";
import Navbar from "../components/Navbar";
import LoginModal from "../components/LoginModal";
import SignupModal from "../components/SignupModal";

const AboutPage = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const isModalOpen = showLogin || showSignup;

  return (
    <div className="relative min-h-screen bg-gray-900 text-gray-700 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[url('/images/bg4.jpg')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* Navbar with modal handlers */}
      <Navbar
        onLoginClick={() => setShowLogin(true)}
        onSignupClick={() => setShowSignup(true)}
      />

      <main
        className={`relative z-10 flex items-center justify-center min-h-screen px-6 ${
          isModalOpen ? "blur-sm" : ""
        } transition duration-300`}
      >
        <div className="w-full flex justify-center lg:justify-start">
          <div className="bg-black/40 backdrop-blur-md rounded-lg p-10 max-w-xl text-left">
            <h1 className="text-4xl font-bold mb-6 text-lime-400">
              About Match Matrix
            </h1>

            <p className="text-lg mb-6 text-gray-100">
              <strong>Match Matrix</strong> is a smart badminton matchmaking
              platform designed to make doubles play effortless, fair, and fun.
              Whether you're a casual player or a competitive enthusiast, our
              system ensures you get the most out of your court time.
            </p>

            <section aria-labelledby="what-we-do" className="mt-12">
              <h2
                id="what-we-do"
                className="text-2xl md:text-3xl font-semibold mb-6 text-lime-300"
              >
                What We Do
              </h2>
              <ul className="list-disc list-outside pl-6 space-y-3 text-base md:text-lg text-gray-100 leading-relaxed">
                <li>Automatically assign players into fair doubles matches.</li>
                <li>
                  Use Gemini AI to analyze player data and generate balanced
                  pairings.
                </li>
                <li>
                  Display the full game queue so everyone knows when they'll
                  play.
                </li>
              </ul>
            </section>
          </div>
        </div>
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

export default AboutPage;
