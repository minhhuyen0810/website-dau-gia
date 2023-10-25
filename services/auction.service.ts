import api from '../api/api';

const registerAuction = async (id: number) => {
  const response = await api.postServiceAuthori(`api/user/auction/${id}`);
  return response;
};

const submitHistoryAuction = async (id: number) => {
  const response = await api.postServiceAuthori(
    `api/user/auction-history/${id}:submit`
  );
  return response;
};
export default { registerAuction, submitHistoryAuction };
