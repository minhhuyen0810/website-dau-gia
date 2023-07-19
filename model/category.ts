import { BannerInterface } from './banner';
import { PostInterface } from './post';
export interface CategoryInterface {
  id: string | undefined;
  title: string | undefined;
  path: string | undefined;
  slug: string | undefined;
  indexSort: number | undefined;
  isMenu: boolean | undefined;
  isHomePage: boolean | undefined;
  bannerId: number | undefined;
  type: number | undefined;
  parentId: string | undefined;
  isDelete: boolean | undefined;
  createdAt: string | undefined;
  updatedAt: string | undefined;
  children: CategoryInterface[];
  posts: PostInterface[];
  description: string | undefined;
  language: string | undefined;
  url: string | undefined;
  subCategories: CategoryInterface[] | undefined;
  banner: BannerInterface | undefined;
}
