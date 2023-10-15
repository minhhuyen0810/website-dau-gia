import api from "../api/api";
import { IResponse } from "../api/configs";

const getProductDetailbyId = (id: number, params?: any) => {
  return new Promise<IResponse>(async (resolve, reject) => {
    const response: IResponse = await api.getService(`api/customer/product/${id}`, params, null, false);
    resolve(response);
  });
};

const getAllProducts = (params?: any) => {
  return new Promise<IResponse>(async (resolve, reject) => {
    const response: IResponse = await api.getService(`api/customer/product/query`, params, null, false);
    resolve(response);
  });
};

export default {
  getProductDetailbyId,
  getAllProducts,
};