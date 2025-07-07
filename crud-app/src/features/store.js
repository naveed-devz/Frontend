import { configureStore } from "@reduxjs/toolkit";
import studentReducer from "./studentSlice.js"

const store = configureStore({
    reducer:{
        student:studentReducer
    }
})


export default store;