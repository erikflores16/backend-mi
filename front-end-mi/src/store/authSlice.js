import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Api } from "../services/Api";

const initialState = {
  token: null,
  user: null,
  isLogin: false,
  isLoading: false,
};

//Metodo para el Login
export const loginUser = createAsyncThunk("auth/loginUser", async (data) => {
  const response = await Api.post("auth/login", data);

  if (response.statusCode === 200) {
    window.localStorage.setItem("token", response.data.token);
    return response.data;
  }

  throw new Error(response.data);
});

//Metodo de errores para el registro
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (data, thunkApi) => {
    const response = await Api.post("auth/register", data);

    if (response.statusCode === 201) {
      window.localStorage.setItem("token", response.data.token);
      return response.data;
    }

    return thunkApi.rejectWithValue(response.data);
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //Que hacer en caso de (Login)
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLogin = true;
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(loginUser.rejected, (state) => {
        state.isLoading = false;
        state.isLogin = false;
        state.token = null;
        state.user = null;
      })
      //Que hacer en caso de (registro)
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLogin = true;
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(registerUser.rejected, (state) => {
        state.isLoading = false;
        state.isLogin = false;
        state.token = null;
        state.user = null;
      });
  },
});
