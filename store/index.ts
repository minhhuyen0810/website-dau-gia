import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authReducer from './slices/auth.slice';
import capacityReducer from './slices/capacity.slice';
import contactReducer from './slices/contact.slice';
import commonReducer from './slices/common.slice';
import homeReducer from './slices/home.slice';
import aboutUsReducer from './slices/aboutUs.slice';
import newsPageReducer from './slices/news.slice';
import postDetailReducer from './slices/postDetail.slice';
import productReducer from './slices/product.slice';
import productDetailReducer from './slices/productDetail.slice';
import recruitmentReducer from './slices/recruitment.slice';
import checkSnReducer from './slices/checkSn.slice';
export const store = configureStore({
  reducer: {
    aboutUs: aboutUsReducer,
    auth: authReducer,
    capacity: capacityReducer,
    common: commonReducer,
    contact: contactReducer,
    home: homeReducer,
    newsPage: newsPageReducer,
    postDetail: postDetailReducer,
    product: productReducer,
    productDetail: productDetailReducer,
    recruitment: recruitmentReducer,
    checkSn: checkSnReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
