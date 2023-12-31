import setLanguage from 'next-translate/setLanguage';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { useAppSelector } from '../../store/hook';
// import { getHeaderCategoriesAction } from '../../store/slices/common.slice';

import Footer from '../Footer';
import Header from '../Header';
import SideBar from '../Sidebar';

const withAppProvider = (Page: any) => {
  const VTComponent = (props: any) => {
    const dispatch = useDispatch();

    const [isSmallMobile, setIsSmallMobile] = useState<boolean>(false);
    const [sticky, setSticky] = useState(false);

    const ScrollStickyHeader = () => {
      const element = window.document.getElementById('container');
      if (element !== null) {
        if (element?.getBoundingClientRect().y < 0) {
          setSticky(true);
        } else {
          setSticky(false);
        }
      }
    };
    useEffect(() => {
      // initialize();
      if (window && window.outerWidth <= 375) {
        setIsSmallMobile(true);
      }
      window.addEventListener('scroll', ScrollStickyHeader);
      return () => {
        window.removeEventListener('scroll', ScrollStickyHeader);
      };
    }, []);
    useEffect(() => {}, []);

    // FUNCTION
    return (
      <div className="wrapper-layout">
        <Header isScroll={sticky} />
        <SideBar />
        <div className="wrap-content-page">
          <Page {...props} isSmallMobile={isSmallMobile} />
        </div>
        <Footer />
        <ToastContainer />
      </div>
    );
  };
  VTComponent.getInitialProps = Page.getInitialProps;
  return VTComponent;
};

export default withAppProvider;
