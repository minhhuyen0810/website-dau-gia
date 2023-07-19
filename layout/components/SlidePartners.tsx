import Image from 'next/image';
import { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { PartnerInterface } from '../../model/partner';
import PreloadImage from './PreloadImage';

interface ISliderPartners {
  partners: PartnerInterface[] | null;
  theme?: string | 'dark';
}
const SlidePartners = (props: ISliderPartners) => {
  const { partners, theme } = props;
  const [settingPartnerSlide, setSettingPartnerSlide] = useState({
    dots: false,
    centerPadding: '50px',
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    className: `custom-slick ${theme}`,
  });

  useEffect(() => {
    if (window) {
      if (window.outerWidth <= 320) {
        setSettingPartnerSlide({
          ...settingPartnerSlide,
          slidesToShow: 1,
        });
      } else if (window.outerWidth <= 768) {
        setSettingPartnerSlide({
          ...settingPartnerSlide,
          slidesToShow: 2,
        });
      } else if (window.outerWidth <= 1024) {
        setSettingPartnerSlide({
          ...settingPartnerSlide,
          slidesToShow: 4,
        });
      }
    }
  }, [typeof window]);

  return partners ? (
    <Slider {...settingPartnerSlide}>
      {partners &&
        partners.map((partner: PartnerInterface) => (
          <div className="slider-partner" key={partner.id}>
            <PreloadImage
              src={partner?.image}
              altAttribute="image"
              cssClass="slider-partner-image"
              cssClassSkeleton={theme ? theme : ''}
              width={200}
              height={200}
            />
          </div>
        ))}
    </Slider>
  ) : null;
};

export default SlidePartners;
