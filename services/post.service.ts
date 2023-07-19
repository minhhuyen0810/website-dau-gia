import { KeyConfigLocal } from './../api/configs';
import api from '../api/api';
import { IResponse } from '../api/configs';

const getPagePosts = (id: string, isContentHtml?: boolean, params?: any) => {
  if (!isContentHtml) {
    params = { ...params, select: true };
  }
  return new Promise<IResponse>(async (resolve, reject) => {
    const response: IResponse = await api.getService(`home/post/${id}`, params);
    resolve(response);
  });
};

const getPost = (id: string, params?: any) => {
  return new Promise<IResponse>(async (resolve, reject) => {
    const response: IResponse = await api.getService(`static/post/${id}`, params);
    resolve(response);
  });
};

const getPostHighlights = (params?: any) => {
  return new Promise<IResponse>(async (resolve, reject) => {
    const response: IResponse = await api.getService(`static/post`, params);
    resolve(response);
  });
};

export default {
  getPagePosts,
  getPost,
  getPostHighlights,
};
