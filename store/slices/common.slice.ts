import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import commonService from '../../services/common.service';
import homeService from '../../services/home.service';
import { CategoryInterface } from './../../model/category';
import { PartnerInterface, PartnerTypeEnum } from './../../model/partner';

export interface CommonState {
  headerCategories: CategoryInterface[] | null;
  certificates: PartnerInterface[] | null;
  partners: PartnerInterface[] | null;
  errorMessage: string | null;
}
export interface LoginForm {
  email: string;
  password: string;
}

const initialState: CommonState = {
  headerCategories: null,
  certificates: null,
  partners: null,
  errorMessage: null,
};

export const getHeaderCategoriesAction = createAsyncThunk(
  'common/getHeaderCategoriesAction',
  async (_, { rejectWithValue }) => {
    try {
      const response = await homeService.getHeaderCategories();
      return response.data;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const getPartnersAction = createAsyncThunk(
  'common/getPartnersAction',
  async (_, { rejectWithValue }) => {
    try {
      const response = await commonService.getPartners({
        type: PartnerTypeEnum.PARTNER,
      });
      return response.data;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const getCertificatesAction = createAsyncThunk(
  'common/getCertificatesAction',
  async (_, { rejectWithValue }) => {
    try {
      const response = await commonService.getPartners({
        type: PartnerTypeEnum.CERTIFICATE,
      });
      return response.data;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getHeaderCategoriesAction.pending, (state) => {})
      .addCase(getHeaderCategoriesAction.fulfilled, (state, action) => {
        state.headerCategories = action.payload;
      })
      .addCase(getHeaderCategoriesAction.rejected, (state, action) => {
        state.errorMessage = action.payload as string;
      })
      .addCase(getPartnersAction.pending, (state) => {})
      .addCase(getPartnersAction.fulfilled, (state, action) => {
        state.partners = action.payload;
      })
      .addCase(getPartnersAction.rejected, (state, action) => {
        state.errorMessage = action.payload as string;
      })
      .addCase(getCertificatesAction.pending, (state) => {})
      .addCase(getCertificatesAction.fulfilled, (state, action) => {
        state.certificates = action.payload;
      })
      .addCase(getCertificatesAction.rejected, (state, action) => {
        state.errorMessage = action.payload as string;
      });
  },
});

export default commonSlice.reducer;
