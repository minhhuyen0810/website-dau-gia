export interface CheckSnInterface {
    serialno: string | null;
    namesr: string | null;
    standard: string | null;
    conditionswarranty: string | null;
    description: string | null;
    conditionswork: string | null;
    namepr: string | null;
    address: string | null;
    phone: string | null;
    description1: string | null;
    website: string | null;
  }
  export interface IInforCheckSn {
    serialno?: string[];
    namesr?: string;
    standard?: string;
    conditionswarranty?: string;
    description?: string;
    conditionswork?: string;
    namepr?: string;
    address?: string;
    phone?: number;
    description1?: boolean;
    website?: boolean;
  }