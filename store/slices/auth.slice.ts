import { KeyConfigLocal } from './../../api/configs';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import authService from '../../services/auth.service';
import { StatusLoading } from '../types/statusLoading.interface';

export interface AuthState {
  account: any;
  isSignIn: boolean;
  status: string;
  accessToken: string | null;
  errorMessage?: string;
}
export interface LoginForm {
  username: string;
  password: string;
}

const initialState: AuthState = {
  account: {},
  isSignIn: false,
  accessToken: null,
  status: StatusLoading.IDLE,
};

export const loginAsyncAction = createAsyncThunk(
  'auth/login',
  async (loginForm: LoginForm, { rejectWithValue }) => {
    try {
      const response = await authService.login(loginForm);
      return response;
    } catch (e) {
      console.log('err', e);
      return rejectWithValue(e);
    }
  }
);

export const logoutAsync = createAsyncThunk(
  'auth/logout',
  async (args: any, { dispatch, rejectWithValue }) => {
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
      .addCase(loginAsyncAction.pending, (state) => {
        state.status = StatusLoading.LOADING;
      })
      .addCase(loginAsyncAction.fulfilled, (state, action) => {
        state.status = StatusLoading.IDLE;
        state.isSignIn = true;
        state.account = action.payload.user;
        localStorage.setItem(
          KeyConfigLocal.TOKEN,
          action.payload.access_token as string
        );
        localStorage.setItem(
          KeyConfigLocal.USER,
          JSON.stringify(action.payload.user)
        );
      })
      .addCase(loginAsyncAction.rejected, (state, action) => {
        console.log('reject');
        state.status = StatusLoading.FAILED;
        state.errorMessage = action.payload as string;
      })
      .addCase(logoutAsync.pending, (state) => {
        state.status = StatusLoading.LOADING;
      })
      .addCase(logoutAsync.fulfilled, (state, action) => {
        console.log('fullfilled');
        state.status = StatusLoading.IDLE;
        state.isSignIn = false;
        state.account = null;
      })
      .addCase(logoutAsync.rejected, (state, action) => {
        console.log('reject');
        state.status = StatusLoading.FAILED;
        state.errorMessage = action.payload as string;
      });
  },
});

export default authSlice.reducer;
