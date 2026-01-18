import Navbar from "../components/Navbar";
import TextBox from "../components/TextBox";
import { useState } from "react";
import Button01 from "../components/Button01";

const PaymentPage = () => {

  const rowClass = "flex items-center justify-center mb-4";
  const labelClass = "text-lg font-medium text-emerald-900 w-32 text-right mr-4";
  const inputClass = "border border-gray-300 rounded px-3 py-2 w-64 focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white text-left";

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="pt-24 px-8 text-center">
        <h1 className="text-4xl font-bold text-emerald-900 mb-6">
          Payment
        </h1>
      </main>
    </div>
  );
};

export default PaymentPage;