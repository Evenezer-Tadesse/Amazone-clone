import React, { useContext, useState } from "react";
import LayOut from "../../Components/LayOut/LayOut";
import style from "./Payment.module.css";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import ProductCard from "../../Components/Products/ProductCard";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import CurrencyFormat from "../../Components/CurrencyFormat/Currency";
import { axiosInstance } from "../../Api/axios";
import { doc, setDoc, collection } from "firebase/firestore";
import { db } from "../../Utility/Firebase";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { Type } from "../../Utility/action.type";

function Payment() {
  const [{ user, basket }, dispatch] = useContext(DataContext);

  const totalItem = basket?.reduce((amount, item) => amount + item.amount, 0);
  const total = basket.reduce(
    (amount, item) => item.price * item.amount + amount,
    0
  );

  const [cardError, setCardError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const stripe = useStripe();
  const elements = useElements();

  const handleChange = (e) => {
    e?.error?.message ? setCardError(e.error.message) : setCardError(null);
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      setCardError("Stripe is not ready.");
      return;
    }

    setProcessing(true);

    try {
      // 1. Get clientSecret from backend
      const response = await axiosInstance.post(
        `/payment/create?total=${total * 100}`
      );
      const clientSecret = response.data?.clientSecret;

      if (!clientSecret) {
        throw new Error("Client secret not received from server.");
      }

      // 2. Confirm card payment
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      console.log("Stripe result:", result);

      if (result.error) {
        setCardError(result.error.message);
        setProcessing(false);
        return;
      }

      if (result.paymentIntent.status === "succeeded") {
        const paymentIntent = result.paymentIntent;

        // 3. Save order to Firestore
        const orderRef = doc(
          collection(db, "users", user.uid, "orders"),
          paymentIntent.id
        );
        await setDoc(orderRef, {
          basket,
          amount: paymentIntent.amount,
          created: paymentIntent.created,
        });

        // 4. Clear basket
        dispatch({ type: Type.EMPTY_BASKET });
        setSuccess(true);
        setProcessing(false);

        // 5. Redirect
        navigate("/orders", { state: { msg: "You have placed a new order" } });
      } else {
        setCardError("Payment was not successful.");
        setProcessing(false);
      }
    } catch (err) {
      console.error("Payment Error:", err.message);
      setCardError("Payment failed. Please try again.");
      setProcessing(false);
    }
  };

  return (
    <LayOut>
      <div className={style.main_payment}>Checkout ({totalItem}) items</div>

      <section className={style.payment}>
        {/* Address */}
        <div className={style.cash}>
          <h3>Delivery Address</h3>
          <div>
            <div>{user?.email}</div>
            <div>123 React Lane</div>
            <div>Kasanga, Uganda</div>
          </div>
        </div>

        <hr />

        {/* Products */}
        <div className={style.cash}>
          <h3>Review items and delivery</h3>
          <div>
            {basket?.map((item, index) => (
              <ProductCard product={item} flex={true} key={index} />
            ))}
          </div>
        </div>

        <hr />

        {/* Payment form */}
        <div className={style.cash}>
          <h3>Payment Method</h3>
          <div className={style.payment_container}>
            <div className={style.lower_payment}>
              <form onSubmit={handlePayment}>
                {cardError && (
                  <small style={{ color: "red" }}>{cardError}</small>
                )}
                {success && (
                  <small style={{ color: "green" }}>Payment succeeded!</small>
                )}

                <CardElement onChange={handleChange} />

                <div className={style.price_payment}>
                  <div>
                    <span className={style.mex}>
                      <p>Total Order |</p> <CurrencyFormat amount={total} />
                    </span>
                  </div>
                  <button type="submit" disabled={processing}>
                    {processing ? (
                      <div className={style.loding}>
                        <ClipLoader color="gray" size={12} />
                        <p>please wait ...</p>
                      </div>
                    ) : (
                      "Pay Now"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </LayOut>
  );
}

export default Payment;
