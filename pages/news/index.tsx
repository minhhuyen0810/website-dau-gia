import { Input, Menu, MenuProps } from 'antd';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import SectionView from '../../layout/sections/renderSection';
import withAppProvider from '../../layout/wrapper/withAppProvider';
import { CategoryInterface } from '../../model/category';
import { PostInterface } from '../../model/post';
import commonService from '../../services/common.service';
import { useAppSelector } from '../../store/hook';
import {
  getPageCategoriesAction,
  getSubCategoriesAction,
} from '../../store/slices/news.slice';

const NewsPage = () => {
  const dispatch = useDispatch();
  const commonState = useAppSelector((state) => state.common);
  const newsPageState = useAppSelector((state) => state.newsPage);
  const router = useRouter();
  const [newsPageData, setNewsPageData] = useState<{
    categories: CategoryInterface[] | null;
    categorySelected: CategoryInterface | null;
    subCategories: CategoryInterface[] | null;
    currentCategory: CategoryInterface | null;
  }>({
    categories: null,
    categorySelected: null,
    subCategories: null,
    currentCategory: null,
  });

  const { Search } = Input;

  // EFFECT
  useEffect(() => {}, []);

  useEffect(() => {
    if (newsPageState.categories) {
      setNewsPageData({
        ...newsPageData,
        categories: newsPageState.categories,
        categorySelected: newsPageState.categorySelected,
      });
    }
    if (newsPageState.categorySelected) {
      dispatch(
        getSubCategoriesAction(
          newsPageState.categorySelected.id as string
        ) as any
      );
    }
  }, [newsPageState.categories, newsPageState.categorySelected]);

  useEffect(() => {
    if (newsPageState.subCategories) {
      setNewsPageData({
        ...newsPageData,
        subCategories: newsPageState.subCategories,
      });
    }
  }, [newsPageState.subCategories]);

  useEffect(() => {
    if (
      commonState.headerCategories &&
      commonState.headerCategories.length > 0
    ) {
      let currentCategory: CategoryInterface | null =
        commonService.getCurrentCategory(
          router.pathname,
          commonState.headerCategories
        );

      if (currentCategory) {
        currentCategory = commonService.setLocalImageForBanner(
          currentCategory,
          'img/bannerProduct.png'
        );
        setNewsPageData({
          ...newsPageData,
          currentCategory,
        });
        dispatch(getPageCategoriesAction(currentCategory.id as string) as any);
      }
    }
  }, [commonState.headerCategories]);

  // FUNCTION
  const goToDetail = (post: PostInterface) => {
    router.push(`news/${post.postLanguageId ? post.postLanguageId : post.id}`);
  };

  const onClick: MenuProps['onClick'] = (e) => {
    const categoryFound = newsPageData.categories?.find(
      (category) => category.id === e.key
    );

    if (
      categoryFound &&
      categoryFound.id &&
      categoryFound.id !== newsPageData.categorySelected?.id
    ) {
      setNewsPageData({
        ...newsPageData,
        categorySelected: categoryFound || null,
      });
      dispatch(getSubCategoriesAction(categoryFound.id) as any);
    }
  };

  const onSearch = (value: string) => console.log(value);

  // RENDER
  return (
    <div className="news-page">
      <SectionView category={newsPageData.currentCategory} />
      <div className="news-page-content">
        <div className="wrap-menu-search">
          {newsPageData.categories && newsPageData.categories.length > 0 && (
            <Menu
              onClick={onClick}
              selectedKeys={[newsPageData.categorySelected?.id as string]}
              mode="horizontal"
              items={newsPageData.categories.map((category) => {
                return {
                  label: category.title,
                  key: category.id,
                } as any;
              })}
              className="custom-menu"
              disabledOverflow
            />
          )}

          <Search
            placeholder="Tìm kiếm ...."
            onSearch={onSearch}
            style={{ width: 200 }}
          />
        </div>
        {
          <SectionView
            category={newsPageData.categorySelected}
            goToDetail={goToDetail}
          />
        }

        {newsPageData.subCategories &&
          newsPageData.subCategories.length > 0 &&
          newsPageData.subCategories.map((category: CategoryInterface) => (
            <SectionView
              category={category}
              goToDetail={(post: PostInterface) => goToDetail(post)}
              key={category.id}
            />
          ))}
      </div>
    </div>
  );
};

export default withAppProvider(NewsPage);
