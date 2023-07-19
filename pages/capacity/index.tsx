import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import SectionView from '../../layout/sections/renderSection';
import withAppProvider from '../../layout/wrapper/withAppProvider';
import { CategoryInterface } from '../../model/category';
import commonService from '../../services/common.service';
import { useAppSelector } from '../../store/hook';
import { getPageCategoriesAction } from '../../store/slices/capacity.slice';
import { PropsPageInterface } from '../../types/page.interface';

const CapacityPage = (props: PropsPageInterface) => {
  const { t } = useTranslation('common');
  const capacityState = useAppSelector((state) => state.capacity);
  const commonState = useAppSelector((state) => state.common);
  const dispatch = useDispatch();
  const router = useRouter();

  const [capacityData, setCapacityData] = useState<{
    categories: CategoryInterface[] | null;
    currentCategory: CategoryInterface | null;
  }>({
    categories: null,
    currentCategory: null,
  });

  // EFFECT

  useEffect(() => {
    if (capacityState.categories) {
      setCapacityData({
        ...capacityData,
        categories: capacityState.categories,
      });
    }
  }, [capacityState.categories]);

  useEffect(() => {
    if (
      commonState.headerCategories &&
      commonState.headerCategories.length > 0
    ) {
      const currentCategory: CategoryInterface | null =
        commonService.getCurrentCategory(
          router.pathname,
          commonState.headerCategories
        );

      if (currentCategory) {
        setCapacityData({
          ...capacityData,
          currentCategory,
        });
        dispatch(getPageCategoriesAction(currentCategory.id as string) as any);
      }
    }
  }, [commonState.headerCategories]);
  // SEED

  // FUNCTION

  // RENDER

  return (
    <div className="capacity-page">
      <SectionView category={capacityData.currentCategory} />
      {capacityData.categories &&
        capacityData.categories.map(
          (category: CategoryInterface, index: number) => (
            <section className="section animation-title" id={category.id}>
              <SectionView
                category={category}
                index={index}
                isShowContentHtml={true}
              />
            </section>
          )
        )}
    </div>
  );
};

export default withAppProvider(CapacityPage);
