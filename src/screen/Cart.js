import React from 'react'
  // import Delete from '@material-ui/icons/Delete'
import { useCart, useDispatchCart } from '../components/ComponentReducer';
// import trash from "../trash.svg"
export default function Cart() {  
  let data = useCart();
  let dispatch = useDispatchCart();
  if (data?.length === 0) {
    return (
      <div>
        <div className='m-5 w-100 text-center fs-3 text-white'>The Cart is Empty!</div>
      </div>
    )
  }
  // const handleRemove = (index)=>{
  //   console.log(index)
  //   dispatch({type:"REMOVE",index:index})
  // }

  const handleCheckOut = async () => {
    let userEmail = localStorage.getItem("userEmail");//us particular user k total order 
    // console.log(data,localStorage.getItem("userEmail"),new Date())
    let response = await fetch("https://yazhwin-assignment.vercel.app/api/orderData", {
     
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        order_data: data,
        email: userEmail,
        order_date: new Date().toDateString()//current new data is send in backend of particular user data
      })
    });
    console.log("JSON RESPONSE:::::", response.status)
    if (response.status === 200) {
      dispatch({ type: "DROP" })
    }
  }

  let totalPrice = data?.reduce((total, food) => total + food.price, 0)
  return (
    <div>

      {console.log(data)}
      <div className='container m-auto mt-5 table-responsive  table-responsive-sm table-responsive-md' >
        <table className='table table-hover '>
          <thead className=' text-white fs-4'>
            <tr>
              <th scope='col' >#</th>
              <th scope='col' >Name</th>
              <th scope='col' >Quantity</th>
              <th scope='col' >Option</th>
              <th scope='col' >Amount</th>
              <th scope='col' ></th>
            </tr>
          </thead>
          <tbody>
            {data?.map((food, index) => (
              <tr className='text-white'> 
                <th scope='row' >{index + 1}</th>
                <td>{food.name}</td>
                <td>{food.qty}</td>
                <td>{food.size}</td>
                <td>{food.price}</td>
                <td ><div className="btn btn-danger" onClick={() => { dispatch({ type: "REMOVE", index: index }) }}>Delete</div> </td>
                </tr>
            ))}
          </tbody>
        </table>
        <div><h1 className=' text-white fs-2'>Total Price: {totalPrice}/-</h1></div>
        <div>
          <button className='btn bg-success mt-5 ' onClick={handleCheckOut} > Check Out </button>
        </div>
      </div>



    </div>
  )
}