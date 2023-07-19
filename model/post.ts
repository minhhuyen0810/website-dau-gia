export interface PostInterface {
  tags: string[] | undefined;
  type: string[] | undefined;
  name: string | undefined;
  title: string | undefined;
  content: string | undefined;
  contentHtml: string | undefined;
  category: string | undefined;
  icon: string | undefined;
  isHomePage: boolean | undefined;
  id: number | undefined;
  postLanguageId: number | undefined;
  isDelete: boolean | undefined;
  createdAt: string | undefined;
  updatedAt: string | undefined;
}
