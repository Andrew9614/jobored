import axios, { AxiosError } from 'axios';
import {
  VacanciesSearchResultType,
  VacancyObject,
} from '../types/vacanciesSearchResultType';
import { CatalogueType } from '../types/catalogueType';
import { FilterType } from '../types/filterType';
import { ErrorType } from '../types/errorType';
import {
  BASE_URL_API,
  CATALOGUES_URL_API,
  VACANCIES_URL_API,
} from '../globalVars/routes';

const superjob = axios.create({
  baseURL: BASE_URL_API,
  headers: {
    'x-secret-key': 'GEU4nvd3rej*jeh.eqp',
    'X-Api-App-Id':
      'v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948',
  },
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
      .get<VacanciesSearchResultType>(
        `${VACANCIES_URL_API}?published=1&page=${
          (filter.page || 1) - 1
        }&count=${count}&catalogues=${filter.catalogues}&payment_from=${
          filter.payment_from
        }&payment_to=${filter.payment_to}&keyword=${filter.keyword || ''}${
          filter.payment_from || filter.payment_to ? '&no_agreement=1' : ''
        }`
      )
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
