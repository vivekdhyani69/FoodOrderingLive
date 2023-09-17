import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function MyOrder() {
  const [orderData, setorderData] = useState({});
  const fetchMyOrder = async () => {
    try {
      console.log(localStorage.getItem("userEmail"));
      const response = await fetch("https://yazhwin-assignment.vercel.app/api/myorderData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: localStorage.getItem("userEmail"),
        }),
      });

      if (!response.ok) {
        // Handle the error response, if needed
        throw new Error("Network response was not ok.");
      }

      const data = await response.json();
      console.log(data);
      setorderData(data);
    } catch (error) {
      // Handle any errors that occur during the fetch or data parsing process
      console.error("Error fetching data:", error);
      // Optionally, set a default value for orderData or display an error message to the user
      setorderData([]);
    }
  };

  useEffect(() => {
    fetchMyOrder();
  }, []);

  return (
    <div>
      <div>
        <Navbar />
      </div>

      <div className="container">
        <div className="row">
          <div className="row">
            <div className="row">
              {Array.isArray(orderData) && orderData.length > 0 ? (
                orderData.map((innerArray, index) => {
                  // Check if innerArray is an array
                  if (Array.isArray(innerArray)) {
                    return (
                      <div key={index}>
                        {/* This is a date section */}
                        {innerArray.map((order, orderIndex) => (
                          <div
                            key={orderIndex}
                            className="col-12 col-md-6 col-lg-3"
                          >
                            <div
                              className="card mt-3"
                              style={{ width: "16rem", maxHeight: "360px",margin: "auto"}}
                            >
                              Order-Date {order.Order_date}
                              Name:{order.name}
                              <br />
                              Price: {order.price}
                              <br />
                              quantity: {order.qty}
                              <br />
                              Size: {order.size}
                              <hr />
                            </div>
                          </div>
                        ))}
                      </div>
                    );
                  } else if (
                    typeof innerArray === "object" &&
                    innerArray.Order_date
                  ) {
                    // This is also a date section but not inside an array
                    return (
                      <div key={index} className="m-auto mt-5">
                        {innerArray.Order_date}

                        <hr />
                      </div>
                    );
                  } else {
                    // This is an order detail section
                    return (
                      <div key={index} className="col-12 col-md-6 col-lg-3">
                        <div
                          className="card mt-3"
                          style={{ width: "16rem", maxHeight: "360px" }}
                        >
                        
                          Name :{innerArray.name}
                          <br />
                          Price: {innerArray.price}
                          <br />
                          quantity : {innerArray.qty}
                          <br />
                          Size : {innerArray.size}
                        </div>
                      </div>
                    );
                  }
                })
              ) : (
                <div>No order data available</div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
}
