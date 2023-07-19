import { IResponse } from './../../api/configs';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../api/api';
import categoryService from '../../services/category.service';
import postService from '../../services/post.service';
import { StatusLoading } from '../types/statusLoading.interface';
import { BannerInterface } from './../../model/banner';
import { CategoryInterface } from './../../model/category';
import { PostInterface } from './../../model/post';

export interface ProductState {
  banner: BannerInterface | null;
  categoryTree: CategoryInterface | null;
  categorySelected: CategoryInterface | null;
  subCategories: CategoryInterface[] | null;
  status: string;
  errorMessage: string | null;
}

const initialState: ProductState = {
  banner: null,
  categoryTree: null,
  categorySelected: null,
  subCategories: null,
  status: StatusLoading.IDLE,
  errorMessage: null,
};

export const getSubCategoriesAction = createAsyncThunk(
  'product/getSubCategories',
  async (id: string, { dispatch, rejectWithValue }) => {
    try {
      const response = await categoryService.getPageCategories(id);
      const responsePosts = await postService.getPagePosts(id);
      let categories = response.data;
      const posts = responsePosts.data;
      if (categories && categories.length > 0) {
        categories = categories.map((category: CategoryInterface) => {
          const postFounds = (posts || []).filter(
            (post: PostInterface) => post.category === category.id
          );
          return {
            ...category,
            posts: postFounds || [],
          };
        });
      }
      return categories;
    } catch (e) {
      console.log('err', e);
      return rejectWithValue(e);
    }
  }
);

export const getPageCategoriesAction = createAsyncThunk(
  'product/getCategories',
  async (id: string, { dispatch, rejectWithValue }) => {
    try {
      const params = { id };
      const response = await categoryService.getCategoriesTree(id, params);
      return response.data[0];
    } catch (e) {
      console.log('err', e);
      return rejectWithValue(e);
    }
  }
);

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPageCategoriesAction.pending, (state) => {})
      .addCase(getPageCategoriesAction.fulfilled, (state, action) => {
        state.categoryTree = action.payload;
      })
      .addCase(getPageCategoriesAction.rejected, (state, action) => {
        state.errorMessage = action.payload as string;
      })
      .addCase(getSubCategoriesAction.pending, (state) => {})
      .addCase(getSubCategoriesAction.fulfilled, (state, action) => {
        state.subCategories = action.payload;
      })
      .addCase(getSubCategoriesAction.rejected, (state, action) => {
        state.errorMessage = action.payload as string;
      });
  },
});

export default productSlice.reducer;
