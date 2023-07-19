import { Button, Carousel } from 'antd';
import moment from 'moment';
import useTranslation from 'next-translate/useTranslation';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Slider from 'react-slick';
import PreloadImage from '../layout/components/PreloadImage';
import SlidePartners from '../layout/components/SlidePartners';
import SectionView from '../layout/sections/renderSection';
import Title from '../layout/Title';
import withAppProvider from '../layout/wrapper/withAppProvider';
import { SliderInterface } from '../model/banner';
import { CategoryInterface } from '../model/category';
import { PartnerInterface } from '../model/partner';
import { PostInterface } from '../model/post';
import animationService from '../services/animation.service';
import { useAppSelector } from '../store/hook';
import {
  getCertificatesAction,
  getPartnersAction,
} from '../store/slices/common.slice';
import {
  getBannersAction,
  getHomeCategoriesAction,
  getPostHighlightsAction,
} from '../store/slices/home.slice';
import { DisplayEnum } from '../types/display.interface';
import { PropsPageInterface } from '../types/page.interface';

const HomePage = (props: PropsPageInterface) => {
  const { t } = useTranslation('common');
  const { isSmallMobile } = props;
  const dispatch = useDispatch();
  const homeState = useAppSelector((state) => state.home);
  const commonState = useAppSelector((state) => state.common);
  const router = useRouter();
  const [homeData, setHomeData] = useState<{
    banners: SliderInterface[] | null;
    categories: CategoryInterface[] | null;
    postSelected: PostInterface | null;
    postHighlights: PostInterface[] | null;
    partners: PartnerInterface[] | null;
    certificates: PartnerInterface[] | null;
    isLoadingBanner: boolean | null;
  }>({
    banners: [],
    categories: [],
    postSelected: null,
    postHighlights: null,
    partners: null,
    certificates: null,
    isLoadingBanner: null,
  });
  const [settingSlideNews, setSettingSlideNews] = useState({
    dots: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    className: 'custom-slick',
    infinite: false,
  });
  const [settingCarousels, setSettingCarousels] = useState<any>({
    dots: { className: 'custom-dots' },
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    // autoplay: true,
    // loop: true,
  });
  const [employee, setEmployee] = useState<number>(900);
  const [country, setCountry] = useState<number>(0);

  // EFFECT
  useEffect(() => {
    initialize();
    animationService.scrollTrigger('#banners');
  }, []);
  useEffect(() => {
    if (homeState) {
      setHomeData({
        ...homeData,
        banners: homeState.banners?.sliders ? homeState.banners?.sliders : [],
        categories: homeState.categories,
        postSelected: homeState.businessPostSelected,
        postHighlights: homeState.postHighlights,
        partners: commonState.partners,
        certificates: commonState.certificates,
        isLoadingBanner: homeState.isLoadingBanner,
      });
    }
  }, [homeState]);

  useEffect(() => {
    dispatch(getHomeCategoriesAction() as any);
    dispatch(getPostHighlightsAction() as any);
  }, []);

  useEffect(() => {
    if (window) {
      if (window.outerWidth <= 576) {
        setSettingSlideNews({
          ...settingSlideNews,
          slidesToShow: 1,
        });
      } else if (window.outerWidth <= 768) {
        setSettingSlideNews({
          ...settingSlideNews,
          slidesToShow: 2,
        });
      } else if (window.outerWidth <= 1024) {
        setSettingSlideNews({
          ...settingSlideNews,
          slidesToShow: 3,
        });
      }
    }
  }, [typeof window]);

  // FUNCTION
  const animationNumber = () => {
    let counterEmployee = employee;
    let counterCountry = country;

    const intervalInventor = setInterval(() => {
      counterEmployee += 1;
      setEmployee(counterEmployee);
      if (counterEmployee >= 1000) {
        clearInterval(intervalInventor);
      }
    }, 10);
    const intervalTechnology = setInterval(() => {
      counterCountry += 1;
      setCountry(counterCountry);
      if (counterCountry >= 10) {
        clearInterval(intervalTechnology);
      }
    }, 10);
  };

  const goDetail = (post: PostInterface) => {
    router.push('/capacity');
  };

  const initialize = () => {
    dispatch(getBannersAction() as any);
    if (!commonState.partners || commonState.partners.length <= 0) {
      dispatch(getPartnersAction() as any);
    }
    if (!commonState.certificates || commonState.certificates.length <= 0) {
      dispatch(getCertificatesAction() as any);
    }
  };

  const onChange = (currentSlide: number) => {
    console.log(currentSlide);
  };

  const onChangeNav = (item: PostInterface) => {
    setHomeData({ ...homeData, postSelected: item });
  };

  // RENDER
  const renderSection = (category: CategoryInterface) => {
    switch (category.type) {
      case DisplayEnum.BANNER_CONTAINER:
        const post: PostInterface = category.posts[0];
        return (
          post && (
            <div className="section-why about-me" id={category.id} key={category.id}>
              <PreloadImage
                src={"/img/bannerProduct.jpg"}
                altAttribute="whyChooseImage"
                cssClass="img-banner"
                layout="fill"
              />
              <div className="content-section">
                <Title
                  title={category.title || ''}
                  cssClass="title-common text-center"
                  id={category.id}
                />
                <div className="text-body">
                  <div
                    className="text-content-html"
                    dangerouslySetInnerHTML={{
                      __html: `<p>${post.content}</p>`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          )
        );
      case DisplayEnum.ICON_CONTAINER:
        const listPostIcons: PostInterface[] = category.posts;
        return (
          <div className="section-summary" id={category.id} key={category.id}>
            {listPostIcons &&
              listPostIcons.map((post) => (
                <div className="summary-item" key={post.id}>
                  <div className="top">
                    <div className="icon">
                      <img src={post.icon} alt="icon" loading="lazy" />
                    </div>
                    <label className="iBold">{post.name}</label>
                  </div>
                  <div className="bottom">
                    <span className="iBold">{post.title}</span>
                    <span className="unit">{post.content}</span>
                  </div>
                </div>
              ))}
          </div>
        );
      case DisplayEnum.NAV_HOME_CONTAINER:
        const tabList: PostInterface[] = category.posts;
        return (
          <div
            className="section-tabs section-dark"
            id={category.id}
            key={category.id}
          >
            <Title
              title={category.title || ''}
              cssClass="title-common"
              id={category.id}
            />
            <div className="tabs">
              {tabList.map((item, index) => (
                <div
                  className={`tab-item ${
                    item.id === homeData.postSelected?.id ? 'active iBold' : ''
                  } ${index === tabList.length - 1 ? 'last' : ''}`}
                  onClick={() => onChangeNav(item)}
                  key={item.id}
                >
                  {item.title}
                </div>
              ))}
              {tabList.map((item) => (
                <div
                  className={`tab-pane ${
                    homeData.postSelected?.id === item.id ? 'show' : ''
                  }`}
                  key={item.id}
                >
                  {homeData.postSelected?.icon && (
                    <PreloadImage
                      src="/img/bannerhome2.jpeg"
                      altAttribute="whyChooseImage"
                      cssClass="image"
                      layout="fill"
                    />
                  )}

                  <div className="tab-pane-body">
                    <div
                      className="body moveTextDownAnim text-content-html"
                      dangerouslySetInnerHTML={{
                        __html: homeData.postSelected?.contentHtml as string,
                      }}
                    ></div>
                    <Button
                      className="menu-item btn-common primary btn-additional iBold moveTextUpAnim"
                      onClick={() => goDetail(item)}
                      id={`btnSeeMore${item.id}`}
                      aria-label="Button SEE_MORE more"
                    >
                      {t('SEE_MORE')}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case DisplayEnum.SLIDE_POST_CONTAINER:
        const newPosts = category.posts;
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
              />
            )}
            <div className="body">
              <Slider {...settingSlideNews}>
                {newPosts &&
                  newPosts.map((post: PostInterface) => (
                    <div className="wrap-article" key={post.id}>
                      <div className="article">
                        {post?.icon && (
                          <Image
                            src={post?.icon}
                            layout="fill"
                            alt="image"
                            className="image"
                          />
                        )}

                        <div className="article-item-content">
                          <h3 className="iBold">{post.title}</h3>
                          <span className="date caption1">
                            {moment(post.createdAt).format('DD/MM/YYYY')}
                          </span>
                        </div>
                        <div className="article-item-des">
                          <p>{post.content}</p>
                          <Button
                            className="menu-item btn-common primary btn-additional iBold"
                            id={`btnReadMore1${post.id}`}
                            aria-label="Button read more"
                            onClick={() =>
                              router.push(
                                `/news/${
                                  post.postLanguageId
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
    }
  };

  return (
    <div className="home-page">
      <section className="section section-banners" id="banners">
        <Carousel
          {...settingCarousels}
          className="w-100 carousel"
          afterChange={onChange}
        >
          {homeData.banners &&
            homeData.banners.map((banner: SliderInterface) => (
              <div className="wrap-banner" key={banner.imgage}>
                <PreloadImage
                  src={banner.imgage}
                  cssClass="banner"
                  layout="fill"
                  priority={true}
                  isBanner={true}
                  altAttribute="image"
                />
                <div className="content-banner">
                  <p className="brand">{banner.title}</p>
                  <h1 className="title-common cl-dark">
                    <p className="m-0 white-space-pre-wrap">{banner.content}</p>
                  </h1>
                </div>
              </div>
            ))}
        </Carousel>
      </section>

      {homeData.categories &&
        homeData.categories.map((category: CategoryInterface) => (
          <section className="section animation-title" key={category.id}>
            {renderSection(category)}
          </section>
        ))}
      <SectionView
        postHighlights={homeData.postHighlights}
        category={
          {
            title: t('HOT_NEW'),
            type: DisplayEnum.POST_HIGHLIGHT_CONTAINER,
          } as CategoryInterface
        }
      />
      <section className="section section-partner">
        <div className="section-dark section-pad">
          <Title title={t('PARTNER')} cssClass="title-common underline" />
          <SlidePartners partners={homeData.partners} theme={'dark'} />
        </div>
      </section>
      <section className="section">
        <div className="section-pad">
          <Title title={t('CERTIFICATE')} cssClass="title-common underline" />
          <SlidePartners partners={homeData.certificates} />
        </div>
      </section>
    </div>
  );
};

export default withAppProvider(HomePage);