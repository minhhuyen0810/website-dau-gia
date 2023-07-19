import { IResponse } from '../api/configs';
import api from '../api/api';


const getCheckSn = (id: any) => {
  return new Promise<IResponse>(async (resolve, reject) => {
    const response: IResponse = await api.getService(
      'api/produc11',
      id
    );
    resolve(response);
  });
};

const getCheckSnPost = (params?: any) => {
  return new Promise<IResponse>(async (resolve, reject) => {
    const response: IResponse = await api.postService(`checkSn`, {value: params});
    resolve(response);
  });
};

export default { getCheckSn, getCheckSnPost };
