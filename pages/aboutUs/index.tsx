import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import SlidePartners from '../../layout/components/SlidePartners';
import SectionView from '../../layout/sections/renderSection';
import Title from '../../layout/Title';
import withAppProvider from '../../layout/wrapper/withAppProvider';
import { CategoryInterface } from '../../model/category';
import commonService from '../../services/common.service';
import { useAppSelector } from '../../store/hook';
import { getPageCategoriesAction } from '../../store/slices/aboutUs.slice';
import { getPartnersAction } from '../../store/slices/common.slice';
import { PropsPageInterface } from '../../types/page.interface';

const AboutUsPage = (props: PropsPageInterface) => {
  const { t } = useTranslation('common');
  const { isSmallMobile } = props;
  const aboutUsState = useAppSelector((state) => state.aboutUs);
  const commonState = useAppSelector((state) => state.common);
  const dispatch = useDispatch();
  const router = useRouter();

  const [aboutUsData, setAboutUsData] = useState<{
    categories: CategoryInterface[] | null;
    currentCategory: CategoryInterface | null;
  }>({
    categories: null,
    currentCategory: null,
  });

  // EFFECT
  useEffect(() => {
    initialize();
  }, []);

  useEffect(() => {
    if (aboutUsState.categories) {
      setAboutUsData({ ...aboutUsData, categories: aboutUsState.categories });
    }
  }, [aboutUsState.categories]);

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
          '/img/bannerAbout.jpeg'
        );
        setAboutUsData({
          ...aboutUsData,
          currentCategory,
        });
        dispatch(getPageCategoriesAction(currentCategory.id as string) as any);
      }
    }
  }, [commonState.headerCategories]);

  const initialize = () => {
    if (!commonState.partners || commonState.partners.length <= 0) {
      dispatch(getPartnersAction() as any);
    }
  };

  return (
    <div className="aboutUs-page">
      <SectionView category={aboutUsData.currentCategory} />
      {aboutUsData.categories &&
        aboutUsData.categories.map((category: CategoryInterface) => (
          <SectionView
            category={category}
            isSmallMobile={isSmallMobile}
            key={category.id}
          />
        ))}
      <section className="section customer">
        <div className="section-intro section-pad">
          <Title title={t('PARTNER')} cssClass="title-common underline" />
          <SlidePartners partners={commonState.partners} />
        </div>
      </section>
    </div>
  );
};

export default withAppProvider(AboutUsPage);
