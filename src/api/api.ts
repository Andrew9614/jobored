import axios from 'axios';
import { VacanciesSearchResultType } from '../types/vacanciesSearchResultType';

const superjob = axios.create({
  baseURL: 'https://startup-summer-2023-proxy.onrender.com/2.0/',
  headers: {
    'x-secret-key': 'GEU4nvd3rej*jeh.eqp',
    'X-Api-App-Id':
      'v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948',
  },
});

export const jobAPI = {
  async getVacancies(page = 1, count = 20) {
    const res = await superjob.get<VacanciesSearchResultType>(
      `vacancies/?page=${page - 1}&count=${count}&published=1`
    );
    console.log(res.data);
    return res.data;
  },
};
