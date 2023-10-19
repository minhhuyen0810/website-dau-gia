import { logOutAction } from '../store/slices/auth.slice';
import { AppThunk } from './store'; // Import AppThunk type
const jwtDecode = require('jwt-decode');
export const checkTokenExpiration =
  (): AppThunk => (dispatch: any, getState: any) => {
    const token = getState().auth.token; // Lấy token từ Redux state

    if (token) {
      const decodedToken = jwtDecode(token); // Giả sử bạn đã cài đặt thư viện decode JWT

      if (decodedToken.exp * 1000 < Date.now()) {
        // Token đã hết hạn, dispatch action đăng xuất
        dispatch(logOutAction());
      }
    }
  };
