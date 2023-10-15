import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import homeService from '../../services/home.service';
import postService from '../../services/post.service';
import { StatusLoading } from '../types/statusLoading.interface';
import { BannerInterface, SliderInterface } from './../../model/banner';
import { CategoryInterface } from './../../model/category';
import { PostInterface } from './../../model/post';
import { DisplayEnum } from './../../types/display.interface';
import { get } from 'lodash';

export interface HomeState {
  banners: BannerInterface | null;
  categories: CategoryInterface[] | null;
  businessPostSelected: PostInterface | null;
  postHighlights: PostInterface[] | null;
  status: string;
  errorMessage: string | null;
  isLoadingBanner: boolean | null;
}
export interface LoginForm {
  username: string;
  password: string;
}

const initialState: HomeState = {
  banners: null,
  categories: null,
  businessPostSelected: null,
  postHighlights: null,
  status: StatusLoading.IDLE,
  errorMessage: null,
  isLoadingBanner: null,
};

// export const getBannersAction = createAsyncThunk(
//   'home/getBanners',
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await homeService.getBanners();
//       // for hard code banner
//       let result = response.data;
//       if (result && result.sliders) {
//         const sliders = result.sliders.map(
//           (slide: SliderInterface, index: number) => {
//             let imgage = '/img/bannerHotNewsr.PNG';
//             switch (index) {
//               case 0:
//                 imgage = `/img/bn7.jpg`;
//                 break;
//               case 1:
//                 imgage = `/img/bn9.jpg`;
//                 break;
//               case 2:
//                 imgage = `/img/bn9.jpg`;
//                 break;
//               default:
//                 imgage = `/img/bn7.jpg`;
//                 break;
//             }
//             return {
//               ...slide,
//               imgage,
//             };
//           }
//         );
//         result = { ...result, sliders };
//       }
//       return result;
//     } catch (e) {
//       console.log('err', e);
//       return rejectWithValue(e);
//     }
//   }
// );

// export const getHomeCategoriesAction = createAsyncThunk(
//   'home/getCategories',
//   async (_, { dispatch, rejectWithValue }) => {
//     try {
//       const response = await homeService.getHomeCategories();
//       const responsePosts = await homeService.getHomePosts();
//       let businessPostSelected: PostInterface | null = null;
//       let categories = response.data;
//       const postResult = responsePosts.result || [];
//       const listCategoryId: string[] = get(
//         responsePosts,
//         'data.categoryIds',
//         []
//       );
//       const postData = get(responsePosts, 'data.data', []);

//       if (categories && categories.length > 0) {
//         categories = categories.map(
//           (category: CategoryInterface, index: number) => {
//             if (category.id) {
//               const indexCate = listCategoryId.indexOf(category.id);
//               if (indexCate > -1) {
//                 return {
//                   ...category,
//                   posts: postData[index],
//                 };
//               }
//               return {
//                 ...category,
//                 posts: [],
//               };
//             }
//           }
//         );
//         // console.log('categories:: ', categories);
//         const categoryBusiness = categories.find(
//           (category: CategoryInterface) =>
//             category.type === DisplayEnum.NAV_HOME_CONTAINER
//         );
//         if (categoryBusiness) {
//           businessPostSelected =
//             categoryBusiness.posts && categoryBusiness.posts[0];
//         }
//       }
//       return { categories, businessPostSelected };
//     } catch (e) {
//       console.log('err', e);
//       return rejectWithValue(e);
//     }
//   }
// );

// export const getPostHighlightsAction = createAsyncThunk(
//   'home/getPostHighlights',
//   async (_, { rejectWithValue }) => {
//     try {
//       const params = {
//         category: 'a5ef36b4-2cc8-4c96-a1ff-08db0c9c9391',
//         skip: 0,
//         limit: 10,
//         select: 'true',
//       };
//       const postResponses = await postService.getPostHighlights(params);
//       return postResponses.data;
//     } catch (e) {
//       rejectWithValue(e);
//     }
//   }
// );

export const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // .addCase(getBannersAction.pending, (state) => {
      //   state.isLoadingBanner = true;
      // })
      // .addCase(getBannersAction.fulfilled, (state, action) => {
      //   state.isLoadingBanner = false;
      //   state.banners = action.payload;
      // })
      // .addCase(getBannersAction.rejected, (state, action) => {
      //   state.isLoadingBanner = false;
      //   state.errorMessage = action.payload as string;
      // })
      // .addCase(getHomeCategoriesAction.pending, (state) => {})
      // .addCase(getHomeCategoriesAction.fulfilled, (state, action) => {
      //   state.categories = action.payload.categories;
      //   state.businessPostSelected = action.payload.businessPostSelected;
      // })
      // .addCase(getHomeCategoriesAction.rejected, (state, action) => {
      //   state.errorMessage = action.payload as string;
      // })
      // .addCase(getPostHighlightsAction.pending, (state) => {})
      // .addCase(getPostHighlightsAction.fulfilled, (state, action) => {
      //   state.postHighlights = action.payload;
      // })
      // .addCase(getPostHighlightsAction.rejected, (state, action) => {
      //   state.status = StatusLoading.FAILED;
      //   state.errorMessage = action.payload as string;
      // });
  },
});

export default homeSlice.reducer;
