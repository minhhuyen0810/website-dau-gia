import { KeyConfigLocal } from './../../api/configs';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import authService from '../../services/auth.service';
import { StatusLoading } from '../types/statusLoading.interface';
import api from '../../api/api';
import { Router, useRouter } from 'next/router';
import { getToken } from '../../util';

export interface AuthState {
  account: any;
  status: string;
  id_token: string | null;
  errorMessage?: string;
}
export interface LoginForm {
  username: string;
  password: string;
  remmberMe: boolean;
}

const initialState: AuthState = {
  account: null,
  id_token:getToken() ,
  status: StatusLoading.IDLE,
};

export const loginAction = createAsyncThunk(
  'auth/login',
  async (loginForm: any, {dispatch, rejectWithValue }) => {
    try {
      const response: any = await authService.login(loginForm);
      var token = response?.id_token;
      return token;
    } catch (e) {
      console.log('err', e);
      return rejectWithValue(e);
    }
  }
);
export const getUserInfoAction = createAsyncThunk(
  'user/getInfo',
  async (thunkAPI) => {
    try {
      const response : any = await api.getService("api/user", null, null, true);
      // console.log(response)
      return response;
    } catch (error) {
      console.log(error);
      // return thunkAPI.rejectWithValue(error);
    }
  }
);


export const logOutAction = createAsyncThunk(
  'auth/logout',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await authService.logout();
      return response;
    } catch (e) {
      console.log('err', e);
      return rejectWithValue(e);
    }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginAction.pending, (state) => {
        state.status = StatusLoading.LOADING;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.status = StatusLoading.IDLE;
        state.id_token = action.payload;
        localStorage.setItem(
          KeyConfigLocal.TOKEN,
          action.payload as string
        );
      })
      .addCase(loginAction.rejected, (state, action) => {
        console.log('reject');
        state.status = StatusLoading.FAILED;
        state.errorMessage = action.payload as string;
      })
      .addCase(getUserInfoAction.fulfilled, (state, action) => {
        state.account = action.payload?.data;
      })
      .addCase(logOutAction.pending, (state) => {
        state.status = StatusLoading.LOADING;
      })
      .addCase(logOutAction.fulfilled, (state, action) => {
        console.log('fullfilled');
        state.status = StatusLoading.IDLE;
        state.account = null;
        state.id_token = null;
        localStorage.removeItem(KeyConfigLocal.TOKEN);
      })
      .addCase(logOutAction.rejected, (state, action) => {
        console.log('reject');
        state.status = StatusLoading.FAILED;
        state.errorMessage = action.payload as string;
      });
  },
});

export default authSlice.reducer;
