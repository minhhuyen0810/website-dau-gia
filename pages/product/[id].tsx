import { Button } from 'antd';
import useTranslation from 'next-translate/useTranslation';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import SectionView from '../../layout/sections/renderSection';
import withAppProvider from '../../layout/wrapper/withAppProvider';
import { CategoryInterface } from '../../model/category';
import { useAppSelector } from '../../store/hook';
import { getCategoryAction } from '../../store/slices/productDetail.slice';
import { DisplayEnum } from '../../types/display.interface';
import { getDetailProductAction } from '../../store/slices/product.slice';
import auctionService from '../../services/auction.service';
import { toast } from 'react-toastify';

const DetailProductPage = () => {
  const { t } = useTranslation('common');
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();
  const productReducer = useAppSelector((state) => state.product);
  const authReducer = useAppSelector((state) => state.auth);
  const [productDetailData, setProductDetailData] = useState<any>();

  // EFFECT
  useEffect(() => {
    if (id) {
      dispatch(getDetailProductAction(id as any) as any);
    }
  }, [id]);

  useEffect(() => {
    setProductDetailData(productReducer.dataDetail);
    console.log(productDetailData);
  }, [productReducer.dataDetail]);

  // FUNCTION
  function timestampToString(timestamp: any) {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    const dateString = `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
    return dateString;
  }
  function formatCurrency(number: any) {
    const formatter = new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    });

    return formatter.format(number);
  }

  const _handleRegisterAuction = async (id: any) => {
    if (authReducer.id_token) {
      try {
        console.log('id_token: ', authReducer.id_token);
        await auctionService.registerAuction(id);
        toast.success('Đăng ký thành công');
      } catch (err) {
        toast.error('Bị lỗi: ' + err + ' Vui lòng liên hệ quản trị viên');
      }
    } else {
      toast.info('Chưa đăng nhập, vui lòng đăng nhập!');
    }
  };
  const _handlegotoDetailAuction = (id: any) => {
    if (authReducer.id_token) {
      router.push(`auction/product/${id}`);
    } else {
      toast.info('Chưa đăng nhập, vui lòng đăng nhập!');
    }
  };
  // RENDER

  return (
    <div className="detailProduct-page detail-page">
      <section className="section">
        <div className="section-pad ">
          <h2>{productDetailData?.name}</h2>
          <div className=" flex pt-11">
            <div className=" right wrap-img w-1/2">
              <img
                className="w-full"
                src={productDetailData?.imageUrl}
                alt="product-img"
              />
            </div>
            <div className=" ml-28 left w-1/2">
              {productDetailData?.auctionStatus === 'HAPPENING' ? (
                <div>
                  <p className="text-lg mb-10">Cuộc đấu giá đang diễn ra</p>
                  <Button
                    onClick={() => _handlegotoDetailAuction(id)}
                    className="w-full mb-10"
                    size="large"
                  >
                    Vào cuộc đấu giá
                  </Button>
                </div>
              ) : productDetailData?.auctionStatus === 'UP_COMING' ? (
                <div>
                  <p className="text-lg mb-10">Cuộc đấu giá sắp diễn ra</p>
                  <Button
                    onClick={() => _handleRegisterAuction(id)}
                    className="w-full mb-10"
                    size="large"
                  >
                    Đăng ký đấu giá
                  </Button>
                </div>
              ) : // : productDetailData?.auctionStatus === 'FINISHED' ? (
              //   <div>
              //     <p className="text-lg mb-10">Cuộc đấu giá sắp diễn ra</p>
              //     <Button className="w-full mb-10" size="large">
              //       Xem lịch sử đấu giá tại đây
              //     </Button>
              //   </div>
              // )
              null}

              <div className=" p-12  wrap-info grid grid-cols-2  border-2">
                <div>Mã tài sản:</div>
                <div className="text-primary">{productDetailData?.code}</div>
                <div>Tên tài sản:</div>
                <div className="text-primary">{productDetailData?.name}</div>
                <div>Mô tả:</div>
                <div className="text-primary">
                  {productDetailData?.description}
                </div>
                <div>Giá khởi điểm:</div>
                <div className="text-primary">
                  {formatCurrency(productDetailData?.minPrice)}
                </div>
                <div>Phí đăng ký đấu giá:</div>
                <div className="text-primary">
                  {formatCurrency(productDetailData?.registrationFee)}
                </div>
                <div>Tiền đặt trước:</div>
                <div className="text-primary">
                  {formatCurrency(productDetailData?.deposit)}
                </div>
                <div>Bước giá:</div>
                <div className="text-primary">
                  {formatCurrency(productDetailData?.stepFee)}
                </div>
                <div>Phân loại:</div>
                <div className="text-primary">
                  {productDetailData?.typeAsText}
                </div>
                <div>Tình trạng cuộc đấu giá:</div>
                <div className="text-primary">
                  {productDetailData?.auctionStatusAsText}
                </div>
                <div>Kết quả đấu giá:</div>
                <div className="text-primary">
                  {productDetailData?.resultStatusAsText}
                </div>
                <div>Thời gian đăng ký :</div>
                <div className="text-primary">
                  Từ{' '}
                  {timestampToString(productDetailData?.registrationStartTime)}{' '}
                  đến{' '}
                  {timestampToString(productDetailData?.registrationEndTime)}
                </div>
                <div>Thời gian đấu giá:</div>
                <div className="text-primary">
                  Từ {timestampToString(productDetailData?.activeTime)} đến{' '}
                  {timestampToString(productDetailData?.expireTime)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default withAppProvider(DetailProductPage);
