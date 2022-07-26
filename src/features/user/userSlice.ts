import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AppDispatch, AppThunk, RootState } from "../../store/store"

interface ThemeState {
  status: string,
  if_otaku: any,
}

const initialState: ThemeState = {
  status: "idle",
  if_otaku: "false",
}

export const fetchUserSetting = createAsyncThunk("user/getsetting", async () => {
  // console.log("if otaku:" + localStorage.getItem("otaku"));
  return {if_otaku: localStorage.getItem("otaku") ? localStorage.getItem("otaku") : "false"};
});

export const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setOtakuTheme: (state: {if_otaku: string}) => {
      state.if_otaku = "true";
      localStorage.setItem("otaku", "true");
    },
    unsetOtakuTheme: (state: {if_otaku: string}) => {
      state.if_otaku = "false";
      localStorage.setItem("otaku", "false");
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchUserSetting.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(fetchUserSetting.fulfilled, (state, action) => {
        state.status = "success";
        state.if_otaku = action.payload.if_otaku;
      })
  }
})

export const {setOtakuTheme, unsetOtakuTheme} = UserSlice.actions;

export const selectUserIfOtaku = (state:RootState) => state.user.if_otaku;

export default UserSlice.reducer;