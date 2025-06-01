import React, { useContext, useState, useEffect } from "react";
import LayOut from "../../Components/LayOut/LayOut";
import style from "./Orders.module.css";
import { db } from "../../Utility/Firebase";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import ProductCard from "../../Components/Products/ProductCard";

function Order() {
  const [{ user }, dispatch] = useContext(DataContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user) {
      const ordersRef = collection(db, "users", user.uid, "orders");
      const q = query(ordersRef, orderBy("created", "desc"));

      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const ordersData = snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }));
          console.log("Snapshot:", snapshot);
          console.log("Orders Data:", ordersData);
          setOrders(ordersData);
        },
        (error) => {
          console.error("Error fetching orders:", error);
          setOrders([]); // Clear orders on error
        }
      );

      // Cleanup listener on component unmount
      return () => unsubscribe();
    } else {
      setOrders([]); // Clear orders if no user
    }
  }, [user]);

  // Helper function to format the 'created' field
  const formatDate = (created) => {
    if (!created) return "N/A";
    // Handle Firestore Timestamp
    if (created && typeof created.toDate === "function") {
      return new Date(created.toDate()).toLocaleString();
    }
    // Handle string date (e.g., ISO string)
    if (typeof created === "string") {
      const date = new Date(created);
      return isNaN(date.getTime()) ? "Invalid Date" : date.toLocaleString();
    }
    // Handle Unix timestamp (number in milliseconds)
    if (typeof created === "number") {
      return new Date(created).toLocaleString();
    }
    return "Unknown Date Format";
  };

  return (
    <LayOut>
      <section className={style.container}>
        <div className={style.orders_container}>
          <h2>Your Orders</h2>
          {orders.length === 0 ? (
            <p>No orders found.</p>
          ) : (
            orders.map((eachOrder) => (
              <div key={eachOrder.id} className={style.order_item}>
                <hr />
                <p>Order ID: {eachOrder.id}</p>
                {/* <p>Order Date: {formatDate(eachOrder.data.created)}</p> */}
                {eachOrder.data.basket?.length > 0 ? (
                  eachOrder.data.basket.map((item) => {
                    console.log("Basket Item:", item);
                    return (
                      <ProductCard flex={true} product={item} key={item.id} />
                    );
                  })
                ) : (
                  <p>No items in this order.</p>
                )}
              </div>
            ))
          )}
        </div>
      </section>
    </LayOut>
  );
}

export default Order;
