import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import withAppProvider from '../../../layout/wrapper/withAppProvider';
import { useAppSelector } from '../../../store/hook';
import useTranslation from 'next-translate/useTranslation';
import { getDetailProductAction } from '../../../store/slices/product.slice';
import { io } from 'socket.io-client';
import { Button } from 'antd';
import { WebsocketUtil } from '../../../util/socket.util';
import auctionService from '../../../services/auction.service';
import { toast } from 'react-toastify';

// const socket = io('http://localhost:8181/');
const DetailAuctionProductPage = () => {
  const router = useRouter();
  const { productId } = router.query;
  const productReducer = useAppSelector((state) => state.product);
  const [productDetailData, setProductDetailData] = useState<any>();
  const authReducer = useAppSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [socketMessage, setSocketMessage] = useState<any>();
  const [listAuctionHistory, setListAuctionHistory] = useState<any>([]);
  //Effect
  useEffect(() => {
    if (productId) {
      dispatch(getDetailProductAction(productId as any) as any);
    }
  }, [productId]);

  useEffect(() => {
    setProductDetailData(productReducer.dataDetail);
  }, [productReducer.dataDetail]);
  //Effect kết nối
  useEffect(() => {
    if (authReducer.id_token) {
      const token = authReducer.id_token;
      const topic = `/topic/auction/{productId}`;
      const socket = new WebsocketUtil();
      socket.configure({
        host: 'http://localhost:8181/ws',
        debug: true,
        recTimeout: 5000,
      });
      socket
        .startConnect(() => {})
        .then(() => {
          socket.subscribe(
            topic,
            (message: any) => {
              console.log(message);
              setSocketMessage(message);
            },

            token
          );
        });
    }
  }, []);
  useEffect(() => {
    // ...

    // Cập nhật listAuctionHistory khi có tin nhắn mới
    if (socketMessage) {
      const {
        id,
        userId,
        productId,
        userCode,
        username,
        productCode,
        productName,
        price,
      } = socketMessage;
      // Tạo một bản sao của danh sách hiện tại và thêm thông điệp mới vào đó
      setListAuctionHistory((prevList: any) => [
        ...prevList,
        {
          id,
          userId,
          productId,
          userCode,
          username,
          productCode,
          productName,
          price,
        },
      ]);
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
  const _handleSubmitAuctionHistory = async (id: any) => {
    if (authReducer.id_token) {
      try {
        await auctionService.submitHistoryAuction(id);
        toast.success('Trả giá thành công');
      } catch (err) {
        toast.error(err + ' Vui lòng liên hệ quản trị viên');
      }
    } else {
      toast.info('Chưa đăng nhập, vui lòng đăng nhập!');
    }
  };
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
            <ul>
              {listAuctionHistory
                .slice(-3)
                .map((message: any, index: number) => (
                  <li key={message.index}>
                    ID: {message.id}, User: {message.username}, Price:{' '}
                    {message.price}
                  </li>
                ))}
            </ul>

            <Button
              onClick={() => _handleSubmitAuctionHistory(productId)}
              className="w-full mb-10"
              size="large"
            >
              Trả giá
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};
export default withAppProvider(DetailAuctionProductPage);
