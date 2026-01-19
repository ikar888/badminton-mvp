import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import Button01 from './Button01';

// ✅ CORRECT publishable key
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const PaymentForm = ({ clientSecret, amount, onSuccess, onCancel }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: { name: 'Player' }
      }
    });

    if (error) {
      alert(`Payment failed: ${error.message}`);
    } else if (paymentIntent.status === 'succeeded') {
      onSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="p-3 border rounded-lg bg-gray-50">
        <CardElement 
          className="p-3 bg-white rounded w-full"
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': { color: '#aab7c4' }
              }
            }
          }}
        />
      </div>
      
      <div className="text-right space-y-2">
        <div className="text-xl font-bold text-emerald-900">
          Total: ₱{amount?.toFixed(2)}
        </div>
        <div className="flex gap-2 justify-end pt-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <Button01 
            buttonName= {"Pay Now"}
            type="submit" disabled={!stripe}>
          </Button01>
        </div>
      </div>
    </form>
  );
};

const StripePaymentModal = ({ 
  isOpen, 
  onClose, 
  clientSecret, 
  amount,
  onSuccess 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-8 max-w-md w-full shadow-2xl border border-white/20 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h3 className="text-3xl font-bold text-emerald-900 mb-2">Complete Payment</h3>
            <p className="text-emerald-700 text-lg font-semibold">Secure via Stripe</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-900 p-2 rounded-xl hover:bg-gray-100 transition-all"
          >
            ✕
          </button>
        </div>

        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <PaymentForm 
            clientSecret={clientSecret}
            amount={amount}
            onSuccess={onSuccess}
            onCancel={onClose}
          />
        </Elements>
      </div>
    </div>
  );
};

export default StripePaymentModal;