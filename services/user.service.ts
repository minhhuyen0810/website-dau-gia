import api from '../api/api';

const register = async (param: any) => {
  const response = await api.postService(
    'api/customer/user/registration',
    {
      ...param,
    },
    false,
    false
  );
  return response;
};
const forgotPassword = async (param: any) => {
  const response = await api.postService(
    'api/customer/user/forget-password',
    {
      ...param,
    },
    false,
    false
  );
  return response;
};

export default { register, forgotPassword };
