import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import withAppProvider from '../../../layout/wrapper/withAppProvider';
import { useAppSelector } from '../../../store/hook';
import useTranslation from 'next-translate/useTranslation';
import { getDetailProductAction } from '../../../store/slices/product.slice';
import { io } from 'socket.io-client';
import { Button } from 'antd';

const socket = io('http://localhost:8181/');
const DetailAuctionProductPage = () => {
  const router = useRouter();
  const { productId } = router.query;
  const productReducer = useAppSelector((state) => state.product);
  const [productDetailData, setProductDetailData] = useState<any>();
  const [historyAuctionData, setHistoryAuctionData] = useState<any>();
  const authReducer = useAppSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [socketMessage, setSocketMessage] = useState<any>();
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
      // debugger;
      const topic = `auction/${productId}`;
      socket.on(topic, (message: any) => {
        setSocketMessage(message);
        console.log('Kết nối thành công');
      });

      return () => {
        // Ngắt kết nối khi component bị hủy
        socket.emit('unsubscribeFromAuction', topic);
      };
    }
  }, [socketMessage]);
  //Function
  function formatCurrency(number: any) {
    const formatter = new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    });

    return formatter.format(number);
  }
  return (
    <div className="detailAuction-page detail-page">
      <section className="section">
        <div className="section-pad flex ">
          <div className=" left info-detailProductwrap-img w-1/2">
            <img
              className="w-full"
              src={productDetailData?.imageUrl}
              alt="product-img"
            />
            <h2 className=" flex items-center justify-center text-primary pt-4 ">
              Giá khởi điểm: {formatCurrency(productDetailData?.minPrice)}
            </h2>
          </div>

          <div className=" right p-12 info-detailAuctionHistory wrap-info grid grid-cols-2  border-2 ml-20">
            <div>Giá hiện tại:</div>
            <div>llala</div>
            <Button>Trả giá</Button>
          </div>
        </div>
      </section>
    </div>
  );
};
export default withAppProvider(DetailAuctionProductPage);
