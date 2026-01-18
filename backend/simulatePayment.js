import Stripe from 'stripe';
import dotenv from 'dotenv';

// Load your environment variables from the .env file
dotenv.config(); 

// Initialize Stripe with your Secret Key from the .env file
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); 

// >>> PASTE YOUR FULL clientSecret HERE <<<
// Replace 'YOUR_CLIENT_SECRET_HERE' with the value you got from your PUT request
const CLIENT_SECRET = 'pi_3Sqn2XPdfKctJVhr2ZTre4KM'; 

const confirmTestPayment = async () => {
  if (CLIENT_SECRET === 'YOUR_CLIENT_SECRET_HERE' || !process.env.STRIPE_SECRET_KEY) {
      console.error("Please update CLIENT_SECRET and ensure STRIPE_SECRET_KEY is in your .env file.");
      return;
  }

  try {
    console.log("Confirming Payment Intent with Stripe using test method...");

    // The confirm function finalizes the payment with a test card
    const paymentIntent = await stripe.paymentIntents.confirm(
      CLIENT_SECRET,
      {
        payment_method: 'pm_card_visa', // A built-in test card token provided by Stripe
      }
    );
    console.log("Stripe API response - Status:", paymentIntent.status);
    console.log("Check your server terminal for webhook logs!");

  } catch (error) {
    console.error("Confirmation Error:", error.message);
  }
};

confirmTestPayment();