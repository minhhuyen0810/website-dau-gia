import { Button } from 'antd';
import moment from 'moment';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Slider from 'react-slick';
import PreloadImage from '../../layout/components/PreloadImage';
import withAppProvider from '../../layout/wrapper/withAppProvider';
import { PostInterface } from '../../model/post';
import { useAppSelector } from '../../store/hook';
import { getPostAction } from '../../store/slices/postDetail.slice';

const DetailProductPage = () => {
  const { t } = useTranslation('common');
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();
  const postDetailState = useAppSelector((state) => state.postDetail);
  const [postDetailData, setPostDetailData] = useState<{
    post: PostInterface | null;
    postRefers: PostInterface[] | null;
  }>({
    post: null,
    postRefers: null,
  });
  const [settingSlideNews, setSettingSlideNews] = useState({
    dots: false,
    centerPadding: '50px',
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    className: 'custom-slick',
    infinite: false,
  });

  // EFFECT
  useEffect(() => {
    if (id) {
      dispatch(getPostAction(id as string) as any);
    }
  }, [id]);

  useEffect(() => {
    if (postDetailState.post) {
      setPostDetailData({
        ...postDetailData,
        post: postDetailState.post,
        postRefers: postDetailState.postRefers,
      });
      console.log('postDetailState :>> ', postDetailState);
    }
  }, [postDetailState]);

  // FUNCTION

  // RENDER

  return (
    <div className="detail-post-page detail-page">
      <div className="detail-post-content">
        <div className="detail-head">
          <h2>{postDetailData.post?.title}</h2>
          <div className="date-action">
            <span className="">
              {moment(postDetailData.post?.createdAt).format('DD/MM/YYYY')}
            </span>
          </div>
        </div>
        <div className="detail-body">
          <div
            className="text-content-html"
            dangerouslySetInnerHTML={{
              __html: postDetailData.post?.contentHtml || '',
            }}
          ></div>
        </div>
      </div>
      {postDetailData.postRefers && (
        <div className="detail-refer">
          <h1 className="title-common underline">{t('POST_REFERENCE')}</h1>
          <Slider {...settingSlideNews}>
            {postDetailData.postRefers.length > 0 &&
              postDetailData.postRefers.map((post: PostInterface) => (
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
                        className="menu-item btn-common primary btn-additional iBold"
                        id={`btnReadMore2${post.id}`}
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
      )}
    </div>
  );
};
export default withAppProvider(DetailProductPage);
