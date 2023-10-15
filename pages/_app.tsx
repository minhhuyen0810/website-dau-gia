import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
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

function App({ Component, pageProps }: AppProps) {
  // useEffect(() => {
  //   initialize();
  // }, []);

  // const initialize = async () => {
  //   const currentLanguageCode = localStorage.getItem(KeyConfigLocal.LANGUAGE);
  //   if (!currentLanguageCode) {
  //     localStorage.setItem(KeyConfigLocal.LANGUAGE, 'vi');
  //     setLanguage('vi');
  //   } else {
  //     setLanguage(currentLanguageCode);
  //   }
  //   const token = await localStorage.getItem(KeyConfigLocal.TOKEN);
  //   if (!token) {
  //     console.log('missing token :>> ');
  //     const responseLogin: IResponseLogin = await authService.login({});
  //     localStorage.setItem(
  //       KeyConfigLocal.TOKEN,
  //       responseLogin.access_token as string
  //     );
  //     localStorage.setItem(
  //       KeyConfigLocal.USER,
  //       JSON.stringify(responseLogin.user)
  //     );
  //   }
  // };
  return (
    <Provider store={store}>
      <LayoutProvider>
        {<Component {...pageProps} className="container" />}
      </LayoutProvider>
    </Provider>
  );
}

export default App;
