import { IResponse } from '../api/configs';
import api from '../api/api';

const postInfor = (body: any) => {
  return new Promise<IResponse>(async (resolve, reject) => {
    const response: IResponse = await api.postService('static/infor', body);
    resolve(response);
  });
};

export default { postInfor };
