import { ArrowRightOutlined, UploadOutlined } from '@ant-design/icons';
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Radio,
  Row,
  Select,
  Space,
  Upload,
} from 'antd';
import moment from 'moment';
import useTranslation from 'next-translate/useTranslation';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { SliderInterface } from '../../model/banner';
import { CategoryInterface } from '../../model/category';
import { PartnerInterface } from '../../model/partner';
import { PostInterface } from '../../model/post';
import { DisplayEnum } from '../../types/display.interface';
import PreloadImage from '../components/PreloadImage';
import ProductCategories from '../components/ProductCategories';
import ProductList from '../components/ProductList';
import Title from '../Title';

interface SectionViewInterface {
  category: CategoryInterface | null;
  index?: number;
  isSmallMobile?: boolean;
  animationSections?: any;
  setAnimationSections?: any;
  certificates?: PartnerInterface[];
  partners?: PartnerInterface[] | null;
  postHighlights?: PostInterface[] | null;
  goToDetail?: any;
  isShowContentHtml?: boolean;

  optionJobs?: any;
  optionCountries?: any;
  handleChange?: any;

  form?: any;
  configForm?: any;
  onFinish?: any;
  normFile?: any;
}

const SectionView = (props: SectionViewInterface) => {
  const {
    category,
    index,
    isSmallMobile,
    partners,
    certificates,
    postHighlights,
    goToDetail,
    optionJobs,
    optionCountries,
    handleChange,
    form,
    configForm,
    onFinish,
    normFile,
    isShowContentHtml,
  } = props;
  const { t, lang } = useTranslation('common');
  const router = useRouter();
  const [isMobile, setIsMobile] = useState<boolean>(false);
  // Setting slider
  const [settingPartnerSlide, setSettingPartnerSlide] = useState({
    dots: false,
    centerPadding: '50px',
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    className: 'custom-slick dark',
  });
  const [settingLeaderSlide, setSettingLeaderSlide] = useState({
    dots: false,
    centerPadding: '50px',
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    className: 'custom-slick dark',
  });
  const [settingSlideNews, setSettingSlideNews] = useState({
    dots: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    className: 'custom-slick',
    infinite: true,
  });

  // PRODUCTION PAGE SLIDE
  const [settingsProductSlide, setSettingsProductSlide] = useState({
    dots: false,
    centerPadding: '50px',
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    className: 'custom-slick',
  });

  // EFFECT
  useEffect(() => {
    if (window) {
      setIsMobile(window.outerWidth <= 768);
      if (window.outerWidth <= 320) {
        setSettingSlideNews({
          ...settingSlideNews,
          slidesToShow: 1,
        });
        setSettingsProductSlide({
          ...settingsProductSlide,
          slidesToShow: 1,
        });
      } else if (window.outerWidth <= 576) {
        setSettingSlideNews({
          ...settingSlideNews,
          slidesToShow: 1,
        });
        setSettingLeaderSlide({
          ...settingLeaderSlide,
          slidesToShow: 2,
        });
        setSettingPartnerSlide({
          ...settingPartnerSlide,
          slidesToShow: 1,
        });
        setSettingsProductSlide({
          ...settingsProductSlide,
          slidesToShow: 2,
        });
      } else if (window.outerWidth <= 768) {
        setSettingSlideNews({
          ...settingSlideNews,
          slidesToShow: 2,
        });
        setSettingLeaderSlide({
          ...settingLeaderSlide,
          slidesToShow: 3,
        });
        setSettingPartnerSlide({
          ...settingPartnerSlide,
          slidesToShow: 2,
        });
      } else if (window.outerWidth <= 1024) {
        setSettingSlideNews({
          ...settingSlideNews,
          slidesToShow: 3,
        });
        setSettingLeaderSlide({
          ...settingLeaderSlide,
          slidesToShow: 4,
        });
        setSettingPartnerSlide({
          ...settingPartnerSlide,
          slidesToShow: 4,
        });
      }
    }
  }, [typeof window]);

  const renderSection = (category: CategoryInterface) => {
    const postData: PostInterface[] = category.posts;
    const slider: SliderInterface | undefined = category.banner?.sliders[0];
    switch (category.type) {
      case DisplayEnum.BANNER_MAIN_CONTAINER:
        return slider ? (
          <section className="section section-banners">
            <PreloadImage
              src={slider.imgage || ''}
              altAttribute="banner"
              cssClass="image-banner"
              layout="fill"
              priority
            />
            <div className="content-banner">
              <p className="heading">{slider.title}</p>
              <h1 className="title-common">{slider.content}</h1>
            </div>
          </section>
        ) : null;
      case DisplayEnum.BANNER_RECRUITMENT_CONTAINER:
        return slider ? (
          <section className="section section-banners">
            <PreloadImage
              src={slider.imgage}
              altAttribute="banner"
              cssClass="image-banner"
              layout="fill"
              priority
            />
            <div className="content-banner">
              <p className="heading">{slider.title}</p>
              <h1 className="title-common">{slider.content}</h1>
              <div className="content-banner-select">
                <Select
                  placeholder="Ngành nghề"
                  style={{ width: 120 }}
                  onChange={handleChange}
                  options={optionJobs}
                  className="select-banner"
                />
                <Select
                  placeholder="Địa điểm"
                  style={{ width: 120 }}
                  onChange={handleChange}
                  options={optionCountries}
                  className="select-banner"
                />
                <Button
                  className="menu-item btn-common primary btn-search"
                  id="btnSearch"
                  aria-label="Button search"
                >
                  {t('SEARCH')}
                </Button>
              </div>
            </div>
          </section>
        ) : null;
      case DisplayEnum.BANNER_LEFT_CONTAINER:
        const posts = category.posts;
        return (
          <section
            className="section animation-title"
            key={category.id}
            id={category.slug}
          >
            <div className="section-intro section-pad" id={category.id}>
              <Title
                title={category.title || ''}
                cssClass="title-common underline"
              />
              {posts &&
                posts.map((post: PostInterface) => (
                  <>
                    {!isMobile ? (
                      <Row
                        gutter={32}
                        className="banner-left-container"
                        key={post.id}
                      >
                        <Col span={12}>
                          <div
                            className="text-content-html"
                            dangerouslySetInnerHTML={{
                              __html:
                                (isShowContentHtml
                                  ? post.contentHtml
                                  : post.content) || '',
                            }}
                          ></div>
                        </Col>
                        <Col span={12} className="right">
                          <PreloadImage
                            src={post.icon}
                            altAttribute="frame image"
                            cssClass="image"
                            layout="fill"
                          />
                        </Col>
                      </Row>) : (<Row
                        gutter={32}
                        className="banner-left-container"
                        key={post.id}
                      >
                        <Col>
                          <PreloadImage
                            src={post.icon}
                            altAttribute="frame image"
                            cssClass="image"
                            layout="fill"
                          />
                        </Col>
                        <Col>
                          <div
                            className="text-content-html"
                            dangerouslySetInnerHTML={{
                              __html:
                                (isShowContentHtml
                                  ? post.contentHtml
                                  : post.content) || '',
                            }}
                          ></div>
                        </Col>
                      </Row>)}
                  </>
                ))}
            </div>
          </section>
        );
      case DisplayEnum.BANNER_MERGE_CONTAINER:
        const postUp = category.posts[0];
        const postDown = category.posts[1];
        return (
          <section className="section-intro" id={category.slug}>
            <PreloadImage
              src={category.url}
              altAttribute="banner about us"
              cssClass="image-banner"
              cssClassSkeleton="dark"
              layout="fill"
            />
            {postUp && (
              <div className="content-banner-top">
                <h1 className="title-common underline">{postUp.title}</h1>
                <p className="description">{postUp.content}</p>
              </div>
            )}
            {postDown && (
              <div className="content-banner-bottom">
                <h1 className="title-common underline">{postDown.title}</h1>
                <p className="description text-pre-wrap">{postDown.content}</p>
              </div>
            )}
          </section>
        );
      case DisplayEnum.LEADER_SLIDE_CONTAINER:
        const leaders = category.posts;
        return (
          <section className="section animation-title" id={category.slug}>
            <div className="section-intro section-pad" id={category.id}>
              <Title
                title={category.title || ''}
                cssClass="title-common underline"
              />

              <Slider {...settingLeaderSlide}>
                {leaders.map((leader: PostInterface) => (
                  <div className="slide-leader" key={leader.id}>
                    <PreloadImage
                      src={leader?.icon}
                      altAttribute="image"
                      cssClass="slide-leader-image"
                      cssClassSkeleton="dark"
                      layout="fill"
                    />
                    <div className="slider-leader-separate"></div>
                    <div className="slide-leader-content">
                      <h4 className="name">{leader.name}</h4>
                      <p className="role caption1">{leader.content}</p>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </section>
        );
      case DisplayEnum.NEWS_1_CONTAINER:
        const newHighlight = category.posts[0];
        const newsPosts = category.posts.slice(1, category.posts.length);
        return (
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            {newHighlight && newHighlight && (
              <Col
                className="highlight"
                md={24}
                lg={16}
                onClick={() => goToDetail(newHighlight)}
              >
                <div className="item-highlight">
                  {newHighlight.icon && (
                    <PreloadImage
                      src={newHighlight.icon}
                      altAttribute="image new highlight"
                      cssClass="item-highlight-image"
                      layout="fill"
                    />
                  )}
                  <div className="item-highlight-content">
                    <p className="caption1">
                      {moment(newHighlight.createdAt).format('DD/MM/YYYY')}
                    </p>
                    <h3>{newHighlight.title}</h3>
                  </div>
                </div>
              </Col>
            )}
            {newsPosts &&
              newsPosts.length > 0 &&
              newsPosts.map((post: PostInterface) => (
                <Col
                  xs={24}
                  md={12}
                  lg={8}
                  className="wrap-item-new"
                  key={post.id}
                  onClick={() => goToDetail(post)}
                >
                  <div className="item-new">
                    <PreloadImage
                      src={post.icon}
                      altAttribute="image"
                      cssClass="item-new-image"
                      layout="fill"
                    />
                    <div className="item-new-content">
                      <h4>{post.title}</h4>
                    </div>
                    <div className="item-new-footer">
                      <span className="left">
                        {moment(post.createdAt).format('DD/MM/YYYY')}
                      </span>
                      {/* <div className="right">
                      <div className="like">
                        <img src="../icons/ic-like.svg" className="icon" />
                        <span>{post.like}</span>
                      </div>
                      <div className="view">
                        <img src="../icons/ic-eye.svg" className="icon" />
                        <span>{post.view}</span>
                      </div>
                    </div> */}
                    </div>
                  </div>
                </Col>
              ))}
          </Row>
        );
      case DisplayEnum.NEWS_2_CONTAINER:
        const postsSubCategory = category.posts;
        return (
          <section className="section-news-page">
            <h4 className="title">
              <span>{category.title}</span>
            </h4>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              {postsSubCategory.map((post: PostInterface) => (
                <Col
                  sm={24}
                  md={12}
                  key={post.id}
                  onClick={() => goToDetail(post)}
                >
                  <div className="item-activity">
                    <PreloadImage
                      src={post.icon}
                      altAttribute="image"
                      cssClass="item-activity-image"
                      layout="fill"
                    />
                    <div className="item-activity-content">
                      <p className="date m-0">
                        {moment(post.createdAt).format('DD/MM/YYYY')}
                      </p>
                      <h4>{post.title}</h4>
                      {/* <div className="actions">
                        <div className="like">
                          <img src="../icons/ic-like.svg" className="icon" />
                          <span>{item.like}</span>
                        </div>
                        <div className="view">
                          <img src="../icons/ic-eye.svg" className="icon" />
                          <span>{item.view}</span>
                        </div>
                      </div> */}
                      <p className="description">{post.content}</p>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          </section>
        );
      case DisplayEnum.NEWS_3_CONTAINER:
        const firstPost = category.posts[0];
        const restPosts = category.posts.slice(1, category.posts.length);
        return (
          <section className="section-news-page">
            <h4 className="title">
              <span>Con người VMC</span>
            </h4>

            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              {firstPost && (
                <Col xs={24} onClick={() => goToDetail(firstPost)}>
                  <div className="item-activity horizontal big">
                    <PreloadImage
                      src={firstPost.icon}
                      altAttribute="image"
                      cssClass="item-activity-image"
                      layout="fill"
                    />
                    <div className="item-activity-content">
                      <p className="date m-0">
                        {moment(firstPost.createdAt).format('DD/MM/YYYY')}
                      </p>
                      <h4>{firstPost.title}</h4>
                      {/* <div className="actions">
                        <div className="like">
                          <img src="../icons/ic-like.svg" className="icon" />
                          <span>12</span>
                        </div>
                        <div className="view">
                          <img src="../icons/ic-eye.svg" className="icon" />
                          <span>200</span>
                        </div>
                      </div> */}
                      <p className="description">{firstPost.content}</p>
                    </div>
                  </div>
                </Col>
              )}
              {restPosts &&
                restPosts.map((post: PostInterface) => (
                  <Col
                    xs={24}
                    md={12}
                    lg={8}
                    className="wrap-item-new"
                    key={post.id}
                    onClick={() => goToDetail(post)}
                  >
                    <div className="item-new">
                      <PreloadImage
                        src={post.icon}
                        altAttribute="image"
                        cssClass="item-new-image"
                        layout="fill"
                      />
                      <div className="item-new-content">
                        <h4>{post.title}</h4>
                      </div>
                      <div className="item-new-footer">
                        <span className="left">
                          {moment(post.createdAt).format('dd/mm/yyyy')}
                        </span>
                        {/* <div className="right">
                        <div className="like">
                          <img src="../icons/ic-like.svg" className="icon" />
                          <span>{item.like}</span>
                        </div>
                        <div className="view">
                          <img src="../icons/ic-eye.svg" className="icon" />
                          <span>{item.view}</span>
                        </div>
                      </div> */}
                      </div>
                    </div>
                  </Col>
                ))}
            </Row>
          </section>
        );
      case DisplayEnum.PRODUCTS_SLIDE_CONTAINER:
        return (
          <div
            className="section-intro section-pad"
            id={category.id}
            key={category.id}
          >
            <ProductCategories category={category} />
          </div>
        );
      case DisplayEnum.SERVICE_SLIDE_CONTAINER:
        return (
          <div
            className="section-intro section-pad"
            id={category.id}
            key={category.id}
          >
            <ProductCategories category={category} rootCategory={true} />
          </div>
        );
      case DisplayEnum.PRODUCT_DETAIL_CONTAINER:
        return <ProductList posts={postData} />;
      case DisplayEnum.RECRUIMENT_SLIDE_CONTAINER:
        return (
          <div className="section-intro section-pad" key={category.id}>
            <Title
              title={category.title || ''}
              cssClass="title-common underline"
            />
            <Row>
              {postData.map((post: PostInterface) => (
                <Col
                  xs={{ span: 24 }}
                  md={{ span: 12 }}
                  xl={{ span: 6 }}
                  key={post.id}
                >
                  <div
                    className="recruiment-process"
                    onClick={() => router.push(`/news/${post.id}`)}
                  >
                    <PreloadImage
                      src={post.icon}
                      altAttribute="image"
                      cssClass="recruiment-process-image"
                      layout="fill"
                    />
                    <div className="recruiment-process-content">
                      <h4 className="iBold">{post.title}</h4>
                      {post.content && (
                        <p className="description">{post.content}</p>
                      )}
                      <Button
                        className="btn-next"
                        id={`btnNext${post.id}`}
                        aria-label="Button arrow"
                      >
                        <ArrowRightOutlined />
                      </Button>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          </div>
        );
      case DisplayEnum.RECRUIMENT_SLIDE_2_CONTAINER:
        return (
          <div className="section-dark section-pad section-environment ">
            <Title
              title={category.title || ''}
              cssClass="title-common underline"
            />
            <h3 className="subHead i300">{category.description}</h3>
            <Row>
              <Col span={24}>
                <PreloadImage
                  src={category.url}
                  altAttribute="banner"
                  cssClass="banner-environment"
                  layout="fill"
                />
              </Col>
              {postData.map((post: PostInterface) => (
                <Col xs={{ span: 12 }} md={{ span: 8 }} key={post.title}>
                  {/* <div
                    className="recruiment-process"
                    onClick={() => router.push(`/news/${post.id}`)}
                  >
                    <PreloadImage
                      src={post.icon}
                      altAttribute="image"
                      cssClass="recruiment-process-image"
                      layout="fill"
                    />
                    <div className="recruiment-process-content">
                      <h4 className="iBold">{post.title}</h4>
                      {post.content && (
                        <p className="description">{post.content}</p>
                      )}
                      <Button
                        className="btn-next"
                        id={`btnNext1${post.id}`}
                        aria-label="Button arrow"
                      >
                        <ArrowRightOutlined />
                      </Button>
                    </div>
                  </div> */}
                </Col>
              ))}
            </Row>
          </div>
        );
      case DisplayEnum.RECRUIMENT_FORM_CONTAINER:
        const layout = {
          labelCol: { xs: { span: 12 }, xl: { span: 8 } },
          wrapperCol: { xs: { span: 12 }, xl: { span: 16 } },
          labelAlign: 'left' as any,
        };
        return (
          <div className="section-pad section-form">
            <Title
              title={category.title || ''}
              cssClass="title-common underline"
            />
            <Form {...layout} form={form} onFinish={onFinish}>
              <Row gutter={32}>
                <Col xs={{ span: 24 }} md={{ span: 12 }}>
                  <Form.Item
                    name="fullname"
                    label={t('FULL_NAME')}
                    labelAlign="left"
                    {...configForm}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label={t('DATE_OF_BIRTH')}
                    {...configForm}
                    name="birthday"
                  >
                    <DatePicker placeholder="Chọn ngày" style={{ width: "100%" }} />
                  </Form.Item>
                  <Form.Item label={t('SEX')} name="gender" {...configForm}>
                    <Radio.Group buttonStyle="solid">
                      <Radio value="male" className="custom-radio">
                        {t('MALE')}
                      </Radio>
                      <Radio value="female" className="custom-radio">
                        {t('FEMALE')}
                      </Radio>
                    </Radio.Group>
                  </Form.Item>
                  <Form.Item
                    name="phoneNumber"
                    label={t('PHONE')}
                    {...configForm}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item name="email" label="Email" {...configForm}>
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name="role"
                    label={t('POSITION_RECRUITMENT')}
                    {...configForm}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col xs={{ span: 24 }} md={{ span: 12 }}>
                  <Form.Item
                    name="address"
                    label={t('TRAINING_PLACE')}
                    {...configForm}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item name="level" label={t('LEVEL')} {...configForm}>
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name="major"
                    label={t('SPECIALIZED_TRAINING')}
                    {...configForm}
                  >
                    <Select>
                      <Select.Option value="demo">Demo</Select.Option>
                    </Select>
                  </Form.Item>
                  <Form.Item
                    name="yearGraduate"
                    label={t('GRADUATION_YEAR')}
                    {...configForm}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name="typeGraduate"
                    label={t('GRADUATION_TYPE')}
                    {...configForm}
                  >
                    <Select>
                      <Select.Option value="demo">Demo</Select.Option>
                    </Select>
                  </Form.Item>
                  <Form.Item
                    name="certificateEnglish"
                    label={t('CERTIFICATE_LANGUAGE')}
                    {...configForm}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
              <Space className="wrap-buttons">
                <Form.Item
                  name="upload"
                  valuePropName="fileList"
                  getValueFromEvent={normFile}
                  extra={t('UPLOAD_REQUIRED')}
                  className="upload"
                  wrapperCol={{ span: 24 }}
                >
                  <Upload
                    name="logo"
                    action="/upload.do"
                    listType="picture"
                  >
                    <Button
                      className="btn-common primary outline btn-upload"
                      id="btnUpload"
                      aria-label="Button upload"
                      icon={<UploadOutlined />}
                    >
                      {t('PERSONAL_PROFILE')}
                    </Button>
                  </Upload>
                </Form.Item>
                <Button
                  htmlType="submit"
                  id="btnApply"
                  aria-label="Button apply"
                  className="btn-common primary submit"
                >
                  {t('APPLY')}
                </Button>
              </Space>
            </Form>
          </div>
        );
      case DisplayEnum.CAPACITY_QLCL_CONTAINER:
        return (
          <div className="section-banners qlcl">
            <PreloadImage
              src={category.url}
              altAttribute="banner"
              cssClass="image-banner"
              layout="fill"
            />
            <div className="content-banner">
              <h1 className="title">{category.title}</h1>
            </div>
          </div>
        );
      case DisplayEnum.CAPACITY_ALL_TEXT_CONTAINER:
        return (
          <div
            className="section-pad section-intro section-dark"
            id={category.id}
          >
            {isSmallMobile ? (
              <h1 className="title-common underline">{category.title}</h1>
            ) : (
              <Title
                title={category.title || ''}
                cssClass="title-common underline"
              />
            )}
            {postData &&
              postData.length > 0 &&
              postData.map((post: PostInterface) => (
                <div className="section-intro-body system" key={post.id}>
                  <div className="left">
                    <h4 className="description">{post.title}</h4>
                  </div>
                  <div
                    className="right text-content-html"
                    dangerouslySetInnerHTML={{
                      __html: post.content as string,
                    }}
                  ></div>
                </div>
              ))}
          </div>
        );
      case DisplayEnum.POST_HIGHLIGHT_CONTAINER:
        return (
          <div
            className="section section-news"
            id={category.id}
            key={category.id}
          >
            {isSmallMobile ? (
              <h1 className="title-common underline">{category.title}</h1>
            ) : (
              <Title
                title={category.title || ''}
                cssClass="title-common underline"
                id={category.id}
              />
            )}

            <div className="body">
              <Slider {...settingSlideNews}>
                {postHighlights &&
                  postHighlights.map((post: PostInterface) => (
                    <div className="wrap-article" key={post.id}>
                      <div className="article">
                        <PreloadImage
                          src={post?.icon}
                          altAttribute="image"
                          cssClass="image"
                          layout="fill"
                        />

                        <div className="article-item-content">
                          <h3 className="iBold">{post.title}</h3>
                          <span className="date caption1">
                            {moment(post.createdAt).format('DD/MM/YYYY')}
                          </span>
                        </div>
                        <div className="article-item-des">
                          <p>{post.content}</p>
                          <Button
                            id={`btnNext2${post.id}`}
                            aria-label="Button read more"
                            className="menu-item btn-common primary btn-additional iBold"
                            onClick={() =>
                              router.push(
                                `/news/${post.postLanguageId
                                  ? post.postLanguageId
                                  : post.id
                                }`
                              )
                            }
                          >
                            {t('READ_MORE')}
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
              </Slider>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return category ? renderSection(category) : null;
};

export default SectionView;
