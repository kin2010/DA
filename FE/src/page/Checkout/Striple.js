// import { loadStripe } from "@stripe/stripe-js";

// import { useState } from "react";
// import {
//   CardElement,
//   Elements,
//   useStripe,
//   useElements,
// } from "@stripe/react-stripe-js";
// const stripePromise = loadStripe(
//   "pk_test_51NKDEsDy0gZZz52q6HuzrcxfxrhWQ16Z3HEKHR3od9eMmHHdHQidyH8p4Q0C7JMyjmgGcbFKMGzAoYVHyl8TMUab00hmRo6OpJ"
// );

// export function PaymentForm() {
//   const [error, setError] = useState(null);
//   const stripe = useStripe();
//   const elements = useElements();

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     if (!stripe || !elements) {
//       // Stripe.js has not yet loaded.
//       // Make sure to disable form submission until Stripe.js has loaded.
//       return;
//     }

//     // Create a payment method using CardElement
//     const cardElement = elements.getElement(CardElement);
//     const result = await stripe.createPaymentMethod({
//       type: "card",
//       card: cardElement,
//     });

//     if (result.error) {
//       setError(result.error.message);
//     } else {
//       // Payment method created successfully
//       // Process the payment on your server
//       const paymentMethodId = result.paymentMethod.id;
//       // Send paymentMethodId to your server for further processing
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <CardElement />
//       <button type="submit" disabled={!stripe}>
//         Pay
//       </button>
//       {error && <div>{error}</div>}
//     </form>
//   );
// }

import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";

export const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const result = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: "https://example.com/order/123/complete",
      },
    });

    if (result.error) {
      // Show error to your customer (for example, payment details incomplete)
      console.log(result.error.message);
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button disabled={!stripe}>Submit</button>
    </form>
  );
};
