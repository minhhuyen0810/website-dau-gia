export interface PartnerInterface {
  name: string | undefined;
  image: string | undefined;
  description: string | undefined;
  id: number | undefined;
  isDelete: boolean | undefined;
  createdAt: string | undefined;
  updatedAt: string | undefined;
}

export enum PartnerTypeEnum {
  PARTNER = 'PARTNER',
  CERTIFICATE = 'CERTIFICATE',
}
