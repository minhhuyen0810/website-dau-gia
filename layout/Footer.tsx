import { BackTop } from 'antd';
import { FC } from 'react';
import { CategoryInterface } from '../model/category';
import useTranslation from 'next-translate/useTranslation';

interface IFooter {
  categories: CategoryInterface[] | null;
}
const Footer: FC<IFooter> = (props: IFooter) => {
  const { t } = useTranslation('common');
  return (
    <>
      <div className="footer">
        <div className="footer-middle">
          <div className="footer-middle-logo">
            <div className="logo">
              <img src="/img/logo_black.png" alt="logo" width={130} />
            </div>
            <div className="images-bqp">
              <div className="image">
                <img
                  src="/img/bqp.jpeg"
                  alt="Cổng thông tin điện tử"
                  width={100}
                />
              </div>
              <div className="image">
                <img
                  src="/img/port_bqp.jpeg"
                  alt="Cổng dịch vụ công"
                  width={100}
                />
              </div>
            </div>
            {/* <div className="logo">
              <img src="/img/baotro1.png" alt="logo" width={150} />
            </div>
            <div className="logo">
              <img src="/img/thongbaoBoCongThuong.png" alt="logo" width={150} />
            </div> */}

            <div className="images-bqp">
              <div className="logo">
                <img src="/img/baotro1.png" alt="logo" width={120} />
              </div>
              <div className="logo">
                <img
                  src="/img/thongbaoBoCongThuong.png"
                  alt="logo"
                  width={120}
                />
              </div>
            </div>
          </div>

          <div className="footer-middle-info">
            <ul className="footer-list-info">
              <div className="list-company-info">
                <li className="company-info company-name">
                  TỔNG CÔNG TY SẢN XUẤT THIẾT BỊ VIETTEL
                </li>
                <li className="company-info company-headquarter">
                  <strong>{t('HEADQUARTERS')} </strong>
                  <span>
                    Thôn An Bình, xã An Khánh, huyện Hoài Đức, TP. Hà Nội.
                  </span>
                </li>
                <li className="company-info company-phone">
                  <strong>{t('PHONE')}:  </strong>
                  <span>(+84) 24 6265 0365</span>
                </li>
                <li className="company-info company-email">
                  <strong>{t('EMAIL')}: </strong>
                  <a href="vmc.sales@viettel.com.vn">
                    vmc.sales@viettel.com.vn
                  </a>
                </li>
                <li className="company-info company-website">
                  <strong>Website:</strong>{' '}
                  <a href="#">www.viettelmanufacturing.vn</a>
                </li>
              </div>
            </ul>
          </div>
          <div className="footer-middle-info">
            <ul className="footer-list-info">
              <div className="list-company-info extension">
                <li className="company-info company-name">{t('USEFUL_LINK')}</li>
                <li className="company-info company-phone">
                  <span>
                    <a href="/policy">{t('PRIVACY')}</a>
                  </span>
                </li>
                <li className="company-info company-email">
                  <span>
                    <a href="/terms">{t('TERM')}</a>
                  </span>
                </li>
                <li className="company-info company-website">
                  <span>
                    <a href="https://magazine.viettel.vn/" target='_blank'>{t('MAGAZINE')}</a>
                  </span>
                </li>
                <li className="company-info company-website">
                  <span>
                    <a href="https://viettel.com.vn" target='_blank'>{t('CORPORATE_INFO')}</a>
                  </span>
                </li>
              </div>
            </ul>
          </div>

          {/* <div className="footer-middle-right">
            <div className="separate"></div>
            {categories &&
              categories.map((category: CategoryInterface) => (
                <div className="footer-middle-item" key={category.id}>
                  <label className="label">
                    <Link
                      href={{
                        pathname: category.slug ? category.slug : URL_ROOT,
                        query: { id: category.id },
                      }}
                      as={category.slug ? category.slug : URL_ROOT}
                    >
                      <a>{category.title}</a>
                    </Link>
                  </label>
                  {category.children && category.children.length > 0 && (
                    <ul className="footer-list">
                      {category.children.map((child: CategoryInterface) => (
                        <li key={child.id}>
                          <a href={`${category.slug}#${child.slug}`}>
                            {child.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
          </div> */}
        </div>
        <div className="footer-bottom">
          <div className="block caption1">
            <p>Copyright © 2022 Viettel VMC. All rights researved</p>
            <a
              id="ipv6"
              target="_blank"
              href="https://ready.chair6.net/?url=viettelmanufacturing.vn"
            >
              <img src="/img/ipv6.jpg" alt="Cổng dịch vụ công" width={100} />
            </a>
          </div>
        </div>
        <BackTop></BackTop>
        {/* Zalo  */}
        <div className="pt_contact_vertical">
          <div className="contact-mobile">
            <div className="contact-item">
              <a
                className="contact-icon zalo"
                title="zalo"
                href="https://zalo.me/"
                target="_blank"
              >
                <img src="/img/zalo-icon-small.png" alt="icon" />
              </a>
            </div>
          </div>
        </div>
        {/* Call */}
        <div
          className="quick-alo-phone quick-alo-green quick-alo-show"
          id="quick-alo-phoneIcon"
        >
          {/* <div className="tel_phone">
            <a href="tel:(+84-203) 3 721996">(+84-203) 3 721996</a>
          </div> */}
          <a href="tel:069.529150">
            {/* <div className="quick-alo-ph-circle"></div> */}
            {/* <div className="quick-alo-ph-circle-fill"></div> */}
            <div className="quick-alo-ph-img-circle"></div>
          </a>
        </div>
      </div>
    </>
  );
};

export default Footer;
