import React, { useEffect, useState,useRef} from "react";
import { useDispatchCart, useCart } from "./ComponentReducer";

export  function Card (props) {
  let dispatch = useDispatchCart();
  let data = useCart();
  const priceRef=useRef();
  //logic mst
  let options = props?.options;
 
  let priceOptions = options ? Object.keys(options) : []; //Object.keys method object mei se key nikal k ek array mei store kr deta hai
  const [qty, setQty] = useState(1);//
  const [size, setSize] = useState("");
  let foodItem = props.foodItems;
 
  
  const handleAddToCart = async () => {
    let food = [];
    if (props?.foodItem) {
      for (const item of data) {
        if (item?.id === props?.foodItem?._id) {
          food = item;
          break;
        }
      } 
    }
      if (food.length !== 0) {
        if (food.size === size) {
          await dispatch({ type: "UPDATE", id: props.foodItem?._id, price: finalPrice, qty: qty });
          return
        } else if (food.size !== size) {
          await dispatch({
            type: "ADD",
            id: props?.foodItem?._id,
            name: props?.foodItem?.name,
            price: finalPrice,
            qty: qty,
            size: size,
          });
          return;
        }
       
        return;
      }
      await dispatch({
        type: "ADD",
        id: props?.foodItem?._id,
        name: foodItem?.name,
        price: finalPrice,
        qty: qty,
        size: size,
      });

    }

  

 
  let finalPrice = 0;
  if (options && options[size]) {
    finalPrice = qty * parseInt(options[size]);
  }

  useEffect(()=>{
setSize(priceRef?.current?.value)
  },[])


  return (
    <div>
      <div className="card mt-3" style={{ width: "18rem", maxHeight: "360px" }}>
        <img
          src={foodItem?.img}
          alt="food pic"
          style={{ height: "150px", objecFit: "fill" }}
        />
        <div className="card-body">
          <h5 className="card-title">{foodItem?.name}</h5>
          <p className="card-text">Some Important Content</p>
          <div className="container w-100">
            <select
              className="m-2 , h-100  bg-success rounded"
              onChange={(e) => setQty(e.target.value)}
            >
              {Array.from(Array(6), (e, i) => {
                return (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                );
              })}
            </select>
            <select
              className="m-2 h-100  bg-success rounded"
              ref={priceRef}
              onChange={(e) => setSize(e.target.value)}
            >
              {priceOptions?.map((data) => {
                return (
                  <option key={data} value={data}>
                    {data}
                  </option>
                );
              })
              }
            </select>
            
            <div className="d-inline h-100 fs-5">${finalPrice}/-</div>
            <hr></hr>
            <div
              style={{
                adding: "5px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <button
                style={{ marginTop: "15px" }}
                className={"btn btn-success justify-center ms-1"}
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Card;
