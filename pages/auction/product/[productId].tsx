import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import withAppProvider from '../../../layout/wrapper/withAppProvider';
import { useAppSelector } from '../../../store/hook';
import useTranslation from 'next-translate/useTranslation';
import { getDetailProductAction } from '../../../store/slices/product.slice';
import { io } from 'socket.io-client';

const socket = io('http://103.82.24.232:8181/');
const DetailAuctionProductPage = () => {
  const router = useRouter();
  const { productId } = router.query;
  const productReducer = useAppSelector((state) => state.product);
  const [productDetailData, setProductDetailData] = useState<any>();
  const [historyAuctionData, setHistoryAuctionData] = useState<any>();
  const authReducer = useAppSelector((state) => state.auth);
  const dispatch = useDispatch();

  //Effect
  useEffect(() => {
    if (productId) {
      dispatch(getDetailProductAction(productId as any) as any);
    }
  }, [productId]);

  useEffect(() => {
    setProductDetailData(productReducer.dataDetail);
  }, [productReducer.dataDetail]);
  //Effect kết nối IO
  useEffect(() => {
    if (authReducer.id_token) {
      const token = authReducer.id_token;
      debugger;
      const topic = `topic/auction/${productId}`;
      socket.emit('subscribeToAuction', { topic, token });
      socket.on('connect', () => {
        console.log('Kết nối thành công');
      });
      socket.on('error', (error) => {
        console.error(`Socket error: ${error}`);
      });
      return () => {
        // Ngắt kết nối khi component bị hủy
        socket.emit('unsubscribeFromAuction', topic);
      };
    }
  }, []);
  return (
    <div className="detailAuction-page detail-page">
      <section className="section">
        <div className="section-pad ">
          <div className="left info-detailproduct">Đang test</div>
          <div className="right info-detailauction"></div>
        </div>
      </section>
    </div>
  );
};
export default withAppProvider(DetailAuctionProductPage);
