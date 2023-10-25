import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { StatusLoading } from '../types/statusLoading.interface';
import { BannerInterface } from './../../model/banner';
import { CategoryInterface } from './../../model/category';
import { PostInterface } from './../../model/post';

export interface CapacityState {
  banner: BannerInterface | null;
  categories: CategoryInterface[] | null;
  status: string;
  errorMessage: string | null;
}

const initialState: CapacityState = {
  banner: null,
  categories: null,
  status: StatusLoading.IDLE,
  errorMessage: null,
};

// export const getPageCategoriesAction = createAsyncThunk(
//   'capacity/getCategories',
//   async (id: string, { dispatch, rejectWithValue }) => {
//     try {
//       const response = await categoryService.getPageCategories(id);
//       const responsePosts = await postService.getPagePosts(id, true);
//       let categories = response.data;
//       const posts = responsePosts.data;
//       if (categories && categories.length > 0) {
//         categories = categories.map((category: CategoryInterface) => {
//           const postFounds = (posts || []).filter(
//             (post: PostInterface) => post.category === category.id
//           );
//           return {
//             ...category,
//             posts: postFounds || [],
//           };
//         });
//       }
//       return categories;
//     } catch (e) {
//       console.log('err', e);
//       return rejectWithValue(e);
//     }
//   }
// );

export const capacitySlice = createSlice({
  name: 'capacity',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder;
    // .addCase(getPageCategoriesAction.pending, (state) => {})
    // .addCase(getPageCategoriesAction.fulfilled, (state, action) => {
    //   state.categories = action.payload;
    // })
    // .addCase(getPageCategoriesAction.rejected, (state, action) => {
    //   state.errorMessage = action.payload as string;
    // });
  },
});

export default capacitySlice.reducer;
