import React, { useReducer, useContext, createContext } from "react";

const CartStateContext = createContext();
const CartDispatchContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return [
        ...state,
        {
          id: action.id,
          name: action.name,
          price: action.price,
          qty: action.qty,
          size: action.size,
          img: action.img,
        },
      ];
      case "REMOVE":
        let newArr = [...state]; // Copy the state array
        newArr.splice(action.index, 1); // Remove the item at the specified index
        return newArr;
      


  case "UPDATE":
    let arr = [...state]
    arr.find((food, index) => {
        if (food.id === action.id) {
            console.log(food.qty, parseInt(action.qty), action.price + food.price)
            arr[index] = { ...food, qty: parseInt(action.qty) + food.qty, price: action.price + food.price }
        }
        return arr
    })
    return arr

    case "DROP": 
      let empArray=[]
      return empArray;
      
    default:
      console.error("error: unknown action");
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, []);
  return (
    <CartDispatchContext.Provider value={dispatch}>
      <CartStateContext.Provider value={state}>
        {children}
      </CartStateContext.Provider>
    </CartDispatchContext.Provider>
  );
};
export const useCart = () => useContext(CartStateContext);//dispatch k case mi used this
export const useDispatchCart = () => useContext(CartDispatchContext);//dsipatch cart function ko call krne k liye
