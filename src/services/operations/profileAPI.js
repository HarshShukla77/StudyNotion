import {toast} from "react-hot-toast"
import { profileEndpoints } from "./apiss"
import { apiConnector } from "./apiconnector"

import { logout } from "./authAPI"
import { setLoading,setUser } from "../../slices/profileSlice"

const {GET_USER_DETAILS_API,GET_USER_ENROLLED_COURSES_API} = profileEndpoints

export async function getUserEnrolledCourses(token){
    const toastId = toast.loading("Loading...")
    let result =[]
    try{
        console.log(" before CAlling backen api for enrolled courewss")
        const response = await apiConnector("GET",GET_USER_DETAILS_API,null,{
            Authorization:`Bearer ${token}`
        })
        console.log(" aftef before CAlling backen api for enrolled courewss")
        if(!response.data.success){
            throw new Error(response.data.message)
        }
        result = response.data.data;
    }catch (error) {
        console.log("GET_USER_ENROLLED_COURSES_API API ERROR............", error)
        toast.error("Could Not Get Enrolled Courses")
      }
      toast.dismiss(toastId)
      return result
}