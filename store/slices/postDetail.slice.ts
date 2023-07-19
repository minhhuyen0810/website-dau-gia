import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import categoryService from '../../services/category.service';
import postService from '../../services/post.service';
import { StatusLoading } from '../types/statusLoading.interface';
import { BannerInterface } from './../../model/banner';
import { CategoryInterface } from './../../model/category';
import { PostInterface } from './../../model/post';

export interface ProductState {
  post: PostInterface | null;
  postRefers: PostInterface[] | null;
  status: string;
  errorMessage: string | null;
}

const initialState: ProductState = {
  post: null,
  postRefers: null,
  status: StatusLoading.IDLE,
  errorMessage: null,
};

export const getPostAction = createAsyncThunk(
  'postDetail/getPostAction',
  async (id: string, { dispatch, rejectWithValue }) => {
    try {
      const response = await postService.getPost(id);
      let postRefers: PostInterface[] = [];
      if (response.data && response.data.id) {
        const responseRefers = await postService.getPagePosts(
          response.data.category,false,
          { limit: 5 }
        );
        postRefers = responseRefers.data;
      }
      return { post: response.data, postRefers };
    } catch (e) {
      console.log('err', e);
      return rejectWithValue(e);
    }
  }
);

export const postDetailSlice = createSlice({
  name: 'postDetail',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPostAction.pending, (state) => {})
      .addCase(getPostAction.fulfilled, (state, action) => {
        state.post = action.payload.post;
        state.postRefers = action.payload.postRefers;
      })
      .addCase(getPostAction.rejected, (state, action) => {
        state.errorMessage = action.payload as string;
      });
  },
});

export default postDetailSlice.reducer;
