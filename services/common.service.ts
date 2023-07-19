import { set } from 'lodash';
import api from '../api/api';
import { IResponse } from '../api/configs';
import { PartnerTypeEnum } from '../model/partner';
import { CategoryInterface } from './../model/category';
import { SliderInterface } from '../model/banner';

const getCurrentCategory = (
  pathname: string,
  categories: CategoryInterface[]
) => {
  const categoryFound = categories?.find(
    (category: CategoryInterface) => category.slug === pathname
  );
  return categoryFound ? categoryFound : null;
};

const getPartners = (params: { type: PartnerTypeEnum }) => {
  return new Promise<IResponse>(async (resolve, reject) => {
    const response: IResponse = await api.getService(`static/partner`, params);
    resolve(response);
  });
};

const setLocalImageForBanner = (category: CategoryInterface, image: string) => {
  let banner = category.banner;
  if (!banner) return category;
  const sliders = (banner.sliders || []).map((slider: SliderInterface) => {
    return {
      ...slider,
      imgage: image,
    };
  });
  banner = { ...banner, sliders };
  return { ...category, banner };
};

export default { getCurrentCategory, getPartners, setLocalImageForBanner };
