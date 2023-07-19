export interface PartnerInterface {
  name: string | undefined;
  image: string | undefined;
  description: string | undefined;
  type: string | undefined;
  id: number | undefined;
  isDelete: boolean | undefined;
  language: string | undefined;
  createdAt: string | undefined;
  updatedAt: string | undefined;
}

export enum PartnerTypeEnum {
  PARTNER = 'PARTNER',
  CERTIFICATE = 'CERTIFICATE',
}
