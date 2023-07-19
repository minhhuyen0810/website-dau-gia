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

const DetailProductPage = () => {
  const { t } = useTranslation('common');
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();
  const productDetailState = useAppSelector((state) => state.productDetail);
  const [productDetailData, setProductDetailData] = useState<{
    category: CategoryInterface | null;
  }>({
    category: null,
  });

  // EFFECT
  useEffect(() => {
    if (id) {
      dispatch(getCategoryAction(id as string) as any);
    }
  }, [id]);

  useEffect(() => {
    if (productDetailState.category) {
      setProductDetailData({
        category: productDetailState.category,
      });
    }
    console.log('pro :>> ', productDetailState.category);
  }, [productDetailState.category]);

  // FUNCTION

  // RENDER

  return (
    <div className="detailProduct-page detail-page">
      <section className="section section-banners">
        <div className="image-banner">
          <Image src="/img/bannerDetail.png" alt="banner" layout="fill" />
        </div>
        <div className="content-banner">
          {/* <p className="heading">{Sa}</p> */}
          <h1 className="title">{productDetailData.category?.title}</h1>
          <Button
            className="menu-item btn-common btn-round-spec primary"
            onClick={() => router.push('/contact')}
            id={`btnOrderMore`}
            aria-label="Button order more"
          >
            {t('ORDER_NOW')}
          </Button>
        </div>
      </section>
      <section className="section">
        <div className="section-pad">
          <SectionView
            category={
              {
                ...productDetailData.category,
                type: DisplayEnum.PRODUCT_DETAIL_CONTAINER,
              } as CategoryInterface
            }
          />
        </div>
      </section>
    </div>
  );
};
export default withAppProvider(DetailProductPage);
