import { IResponse } from './../api/configs';
import api from '../api/api';


const getAddress = () => {
  return new Promise<IResponse>(async (resolve, reject) => {
    const response: IResponse = await api.getService('static/contact');
    resolve(response);
  });
};

export default { getAddress };
