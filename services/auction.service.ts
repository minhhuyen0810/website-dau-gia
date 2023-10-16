import api from '../api/api';

const registerAuction = async (id: number) => {
  const response = await api.postServiceRegister(`api/user/auction/${id}`);
  return response;
};

export default { registerAuction };
