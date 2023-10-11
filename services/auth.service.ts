import { IResponseLogin } from './../api/configs';
import api from '../api/api';
import { LoginForm } from '../store/slices/auth.slice';

// const login = (loginForm: any) => {
//   return new Promise<IResponseLogin>(async (resolve, reject) => {
//     const accountTest = {
//       username: 'admin',
//       password: 'string',
//       deviceType: 'Web',
//     };
//     const response: IResponseLogin = await api.postService('auth/login/web', {
//       ...accountTest,
//     });
//     resolve(response);
//   });
// };
const login = async (param: LoginForm) => {
  const response: IResponseLogin = await api.postService('auth/login/web', {
      ...param,
    });
    return response; 
};

const logout = () => {
  return new Promise<any>((resolve, reject) => {
    if (1) {
      setTimeout(() => resolve({ status: true }), 500);
    } else {
      reject('Email or password is invalid!');
    }
  });
};

export default { login, logout };
