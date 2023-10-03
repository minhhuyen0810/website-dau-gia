import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import SectionView from '../../layout/sections/renderSection';
import withAppProvider from '../../layout/wrapper/withAppProvider';
import { CategoryInterface } from '../../model/category';
import commonService from '../../services/common.service';
import { useAppSelector } from '../../store/hook';
import { getPageCategoriesAction } from '../../store/slices/product.slice';
import { PropsPageInterface } from '../../types/page.interface';
import PreloadImage from '../../layout/components/PreloadImage';

const ProductPage = (props: PropsPageInterface) => {
  const dispatch = useDispatch();
  const commonState = useAppSelector((state) => state.common);
  const productState = useAppSelector((state) => state.product);
  const router = useRouter();
  const { id } = router.query;
  const [currentCategory, setCurrentCategory] =
    useState<CategoryInterface | null>(null);
  const [categoryTree, setCategoryTree] = useState<CategoryInterface | null>(
    null
  );
  //EFFECT
  // useEffect(() => {
  //   if (productState.categoryTree) {
  //     setCategoryTree(productState.categoryTree);
  //   }
  // }, [productState.categoryTree]);

  // useEffect(() => {
  //   let currentCategory: CategoryInterface | null = null;
  //   if (
  //     commonState.headerCategories &&
  //     commonState.headerCategories.length > 0
  //   ) {
  //     currentCategory = commonService.getCurrentCategory(
  //       router.pathname,
  //       commonState.headerCategories
  //     );
  //   }
  //   const categoryId = id ? id : currentCategory?.id;
  //   if (categoryId) {
  //     dispatch(getPageCategoriesAction(categoryId as string) as any);
  //   }
  //   setCurrentCategory(currentCategory);
  // }, [commonState.headerCategories, id]);

  // FUNCTION

  // RENDER
  return (
    <div className="product-page">
      {/* <SectionView category={currentCategory} /> */}
      <section className="section section-banners">
        <PreloadImage
          src="/img/bannerdanhmuctaisan.png"
          altAttribute="banner"
          cssClass="image-banner"
          layout="fill"
          priority
        />
        <div className="content-banner">
          <h1 className="title-common">Danh mục tài sản đấu giá</h1>
        </div>
      </section>
      <section className="section animation-title"></section>
    </div>
  );
};

export default withAppProvider(ProductPage);
