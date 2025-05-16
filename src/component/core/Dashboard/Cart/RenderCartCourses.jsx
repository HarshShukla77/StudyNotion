import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ReactStars from 'react-stars'
import { GiNinjaStar } from "react-icons/gi";
import { MdDelete } from "react-icons/md";

const RenderCartCourses = () => {
    const {cart} = useSelector((state)=>state.cart)
    const dispatch = useDispatch()
  return (
    <div>
       {
        cart.map((course,index)=>{
            <div>
                <div>
                    <img src={course?.thumbnail} alt="" />
                    <div>
                        <p>{course?.courseName}</p>
                        <p>{course?.category?.name}</p>
                        <div>
                            <span>4.8</span>
                            <ReactStars count={5} size={20} edit={false} 
                            activeColors="#ffd700"  
                            emptyIcon={<GiNinjaStar />} fullIcon={<GiNinjaStar />} ></ReactStars>
                            <span>{course?.ratingAndReviews?.lenght} Ratings</span>
                        </div>
                    </div>
                </div>
              <div>
                <button onClick={()=>dispatch(removeFromCart(courseEndpoints._id))} >
                <MdDelete />
                <span>Remove</span>
                </button>
                <p>Rs.{course?.price} </p>
              </div>
            </div>
        })
       }
    </div>
  )
}

export default RenderCartCourses
