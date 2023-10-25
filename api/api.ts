import { isEmpty } from 'lodash';
import { toast } from 'react-toastify';
import authService from '../services/auth.service';
import {
  IResponseErrorHandle,
  Config,
  KeyConfigLocal,
  RESPONSE_STATUS,
  IResponseLogin,
} from './configs';
import { getToken } from '../util';
const _responseConfig = async (response: Response) => {
  if (
    response.status === RESPONSE_STATUS.SUCCESS ||
    response.status === RESPONSE_STATUS.CREATE_SUCCESS
  ) {
    return await response.json();
  }

  if (response.status === RESPONSE_STATUS.ACCESS_DENIED) {
    // localStorage.clear();
    // window.location.href = "/login";
    // const responseLogin: IResponseLogin = await authService.login({});
    localStorage.clear();
    return response.json();
  }

  // handle error
  try {
    const result: IResponseErrorHandle = await response.json();
    throw Error(result.message);
  } catch (error: any) {
    throw Error(
      error.message
        ? error.message
        : 'Máy chủ gặp lỗi. Vui lòng liên hệ quản trị viên'
    );
  }
  // if (response.status === RESPONSE_STATUS.NOT_FOUND)
  //   throw Error('Máy chủ không phản hồi. Vui lòng liên hệ quản trị viên');
  // if (response.status === RESPONSE_STATUS.INTERVAL_SERVER) {
  //   const result = await response.json();
  //   throw Error(result.error_description);
  // }
};
const postServiceAuthori = async <T>(url: string): Promise<T> => {
  try {
    const headers: any = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`,
    };
    const requestInit: any = { method: 'POST', headers };

    const response = await fetch(`${Config.URL_API}${url}`, requestInit);

    return await _responseConfig(response);
  } catch (error: any) {
    console.log(error);
    throw error;
  }
};
const postService = async <T>(
  url: string,
  body: object,
  isAuthorization = false,
  isFormData = false
): Promise<T> => {
  try {
    const headers: any = isFormData
      ? {}
      : { Accept: 'application/json', 'Content-Type': 'application/json' };
    if (isAuthorization) {
      headers.Authorization = `Bearer ${localStorage.getItem(
        KeyConfigLocal.TOKEN
      )}`;
    }

    const requestInit: any = { method: 'POST', headers };
    if (body)
      isFormData
        ? (requestInit.body = body)
        : (requestInit.body = JSON.stringify(body));
    const response = await fetch(`${Config.URL_API}${url}`, requestInit);
    return await _responseConfig(response);
  } catch (error: any) {
    console.log(error);
    // showToast(error.message, "error");
    throw error;
  }
};

const getService = async <T>(
  url: string,
  params?: any,
  body?: object | null,
  isAuthorization = true
): Promise<T> => {
  try {
    const headers: any = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    if (isAuthorization) {
      headers.Authorization = `Bearer ${getToken()}`;
    }
    const requestInit: any = { method: 'GET', headers };
    if (body) requestInit.body = JSON.stringify(body);
    let queryString = '';
    const paramsData: string[] = [];
    if (params && !isEmpty(params)) {
      Object.keys(params).forEach((key) => {
        if (
          params[key] !== null &&
          params[key] !== undefined &&
          params[key] !== ''
        )
          paramsData.push(`${key}=${params[key].toString() || ''}`);
      });
    }
    queryString = paramsData.length ? `?${paramsData.join('&')}` : '';
    const response = await fetch(
      `${Config.URL_API}${url}${encodeURI(queryString)}`,
      requestInit
    );
    return await _responseConfig(response);
  } catch (error: any) {
    throw error;
  }
};

export default { postService, getService, postServiceAuthori };
