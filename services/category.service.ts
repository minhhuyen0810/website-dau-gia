import api from '../api/api';
import { IResponse } from '../api/configs';

const getCategory = (id: string, params?: any) => {
  return new Promise<IResponse>(async (resolve, reject) => {
    const response: IResponse = await api.getService(`static/category/${id}`, params);
    resolve(response);
  });
};

const getCategoriesTree = (id: string, params?: any) => {
  return new Promise<IResponse>(async (resolve, reject) => {
    const response: IResponse = await api.getService(
      `static/category/tree`,
      params
    );
    resolve(response);
  });
};

const getPageCategories = (id: string, params?: any) => {
  return new Promise<IResponse>(async (resolve, reject) => {
    const response: IResponse = await api.getService(
      `static/category/home/${id}`,
      params
    );
    resolve(response);
  });
};

export default {
  getCategory,
  getCategoriesTree,
  getPageCategories,
};
