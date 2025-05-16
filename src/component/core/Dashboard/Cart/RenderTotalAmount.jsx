import React from 'react'
import { useSelector } from 'react-redux'
import Iconbtn from '../../../common/iconbtn';
const RenderTotalAmount = () => {
    const {total,cart} = useSelector((state)=>state.cart);
    const handleBuyCourse =()=>{
        const courses = cart.map((course)=>course._id );
        console.log("Brught these course:" ,courses);
        // api genrate karni hh payment gatway ke liye
    }
  return (
    <div>
         <p>Total:</p>
         <p>Rs {total}</p>
         <Iconbtn text="Buy Now" onClick={handleBuyCourse} customClasses={"w-full justify-center"} ></Iconbtn>
    </div>
  )
}

export default RenderTotalAmount
