import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import connectionSlice from "./connectionSlice";
import feedSlice from "./feedSlice";
import requestsSlice from "./requestsSlice";

const appStore = configureStore({
    reducer:{
        user: userReducer,
        connection: connectionSlice,
        feed: feedSlice,
        requests: requestsSlice,
    }
})  

export default appStore