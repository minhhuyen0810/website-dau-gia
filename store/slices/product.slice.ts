import { IResponse } from './../../api/configs';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import productService from '../../services/product.service';
import { trimParam } from '../../util';

// Định nghĩa kiểu dữ liệu cho initialState

const initialState: any = {
  data: [],
  dataDetail: null,
  totalField: 0,
};


export const getListProductAction = createAsyncThunk(
  "product/getListProduct",
  async (filter: any, thunkAPI) => {
    try {   
      const response: any = await productService.getAllProducts({ ...filter })
      thunkAPI.dispatch(setListProductAction(response));
    } catch (error) {
      console.log('err', error);
    }
  }
);
export const getDetailProductAction = createAsyncThunk(
  "SearchDetailProduct",
  async (id: any, thunkAPI) => {
    try {
      const response: any = await productService.getProductDetailbyId(id);
      thunkAPI.dispatch(setDetailProductAction(response));
    } catch (error) {
       console.log('err', error);
    }
  }
);


export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setListProductAction: (state: any, action: PayloadAction<any>) => {
      state.data = action.payload.data;
    },
    setDetailProductAction: (state: any, action: PayloadAction<any>) => {
      state.dataDetail = action.payload.data;
      state.totalField = Object.keys(action.payload).length;
    },
  },
});
export const { 
  setListProductAction, 
  setDetailProductAction 
} = productSlice.actions;

export default productSlice.reducer;
