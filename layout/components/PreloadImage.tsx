import { useEffect, useState } from 'react';

interface IPreloadImageProps {
  src?: string;
  cssClass?: string;
  cssClassSkeleton?: string;
  altAttribute?: string;
  layout?: string;
  priority?: boolean;
  width?: number;
  height?: number;
  isBanner?: boolean;
}

const PreloadImage = (props: IPreloadImageProps) => {
  const {
    src,
    cssClass,
    cssClassSkeleton,
    altAttribute,
    layout,
    priority,
    width,
    height,
    isBanner,
  } = props;
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  useEffect(() => {
    if (src) {
      const image = new Image();
      image.onload = () => {
        setIsLoaded(true);
      };
      image.src = src as string;
    } else {
      setIsLoaded(true);
    }
  }, [src]);
  return (
    <div className={`image-wrapper ${cssClass ? cssClass : ''}`}>
      {src ? (
        <img
          src={src}
          alt={altAttribute}
          className="image"
          loading={isBanner ? 'lazy' : undefined}
        />
      ) : (
        <div className="background-default"></div>
      )}
      {
        <div
          className={`skeleton ${cssClassSkeleton ? cssClassSkeleton : ''} ${
            !isLoaded ? 'loading' : ''
          }`}
        ></div>
      }
    </div>
  );
};

export default PreloadImage;
