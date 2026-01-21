import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Button01 from "../components/Button01";
import axiosInstance from "../api/api";
import StripePaymentModal from '../components/StripePaymentModal';

const PaymentPage = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stripeModal, setStripeModal] = useState({
    open: false,
    clientSecret: '',
    amount: 0
  });

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const res = await axiosInstance.get(`/api/v1/payments/player/viewMyPayment`);
        setPayments(res.data.data || []);
      } catch (err) {
        console.error("Error fetching payments:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  // Handle Pay Now button
  const handlePayNow = async (sessionId) => {
    try {
      const res = await axiosInstance.put(`/api/v1/payments/player/makePayment/${sessionId}`);

      setStripeModal({
        open: true,
        clientSecret: res.data.clientSecret,
        amount: res.data.totalAmount
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handlePaymentSuccess = () => {
    setStripeModal({ open: false, clientSecret: '', amount: 0 });
    window.location.reload();
  };

  // Format date and time
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTime = (time) => {
    return new Date(time).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <main className="pt-24 px-8">
        <h1 className="text-4xl font-bold text-emerald-900 mb-6 text-center">
          Payment
        </h1>

        {loading ? (
          <p className="text-center text-gray-600">Loading payments...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
              <thead className="bg-emerald-100">
                <tr>
                  <th className="py-3 px-4 border-b text-left">Location</th>
                  <th className="py-3 px-4 border-b text-left">Date</th>
                  <th className="py-3 px-4 border-b text-left">Time</th>
                  <th className="py-3 px-4 border-b text-left">Games Played</th>
                  <th className="py-3 px-4 border-b text-left">Per Game Fee</th>
                  <th className="py-3 px-4 border-b text-left">Total Amount</th>
                  <th className="py-3 px-4 border-b text-left">Status</th>
                  <th className="py-3 px-4 border-b text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {payments.length > 0 ? (
                  payments.map((payment) => (
                    <tr key={payment._id} className="hover:bg-gray-50">
                      <td className="py-2 px-4 border-b">{payment.sessionID?.location}</td>
                      <td className="py-2 px-4 border-b">
                        {payment.sessionID?.date ? formatDate(payment.sessionID.date) : "N/A"}
                      </td>
                      <td className="py-2 px-4 border-b">
                        {payment.sessionID?.startTime && payment.sessionID?.endTime
                          ? `${formatTime(payment.sessionID.startTime)} - ${formatTime(payment.sessionID.endTime)}`
                          : "N/A"}
                      </td>
                      <td className="py-2 px-4 border-b">{payment.gamesPlayed}</td>
                      <td className="py-2 px-4 border-b">₱{payment.perGameFee}</td>
                      <td className="py-2 px-4 border-b">₱{payment.totalAmount}</td>
                      <td className="py-2 px-4 border-b">{payment.status}</td>
                      <td className="py-2 px-4 border-b">
                        {payment.status === "Pending" ? (
                          <Button01
                            buttonName={"Pay Now"}
                            onClick={() => {
                              const sessionId = payment.sessionID?._id;
                              if (sessionId) {
                                handlePayNow(sessionId);
                              } else {
                                console.error("No valid sessionID:", payment);
                                alert("Invalid payment record - contact support");
                              }
                            }}
                          />
                        ) : (
                          <span className="text-emerald-600 font-semibold">Paid</span>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" className="py-4 px-4 text-center text-gray-500">
                      No payments found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </main>

      <StripePaymentModal
        isOpen={stripeModal.open}
        clientSecret={stripeModal.clientSecret}
        amount={stripeModal.amount}
        onSuccess={handlePaymentSuccess}
        onClose={() => setStripeModal({ ...stripeModal, open: false })}
      />
    </div>
  );
};

export default PaymentPage;