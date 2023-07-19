import { Form } from 'antd';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import SectionView from '../../layout/sections/renderSection';
import withAppProvider from '../../layout/wrapper/withAppProvider';
import { CategoryInterface } from '../../model/category';
import commonService from '../../services/common.service';
import { useAppSelector } from '../../store/hook';
import { getPageCategoriesAction } from '../../store/slices/recruitment.slice';
import { PropsPageInterface } from '../../types/page.interface';

const RecruimentPage = (props: PropsPageInterface) => {
  const { isSmallMobile } = props;
  const { t } = useTranslation('common');
  const recruitmentState = useAppSelector((state) => state.recruitment);
  const commonState = useAppSelector((state) => state.common);
  const dispatch = useDispatch();
  const router = useRouter();

  const [form] = Form.useForm();
  const [recruimentData, setRecruimentData] = useState<{
    categories: CategoryInterface[] | null;
    currentCategory: CategoryInterface | null;
  }>({
    categories: null,
    currentCategory: null,
  });

  //EFFECT
  useEffect(() => {
    if (recruitmentState) {
      setRecruimentData({
        ...recruimentData,
        categories: recruitmentState.categories,
      });
    }
  }, [recruitmentState]);

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
          'img/bannerRecruiment2.png'
        );
        setRecruimentData({
          ...recruimentData,
          currentCategory,
        });
        dispatch(getPageCategoriesAction(currentCategory.id as string) as any);
      }
    }
  }, [commonState.headerCategories]);

  // SEED
  const optionsJob = [
    {
      label: 'Bán hàng/Marketing/Dịch vụ khách hàng',
      value: 'marketing',
    },
    {
      label: 'QA/QC',
      value: 'QAQC',
    },
    {
      label: 'Sản xuất',
      value: 'produce',
    },
    {
      label: 'Thiết kế kiểu dáng/Đồ hoạ',
      value: 'design',
    },
    {
      label: 'Công nghệ vật liệu/Kết cấu',
      value: 'material',
    },
  ];
  const optionCountries = [
    {
      label: 'Hà Nội',
      value: 'HN',
    },
    {
      label: 'Đà Nẵng',
      value: 'DN',
    },
    {
      label: 'Thành phố HCM',
      value: 'HCM',
    },
  ];

  // FUNCTION
  const handleChange = (value: string) => {};

  const normFile = (e: any) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const onFinish = (value: any) => {
    console.log('form.value :>> ', value);
  };

  // RENDER
  const configForm = {
    rules: [{ required: true, message: 'Trường bắt buộc' }],
  };

  return (
    <div className="recruiment-page">
      <SectionView
        category={recruimentData.currentCategory}
        optionJobs={optionsJob}
        optionCountries={optionCountries}
        handleChange={handleChange}
      />
      {recruimentData.categories &&
        recruimentData.categories.map((category) => (
          <section
            className="section animation-title"
            key={category.id}
            id={category.id}
          >
            <SectionView
              category={category}
              form={form}
              configForm={configForm}
              onFinish={onFinish}
              normFile={normFile}
            />
          </section>
        ))}
    </div>
  );
};

export default withAppProvider(RecruimentPage);
