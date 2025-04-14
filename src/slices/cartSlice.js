import { createSlice } from "@reduxjs/toolkit";
import {toast } from "react-hot-toast";

const initialState={
   totalItems :localStorage.getItem("totalItems")?JSON.parse(localStroage.getItem("totalItems")):0

};

const cartSlice = createSlice({
    name:"cart",
    initialState:initialState,
    reducers:{
        setTotalItems(state,value){
            state.totalItems = value.payload;
        },
        //add to cart 
        //remove from cart
        //resert cart 
    },
});
export const {setTotalItems} = cartSlice.actions;
export default  cartSlice.reducer;