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
  // console.log(user);

  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);

  const total = basket.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0);

  const [cardError, setCardError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const navigate = useNavigate();

  const stripe = useStripe();
  const elements = useElements();

  const handleChange = (e) => {
    console.log(e);
    e?.error?.message ? setCardError(e?.error?.message) : setCardError("");
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    try {
      //! 1. backend functions ==> contact to the client secret
      const response = await axiosInstance({
        method: "POST",
        url: `/payment/create?total=${total * 100}`,
      });
      console.log(response.data);

      const clientSecret = response.data?.clientSecret;
      //! 2. client side ==> (react side confirmation)
      const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      //! 3. after the confirmation ==> firebase database save, clear basket
      // await db
      //   .collection("users")
      //   .doc(user.uid)
      //   .collection("orders")
      //   .doc(paymentIntent.id)
      //   .set({
      //     basket: basket,
      //     amount: paymentIntent.amount,
      //     created: paymentIntent.created,
      //   });

      const orderRef = doc(
        collection(db, "users", user.uid, "orders"),
        paymentIntent.id
      );
      await setDoc(orderRef, {
        basket: basket,
        amount: paymentIntent.amount,
        created: paymentIntent.created,
      });

      // making basket empety
      dispatch({ type: Type.EMPTY_BASKET });

      setProcessing(false);
      navigate("/orders", { state: { msg: "you have placed new orders" } });
    } catch (error) {
      console.log(error);
      setProcessing(false);
    }
  };

  return (
    <LayOut>
      {/* header */}
      <div className={style.main_payment}>Checkout ({totalItem}) items</div>

      {/* payment method */}
      <section className={style.payment}>
        {/* address */}
        <div className={style.cash}>
          <h3>Delivery Address</h3>
          <div>
            <div>{user?.email}</div>
            <div>123 React Lane</div>
            <div>Kasanga,Uganda</div>
          </div>
        </div>

        <hr />

        {/* product */}
        <div className={style.cash}>
          <h3>Review items and delivery</h3>
          <div>
            {basket?.map((item) => (
              <ProductCard product={item} flex={true} />
            ))}
          </div>
        </div>

        <hr />

        {/* card form */}
        <div className={style.cash}>
          <h3>Payment method</h3>
          <div className={style.payment_container}>
            <div className={style.lower_payment}>
              <form onSubmit={handlePayment}>
                {cardError && (
                  <small style={{ color: "red" }}>{cardError}</small>
                )}
                {/* cart element */}
                <CardElement onChange={handleChange} />

                {/* price */}
                <div className={style.price_payment}>
                  <div>
                    <span className={style.mex}>
                      <p>Total Order |</p> <CurrencyFormat amount={total} />
                    </span>
                  </div>
                  <button type="submit">
                    {processing ? (
                      <div className={style.loding}>
                        <ClipLoader color="gray" size={12} />
                        <p>please wait ....</p>
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
