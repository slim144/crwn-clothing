import { useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useDispatch, useSelector } from "react-redux";

import { selectCartTotal } from "../../store/cart/cart.selector";
import { selectCurrentUser } from "../../store/user/user.selector";

import { BUTTON_TYPE_CLASSES } from "../button/button.component";

import {
  FormContainer,
  PaymentFormContainer,
  FormButton,
} from "./payment-form.styles";
import { clearCartItems } from "../../store/cart/cart.action";

function PaymentForm() {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const amount = useSelector(selectCartTotal);
  const currentUser = useSelector(selectCurrentUser);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  const paymentHandler = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    setIsProcessingPayment(true);

    const response = await fetch("/.netlify/functions/create-payment-intent", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: amount * 100 }),
    }).then((res) => res.json());

    const {
      paymentIntent: { client_secret },
    } = response;

    const paymentResult = await stripe.confirmCardPayment(client_secret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: currentUser ? currentUser.displayName : "Guest",
        },
      },
    });

    setIsProcessingPayment(false);

    if (paymentResult.error) {
      alert(paymentResult.error);
    } else {
      if (paymentResult.paymentIntent.status === "succeeded") {
        dispatch(clearCartItems());
        alert("Payment Successful");
      }
    }
  };
  return (
    <PaymentFormContainer onSubmit={paymentHandler}>
      <FormContainer>
        <h2>Credit Card Payment:</h2>
        <CardElement />
        <FormButton
          isLoading={isProcessingPayment}
          buttonType={BUTTON_TYPE_CLASSES.inverted}
        >
          Pay Now
        </FormButton>
      </FormContainer>
    </PaymentFormContainer>
  );
}

export default PaymentForm;
