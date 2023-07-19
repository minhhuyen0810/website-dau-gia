import { Button, Col, Row } from 'antd';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { CategoryInterface } from '../../model/category';
import Title from '../Title';
import PreloadImage from './PreloadImage';

interface IProductCategoriesProps {
  category: CategoryInterface;
  rootCategory?: boolean;
}

const ProductCategories = (props: IProductCategoriesProps) => {
  const { t } = useTranslation('common');
  const router = useRouter();
  const [category, setCategory] = useState<CategoryInterface>();

  useEffect(() => {
    if (props.category) {
      setCategory(props.category);
    }
  }, [props.category]);

  // FUNCTION
  const goToDetail = (categorySelected: CategoryInterface) => {
    if (
      !categorySelected.children ||
      categorySelected.children.length <= 0 ||
      (category && categorySelected.id === category.id)
    ) {
      router.push(`/product/${categorySelected.id}`);
      return;
    } else {
      router.push(`/product?id=${categorySelected.id}`);
    }
    setCategory(categorySelected);
  };

  return category ? (
    <React.Fragment>
      <Title title={category.title || ''} cssClass="title-common underline" />
      <Row>
        {category.children &&
          category.children.map((subCategory: CategoryInterface) => (
            <Col
              xs={{ span: 24 }}
              md={{ span: 12 }}
              xl={{ span: 8 }}
              key={subCategory.id}
            >
              <div className="wrap-article" key={subCategory.id}>
                <div
                  className="product-slide article"
                  key={subCategory.id}
                  onClick={() => goToDetail(subCategory)}
                >
                  <PreloadImage
                    src={subCategory.url}
                    altAttribute="image"
                    cssClass="image"
                    layout="fill"
                  />

                  <div className="article-item-content">
                    <h4 className="iBold name">{subCategory.title}</h4>
                  </div>
                  <div className="article-item-des">
                    <Button
                      className="menu-item btn-common primary btn-additional iBold"
                      id="btnReadMore"
                      aria-label="Button read more"
                    >
                      {t('READ_MORE')}
                    </Button>
                  </div>
                </div>
              </div>
            </Col>
          ))}
        {!props.rootCategory && (
          <Col
            xs={{ span: 24 }}
            md={{ span: 12 }}
            xl={{ span: 8 }}
            key={category?.id}
          >
            <div className="wrap-article" key={category?.id}>
              <div
                className="product-slide article"
                key={category?.id}
                onClick={() => goToDetail(category)}
              >
                <PreloadImage
                  src={category?.url}
                  altAttribute="image"
                  cssClass="image"
                  layout="fill"
                />

                <div className="article-item-content">
                  <h4 className="iBold name">{t('PRODUCT_OTHERS')}</h4>
                </div>
                <div className="article-item-des">
                  <Button
                    className="menu-item btn-common primary btn-additional iBold"
                    id="btnReadMore2"
                    aria-label="Button read more"
                  >
                    {t('READ_MORE')}
                  </Button>
                </div>
              </div>
            </div>
          </Col>
        )}
      </Row>
    </React.Fragment>
  ) : null;
};

export default ProductCategories;
