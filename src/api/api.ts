import axios, { AxiosError } from 'axios';
import {
  VacanciesSearchResultType,
  VacancyObject,
} from '../types/vacanciesSearchResultType';
import { CatalogueType } from '../types/catalogueType';
import { FilterType } from '../types/filterType';
import { ErrorType } from '../types/errorType';

const superjob = axios.create({
  baseURL: 'https://startup-summer-2023-proxy.onrender.com/2.0/',
  headers: {
    'x-secret-key': 'GEU4nvd3rej*jeh.eqp',
    'X-Api-App-Id':
      'v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948',
  },
});

const onError = (
  error: AxiosError<{ error: { code: number; message: string } }>
): ErrorType => {
  console.log(error);
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
        `vacancies/?page=${
          (filter.page || 1) - 1
        }&count=${count}&published=1&catalogues=${
          filter.catalogues
        }&payment_from=${filter.payment_from}&payment_to=${
          filter.payment_to
        }&keyword=${filter.keyword || ''}`
      )
      .catch((error) => {
        console.log(error);
        throw onError(error);
      });
    console.log(res.data);
    return res.data;
  },
  async getVacancy(id: string) {
    const res = await superjob
      .get<VacancyObject>('vacancies/' + id)
      .catch((error) => {
        console.log(error);
        throw onError(error);
      });
    console.log(res.data);
    return res.data;
  },
  async getCatalogues() {
    const res = await superjob
      .get<CatalogueType[]>(`catalogues`)
      .catch((error) => {
        console.log(error);
        throw onError(error);
      });
    return res.data;
  },
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
    if (fav)
      localStorage.setItem(
        'favList',
        JSON.stringify(
          (JSON.parse(fav) as VacancyObject[]).filter((el) => !el.isPending)
        )
      );
  },
};
