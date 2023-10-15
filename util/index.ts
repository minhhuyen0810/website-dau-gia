import { KeyConfigLocal } from "../api/configs";

export const trimParam = (obj: any): any => {
  return JSON.parse(JSON.stringify(obj).replace(/\"\s+|\s+\"/g, '"'));
}
export const getToken = () => {
  if (typeof localStorage !== 'undefined') {
    // Kiểm tra xem có token trong localStorage không
    const token = localStorage.getItem(KeyConfigLocal.TOKEN);
    return token;
  }
  return ""; // Hoặc giá trị mặc định khác nếu không hỗ trợ localStorage
};