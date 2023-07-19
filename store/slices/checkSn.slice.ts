import { CheckSnInterface } from './../../model/checksn';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { StatusLoading } from '../types/statusLoading.interface';
import checksnService from '../../services/checksn.service';

export interface CheckSnState {
  data: any;
  status: string;
  errorMessage: string | null;
}

const initialState: CheckSnState = {
  data: null,
  status: StatusLoading.IDLE,
  errorMessage: null,
};

export const getCheckSnAction = createAsyncThunk(
  'checksn/getCheckSn',
  async (param: any, { rejectWithValue }) => {
    try {
      const response = await checksnService.getCheckSnPost(param);
      return response;
    } catch (e) {
      console.log('err', e);
      return rejectWithValue(e);
    }
  }
);

export const checksnSlice = createSlice({
  name: 'checksn',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCheckSnAction.pending, (state) => {
        state.status = StatusLoading.LOADING;
      })
      .addCase(getCheckSnAction.fulfilled, (state, action) => {
        state.status = StatusLoading.IDLE;
        state.data = action.payload;
      })
      .addCase(getCheckSnAction.rejected, (state, action) => {
        state.status = StatusLoading.FAILED;
        state.errorMessage = action.payload as string;
      });
  },
});

export default checksnSlice.reducer;
