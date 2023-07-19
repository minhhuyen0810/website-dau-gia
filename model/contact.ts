export interface ContactInterface {
  address: string | null;
  createdAt: string | null;
  email: string | null;
  hotline: string | null;
  id: number | null;
  isActive: boolean | null;
  isDelete: boolean | null;
  tel: string | null;
  title: string | null;
  updatedAt: string | null;
}
export interface IInforContact {
  address?: string[];
  createdAt?: string;
  email?: string;
  hotline?: string;
  id?: number;
  isActive?: boolean;
  isDelete?: boolean;
  tel?: string;
  title?: string;
  updatedAt?: string;
}
