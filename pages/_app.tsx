import type { AppProps } from 'next/app';
import { Provider, useDispatch } from 'react-redux';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import 'react-toastify/dist/ReactToastify.css';
import { LayoutProvider } from '../layout/DefaultLayout';
import '../styles/global.scss';
import { store } from './../store';
import setLanguage from 'next-translate/setLanguage';
import { useEffect } from 'react';
import { IResponseLogin, KeyConfigLocal } from '../api/configs';
import authService from '../services/auth.service';
import { checkTokenExpiration } from '../middleware/jwtmiddleware';

function App({ Component, pageProps }: AppProps) {
  const dispatch = useDispatch();

  useEffect(() => {
    // Kiểm tra token hết hạn mỗi 5 phút (300,000 milliseconds)
    const tokenCheckInterval = setInterval(() => {
      dispatch(checkTokenExpiration());
    }, 300000);

    return () => clearInterval(tokenCheckInterval);
  }, []);
  return (
    <Provider store={store}>
      <LayoutProvider>
        {<Component {...pageProps} className="container" />}
      </LayoutProvider>
    </Provider>
  );
}

export default App;
