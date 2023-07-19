import { Button, Col, Row } from 'antd';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { PostInterface } from '../../model/post';

interface IProductListProps {
  posts: PostInterface[];
}
const ProductList = (props: IProductListProps) => {
  const { posts } = props;
  const router = useRouter();

  const goToContact = (e: any) => {
    e.stopPropagation();
    router.push('/contact');
  };
  return (
    <Row gutter={16}>
      {posts &&
        posts.map((post: PostInterface) => (
          <Col
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ span: 12 }}
            lg={{ span: 8 }}
            onClick={() => router.push(`/news/${post.id}`)}
            key={post.id}
          >
            <div className="product-item">
              <h4 className="product-item-title">{post?.name}</h4>
              <div className="product-item-image">
                {post?.icon && (
                  <Image src={post.icon} layout="fill" alt="image" />
                )}
              </div>
              <div className="product-item-footer">
                <p className="text-content-html limit-content">
                  {post?.content}
                </p>
                <Button
                  className="btn-common btn-round-spec primary"
                  onClick={(e) => goToContact(e)}
                  id="btnContact"
                  aria-label="Button contact"
                >
                  LIÊN HỆ NGAY
                </Button>
              </div>
            </div>
          </Col>
        ))}
    </Row>
  );
};

export default ProductList;
