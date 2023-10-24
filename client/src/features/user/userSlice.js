import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import getAxiosInstance from "../../api/interceptors";
import { AUTH_SERVICE_URL } from "../../credentials";

export const fetchUserData = createAsyncThunk(
  "user/fetchUserData",
  async function () {
    const response = await getAxiosInstance(AUTH_SERVICE_URL).get("/user");
    return response.data || null;
  }
);

const initialState = {
  userData: null,
  status: "idle",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUserData: (state) => {
      state.userData = null;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchUserData.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        // console.log(action.payload);
        state.userData = action.payload;
        state.status = "idle";
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.status = "error";
      }),
});

export const { clearUserData } = userSlice.actions;

export const getIsLoggedIn = (state) => !!state.user.userData;

export default userSlice.reducer;
