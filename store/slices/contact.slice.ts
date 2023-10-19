import { ContactInterface } from './../../model/contact';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { StatusLoading } from '../types/statusLoading.interface';

export interface ContactState {
  data: ContactInterface[] | null;
  status: string;
  errorMessage: string | null;
}

const initialState: ContactState = {
  data: null,
  status: StatusLoading.IDLE,
  errorMessage: null,
};

// export const getContactAction = createAsyncThunk(
//   'contact/getContact',
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await contactService.getAddress();
//       return response.data;
//     } catch (e) {
//       console.log('err', e);
//       return rejectWithValue(e);
//     }
//   }
// );

export const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // builder
    //   .addCase(getContactAction.pending, (state) => {
    //     state.status = StatusLoading.LOADING;
    //   })
    //   .addCase(getContactAction.fulfilled, (state, action) => {
    //     state.status = StatusLoading.IDLE;
    //     state.data = action.payload;
    //   })
    //   .addCase(getContactAction.rejected, (state, action) => {
    //     state.status = StatusLoading.FAILED;
    //     state.errorMessage = action.payload as string;
    //   });
  },
});

export default contactSlice.reducer;
