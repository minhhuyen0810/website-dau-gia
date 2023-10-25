import { IResponseLogin } from './../api/configs';
import api from '../api/api';
import { LoginForm } from '../store/slices/auth.slice';



const login = async (param: LoginForm) => {
  const response = await api.postService(
    "api/authenticate",
    {
      ...param,
    },
    false,
    false
  );
  return response;
};

const logout = () => {
  return new Promise<any>((resolve, reject) => {
    if (1) {
      setTimeout(() => resolve({ status: true }), 500);
    } else {
      reject('Username or password is invalid!');
    }
  });
};
const getUserInfo = async() => {
  const response = await api.getService("api/user", null, null, true);
  return response;
}

export default { login, logout, getUserInfo };
