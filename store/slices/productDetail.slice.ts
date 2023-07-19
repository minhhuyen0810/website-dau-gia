import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import categoryService from '../../services/category.service';
import postService from '../../services/post.service';
import { StatusLoading } from '../types/statusLoading.interface';
import { BannerInterface } from './../../model/banner';
import { CategoryInterface } from './../../model/category';
import { PostInterface } from './../../model/post';

export interface ProductState {
  banner: BannerInterface | null;
  category: CategoryInterface | null;
  subCategories: CategoryInterface[] | null;
  status: string;
  errorMessage: string | null;
}

const initialState: ProductState = {
  banner: null,
  category: null,
  subCategories: null,
  status: StatusLoading.IDLE,
  errorMessage: null,
};

export const getCategoryAction = createAsyncThunk(
  'productDetail/getCategory',
  async (id: string, { dispatch, rejectWithValue }) => {
    try {
      const response = await categoryService.getCategory(id);
      const responsePosts = await postService.getPagePosts(id);
      const posts = responsePosts.data;
      let postFounds: PostInterface[] = [];
      if (response.data && response.data.id) {
        postFounds = (posts || []).filter(
          (post: PostInterface) => post.category === response.data.id
        );
      }
      return {
        ...response.data,
        posts: postFounds,
      };
    } catch (e) {
      console.log('err', e);
      return rejectWithValue(e);
    }
  }
);

export const productDetailSlice = createSlice({
  name: 'productDetail',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategoryAction.pending, (state) => {})
      .addCase(getCategoryAction.fulfilled, (state, action) => {
        state.category = action.payload;
      })
      .addCase(getCategoryAction.rejected, (state, action) => {
        state.errorMessage = action.payload as string;
      });
  },
});

export default productDetailSlice.reducer;
