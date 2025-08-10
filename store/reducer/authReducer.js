import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  auth: null,
  isAuthenticated: false,
  loading: false,
  token: null,
};

const authReducer = createSlice({
  name: 'authStore',
  initialState,
  reducers: {
    login: (state, action) => {
      state.auth = action.payload;
    },
    // loginSuccess: (state, action) => {
    //   state.loading = false;
    //   state.isAuthenticated = true;
    //   state.user = action.payload.user;
    //   state.token = action.payload.token;
    // },
    // loginFailure: (state) => {
    //   state.loading = false;
    //   state.isAuthenticated = false;
    //   state.user = null;
    //   state.token = null;
    // },
    logout: (state, action) => {
      state.auth = null
    }
    // setUser: (state, action) => {
    //   state.user = action.payload;
    //   state.isAuthenticated = true;
    // },
    // setLoading: (state, action) => {
    //   state.loading = action.payload;
    // },
    // clearAuth: (state) => {
    //   state.user = null;
    //   state.isAuthenticated = false;
    //   state.token = null;
    //   state.loading = false;
    // },
  },
});

export const {
    login, logout,
//   loginStart,
//   loginSuccess,
//   loginFailure,
//   logout,
//   setUser,
//   setLoading,
//   clearAuth,
} = authReducer.actions;

export default authReducer.reducer;
