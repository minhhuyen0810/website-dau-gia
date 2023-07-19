import api from '../api/api';
import { IHomePostResponse, IResponse } from '../api/configs';

const getBanners = (params?: any) => {
  return new Promise<IResponse>(async (resolve, reject) => {
    const response: IResponse = await api.getService(
      'static/home/banner',
      params
    );
    resolve(response);
  });
};

const getHeaderCategories = (params?: any) => {
  return new Promise<IResponse>(async (resolve, reject) => {
    const response: IResponse = await api.getService(
      'static/category/menu',
      params
    );
    resolve(response);
  });
};

const getHomeCategories = (params?: any) => {
  return new Promise<IResponse>(async (resolve, reject) => {
    const response: IResponse = await api.getService(
      `static/home/category`,
      params
    );
    resolve(response);
  });
};

const getHomePosts = (params?: any) => {
  return new Promise<IHomePostResponse>(async (resolve, reject) => {
    const response: IHomePostResponse = await api.getService(
      `static/home/post/async`,
      params
    );
    resolve(response);
  });
};

export default {
  getBanners,
  getHeaderCategories,
  getHomeCategories,
  getHomePosts,
};
