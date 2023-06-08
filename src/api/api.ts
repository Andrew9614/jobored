import axios, { AxiosError } from 'axios';
import {
  VacanciesSearchResultType,
  VacancyObject,
} from '../types/vacanciesSearchResultType';
import { CatalogueType } from '../types/catalogueType';
import { FilterType } from '../types/filterType';
import { ErrorType } from '../types/errorType';
import {
  AUTH_ON_PASSWORD_URL,
  BASE_URL_API,
  CATALOGUES_URL_API,
  VACANCIES_URL_API,
} from '../globalVars/routes';
import { AuthDataType } from '../types/authDataType';

const headers = {
  //'Access-Control-Allow-Headers': '*',
  // 'x-secret-key': 'GEU4nvd3rej*jeh.eqp',
  'X-Api-App-Id':
    'v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948',
};

const superjob = axios.create({
  baseURL: BASE_URL_API,
  headers: headers,
});

superjob.interceptors.request.use(async (config) => {
  const token = await getAuthData();
  if (token) {
    config.headers.Authorization = token.token_type + ' ' + token.access_token;
  }
  return config;
});

const onError = (
  error: AxiosError<{ error: { code: number; message: string } }>
): ErrorType => {
  console.error(error);
  if (error.response?.data.error) {
    return {
      code: error.response.status + '',
      message: error.response.data.error.message,
    };
  }
  if (error.response) {
    return { code: error.response.status + '', message: error.message };
  }
  return { code: error.code, message: 'Что-то пошло не так' };
};

export const jobAPI = {
  async getVacancies(count = 20, filter: FilterType = {}) {
    const res = await superjob
      .get<VacanciesSearchResultType>(VACANCIES_URL_API, {
        params: {
          published: 1,
          count: count,
          page: (filter.page || 1) - 1,
          catalogues: filter.catalogues,
          payment_from: filter.payment_from,
          payment_to: filter.payment_to,
          keyword: filter.keyword,
          no_agreement:
            filter.payment_from || filter.payment_to ? '1' : undefined,
        },
      })
      .catch((error) => {
        throw onError(error);
      });
    process.env.NODE_ENV === 'development' && console.log(res.data);
    return res.data;
  },
  async getVacancy(id: string) {
    const res = await superjob
      .get<VacancyObject>(VACANCIES_URL_API + id)
      .catch((error) => {
        throw onError(error);
      });
    process.env.NODE_ENV === 'development' && console.log(res.data);
    return res.data;
  },
  async getCatalogues() {
    const res = await superjob
      .get<CatalogueType[]>(CATALOGUES_URL_API)
      .catch((error) => {
        throw onError(error);
      });
    return res.data;
  },
};

export const favAPI = {
  async getFavorites() {
    const res = localStorage.getItem('favList');
    if (res) return JSON.parse(res) as VacancyObject[];
    return null;
  },
  async setFavorites(item: VacancyObject[] | null) {
    localStorage.setItem('favList', JSON.stringify(item));
  },
  async cleanFavorites() {
    let fav = localStorage.getItem('favList');
    if (fav) {
      localStorage.setItem(
        'favList',
        JSON.stringify(
          (JSON.parse(fav) as VacancyObject[]).filter((el) => !el.isPending)
        )
      );
    }
  },
};

async function getAuthData() {
  const authData = JSON.parse(
    localStorage.getItem('authData') || 'null'
  ) as AuthDataType | null;

  if (authData && authData.ttl - Date.now() / 1000 > 0) {
    process.env.NODE_ENV === 'development' && console.log('catch');
    return authData;
  }

  const res = await axios.get<AuthDataType>(AUTH_ON_PASSWORD_URL, {
    baseURL: BASE_URL_API,
    headers: headers,
    params: {
      login: 'sergei.stralenia@gmail.com',
      password: 'paralect123',
      client_id: 2356,
      client_secret:
        'v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948',
      hr: 0,
    },
  });
  process.env.NODE_ENV === 'development' && console.log(res);
  localStorage.setItem('authData', JSON.stringify(res.data));
  return res.data;
}
