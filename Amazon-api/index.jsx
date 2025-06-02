require("dotenv").config(); 
 console.log('Environment Variables:', process.env);
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY); 

const app = express();

app.use(cors({ origin: "https://amazon-frontend-opp.netlify.app",methods:["GET","POST"],credentials:true}));
app.use(express.json());

// Routes
app.get("/", (req, res) => res.status(200).json({ message: "Success!" }));

app.post("/payment/create", async (req, res) => {
  const total = parseInt(req.query.total);
  if (total > 0) {
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency: "usd",
      });
      res.status(201).json({ clientSecret: paymentIntent.client_secret });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  } else {
    res.status(400).json({ message: "Amount must be greater than 0" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
