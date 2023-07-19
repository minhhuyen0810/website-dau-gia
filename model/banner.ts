export interface BannerInterface {
  createdAt: string | undefined;
  id: number | undefined;
  isDelete: boolean | undefined;
  isHomePage: boolean | undefined;
  name: string | undefined;
  sliders: SliderInterface[];
  type: string[] | undefined;
}

export interface SliderInterface {
  content: string | undefined;
  description: string | undefined;
  imgage: string | undefined;
  languages: string[] | undefined;
  path: string | undefined;
  title: string | undefined;
}
