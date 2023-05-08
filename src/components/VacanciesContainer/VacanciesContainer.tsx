import styles from './VacanciesContainer.module.scss';

import { useEffect, useState } from 'react';
import { jobAPI } from '../../api/api';
import { VacanciesSearchResultType } from '../../types/vacanciesSearchResultType';
import { Button, Loader, Pagination, TextInput } from '@mantine/core';
import { Filter } from './Filter/Filter';
import { CatalogueType } from '../../types/catalogueType';
import { FilterType } from '../../types/filterType';
import { Vacancies } from './Vacancies/Vacancies';

const COUNT = 4;

export const VacanciesContainer = () => {
  const [vacanciesList, setVacanciesList] =
    useState<VacanciesSearchResultType>();
  const [activePage, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [catalogues, setCatalogues] = useState<CatalogueType[]>([]);
  const [filter, setFilter] = useState<FilterType>({});

  const [searchField, setSearchField] = useState('');
  const [activeCatalogue, setActiveCatalogue] = useState<string | null>();
  const [paymentFrom, setPaymentFrom] = useState<number | ''>();
  const [paymentTo, setPaymentTo] = useState<number | ''>();

  useEffect(() => {
    jobAPI.getCatalogues().then((res) => setCatalogues(res));
  }, []);

  useEffect(() => {
    console.log(filter);
    setIsLoading(true);
    jobAPI.getVacancies(activePage, COUNT, filter).then((res) => {
      setVacanciesList(res);
      setIsLoading(false);
      console.log(res.total);
    });
  }, [activePage, filter]);

  const handleFilterSubmit = () => {
    setFilter({
      keyword: searchField,
      catalogues: catalogues.find((el) => el.title_trimmed === activeCatalogue)
        ?.key,
      payment_from: paymentFrom === '' ? undefined : paymentFrom,
      payment_to: paymentTo === '' ? undefined : paymentTo,
    });
    setPage(1);
  };
  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleFilterSubmit();
  };

  const handleClear = () => {
    setSearchField('');
    setFilter({});
    setPage(1);
  };
  return (
    <div className={styles.container}>
      <div className={styles.filter}>
        <Filter
          activeCatalogue={activeCatalogue}
          paymentFrom={paymentFrom}
          paymentTo={paymentTo}
          setActiveCatalogue={setActiveCatalogue}
          setPaymentFrom={setPaymentFrom}
          setPaymentTo={setPaymentTo}
          disabled={isLoading}
          onClear={handleClear}
          onSubmit={handleFilterSubmit}
          catalogues={catalogues}
        />
      </div>
      <div className={styles.vacanciesWrapper}>
        <div className={styles.vacanciesContainer}>
          <TextInput
            disabled={isLoading}
            className={styles.search}
            value={searchField}
            placeholder="Введите название вакансии"
            onChange={(e) => {
              setSearchField(e.currentTarget.value);
            }}
            onKeyUp={handleEnter}
            icon={<img src="/images/search.svg" alt="search" />}
            rightSection={
              <Button
                disabled={isLoading}
                onClick={handleFilterSubmit}
                className={styles.searchButton}
              >
                Поиск
              </Button>
            }
          />

          {isLoading ? (
            <div className={styles.loaderContainer}>
              <Loader />
            </div>
          ) : (
            vacanciesList && <Vacancies vacancies={vacanciesList.objects} />
          )}
        </div>
        <div className={styles.paginationContainer}>
          <Pagination
            disabled={isLoading}
            value={activePage}
            onChange={setPage}
            total={
              vacanciesList
                ? vacanciesList.total  < 500
                  ? Math.ceil(vacanciesList.total / COUNT)
                  : Math.ceil(500 / COUNT)
                : 0
            }
          />
        </div>
      </div>
    </div>
  );
};
