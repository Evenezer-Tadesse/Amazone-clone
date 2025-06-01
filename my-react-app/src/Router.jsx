import React from 'react'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Landing from "./Pages/Landing/Landing"
import Auth from './Pages/Auth/Auth'
import Payment from './Pages/Payment/Payment'
import Order from './Pages/Order/Order'
import Cart from './Pages/Cart/Cart'
import Result from './Pages/Results/Result'
import ProductDetail from './Pages/ProductDetail/ProductDetail'
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import ProtectedRoute from "./Components/Protection/ProtectionRoute";
const stripePromise = loadStripe(
  "pk_test_51RV6BL4D93HZISpqXvUsF6eBL45BMl02QoOrNteeVqay4q0GFJbDMo7AZZcTXeehqDoQs2yNgMgeYfUuaBDYfida007RQHOlxm"
);


function Routing() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Auth />} />
        <Route
          path="/payments"
          element={
            <ProtectedRoute
              msg={"please log in to proceed with payment"}
              redirect={"/payments"}
            >
              <Elements stripe={stripePromise}>
                <Payment />
              </Elements>
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedRoute
              msg={"You must log in to complete your order"}
              redirect={"/orders"}
            >
              <Order />
            </ProtectedRoute>
          }
        />
        <Route path="/category/:categoryName" element={<Result />} />
        <Route path="/products/:productId" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
  );
}

export default Routing;
