export const Config = {
  // URL_API: 'https://api.viettelmanufacturing.vn/',
  URL_API: 'http://103.82.24.232:8181/',
  // URL_API: 'http://localhost:36635/',
  // URL_API_ERP: 'http://192.168.18.33:8084/',
};

export const RESPONSE_STATUS = {
  SUCCESS: 200,
  CREATE_SUCCESS: 201,
  NOT_FOUND: 404,
  INTERVAL_SERVER: 500,
  FORBIDDEN: 403,
  ACCESS_DENIED: 401,
};

export const KeyConfigLocal = {
  TOKEN: 'token',
  USER: 'user',
  LANGUAGE: 'language',
};

export interface IResponseErrorHandle {
  error: string;
  message: string;
  statusCode: number;
}



export interface IHomePostResponse {
  result: IResponse[]; // depend on model
}

export interface IResponse {
  statusCode: number | null;
  data: any | null; // depend on model
  total: number | null;
  count: number | null;
  limit: number | null;
  skip: number | null;
}

export interface IResponseLogin {
  access_token: string | null;
  expiresIn: number | null; // depend on model
  statusCode: number | null;
  tokenType: string | null;
  user: any | null;
}

export const PER_PAGE = 6;
