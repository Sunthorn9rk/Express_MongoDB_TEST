// store.js มีหน้าที่รวบรวม storeต่างๆ
import {configureStore} from "@reduxjs/toolkit";
import userSlice from "./userSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
  },
});
