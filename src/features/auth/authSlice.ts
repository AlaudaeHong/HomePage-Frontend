import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AppDispatch, AppThunk, RootState } from "../../store/store"

interface User {
  userId: string,
  username: string,
  password: string,
}

interface AuthState {
  user: User,
  error: string
  status: string
}

const initialState: AuthState = {
  user: { userId: "", username: "", password: "" },
  error: "",
  status: "idle",
};

export const fetchAuthUser = createAsyncThunk("auth/check", async () => {
  const response = await fetch("/api/auth");
  const data = await response.json();
  return data;
});

export const loginAuthUser = createAsyncThunk("auth/login", async (user: User) => {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  return data;
});

export const logoutAuthUser = createAsyncThunk("auth/logout", async () => {
  const response = await fetch("/api/auth/logout", {
    method: "DELETE",
  });

  const data = await response.json();
  return data;
});

export const registerAuthUser = createAsyncThunk(
  "auth/register",
  async (user) => {
    const response = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    return data;
  }
);

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetCheck: (state: { status: string; }) => {
      state.status = "idle";
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchAuthUser.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchAuthUser.fulfilled, (state, action) => {
        state.status = "loaded";
        state.user = action.payload;
      })

      .addCase(registerAuthUser.fulfilled, (state, action) => {
        state.status = "idle";
        state.user = action.payload;
      })

      .addCase(loginAuthUser.fulfilled, (state, action) => {
        state.status = "idle";
        state.user = action.payload;
      })

      .addCase(logoutAuthUser.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(logoutAuthUser.fulfilled, (state, action) => {
        state.status = "idle";
        state.user = initialState.user;
      })
  },
})

export const { resetCheck } = AuthSlice.actions;

export const resetCheckByTime = (): AppThunk => (dispatch) => setTimeout(() => {
  dispatch(resetCheck());
}, 1000 * 60 * 5);

export const selectUser = (state: RootState) => state.auth.user;
export const selectAuthStatus = (state: RootState) => state.auth.status;

export default AuthSlice.reducer;
