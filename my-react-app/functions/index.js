const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const stripe = require("stripe")(process.env.STRIPE_KEY);

const app = express();
app.use(cors({ origin: true }));

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Success !",
  });
});
// app.listen(5050,)
app.post("/payment/create", async (req, res) => {
  const total = parseInt(req.query.total);
  //    console.log("total: " + total);
  if (total > 0) {
    // console.log("payment recived", total);
    // res.send(total)
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: "USD",
    });
    // console.log("paymentIntent")
    res.status(201).json({
      clientSecret: paymentIntent.client_secret,
    });
  } else {
    res.status(401).json({
      message: "total must be grater than 0",
    });
  }
});

exports.api = onRequest(app);
