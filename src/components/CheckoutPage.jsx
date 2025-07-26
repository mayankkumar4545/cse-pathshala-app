import React from "react";
import { useParams } from "react-router-dom";

const CheckoutPage = () => {
  const { courseId } = useParams();
  return (
    <div style={{ padding: "5rem", textAlign: "center" }}>
      <h1>Checkout Page</h1>
      <p>
        Proceed to buy course with ID: <strong>{courseId}</strong>
      </p>
      <p>
        This is where you would integrate a payment gateway like Stripe or
        Razorpay.
      </p>
    </div>
  );
};

export default CheckoutPage;
