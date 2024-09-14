// userSlice เก็บข้อมูล user ที่ Login เข้ามา
import {LoginRounded} from "@mui/icons-material";

import {createSlice} from "@reduxjs/toolkit";

// ค่าเริ่มต้น
const initialState = {
  value: "stamp",
  user: [],
};

// function หลัก
export const userSlice = createSlice({
  name: "user",
  initialState, //initialState ไปเป็น state
  reducers: {
    login: (state, action) => {
      state.value = "stamp login";
      // state.user = "sunthorn login";
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = [];
      localStorage.clear();
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {login, logout, incrementByAmount} = userSlice.actions;

export default userSlice.reducer;
