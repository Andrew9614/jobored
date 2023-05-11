import styles from './VacanciesContainer.module.scss';

import { useContext, useEffect, useState } from 'react';
import { jobAPI } from '../../api/api';
import {
  VacanciesSearchResultType,
  VacancyObject,
} from '../../types/vacanciesSearchResultType';
import { Button, Loader, Pagination, TextInput } from '@mantine/core';
import { Filter } from './Filter/Filter';
import { CatalogueType } from '../../types/catalogueType';
import { FilterType } from '../../types/filterType';
import { Vacancies } from './Vacancies/Vacancies';
import { EmptyState } from '../EmptyState/EmptyState';
import { JOB_PER_PAGE } from '../../settings/settings';
import { FilterContext } from '../../App';

export const VacanciesContainer = () => {
  const filterContext = useContext(FilterContext);

  const [vacanciesList, setVacanciesList] =
    useState<VacanciesSearchResultType>();
  const [isLoading, setIsLoading] = useState(true);
  const [catalogues, setCatalogues] = useState<CatalogueType[]>([]);
  const [filter, setFilter] = useState<FilterType>({});
  const [favList, setFavList] = useState<VacancyObject[] | null>(null);

  useEffect(() => {
    jobAPI.getCatalogues().then((res) => setCatalogues(res));
  }, []);

  useEffect(() => {
    setIsLoading(true);
    jobAPI
      .getVacancies(filterContext?.activePage, JOB_PER_PAGE, buildFilter())
      .then((res) => {
        setVacanciesList(res);
        setIsLoading(false);
        console.log(res.total);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, filterContext?.activePage]);

  useEffect(() => {
    jobAPI.getFavorites().then((res) => setFavList(res));
  }, []);

  useEffect(() => {
    if (favList) jobAPI.setFavorites(favList);
  }, [favList]);

  function buildFilter(): FilterType {
    console.log('object');
    return {
      keyword: filterContext?.searchField,
      catalogues: filterContext?.activeCatalogue
        ? filterContext.activeCatalogue
        : undefined,
      payment_from:
        filterContext?.paymentFrom === ''
          ? undefined
          : filterContext?.paymentFrom,
      payment_to:
        filterContext?.paymentTo === '' ? undefined : filterContext?.paymentTo,
    };
  }

  const handleFilterSubmit = () => {
    setFilter(buildFilter());
    filterContext?.setPage(1);
  };
  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleFilterSubmit();
  };

  const handleClear = () => {
    filterContext?.setSearchField('');
    setFilter({});
    filterContext?.setPage(1);
  };
  const handleFavStarClick = (vacancy: VacancyObject) => {
    if (favList) {
      if (favList?.find((el) => el.id === vacancy.id)) {
        setFavList(favList.filter((el) => el.id !== vacancy.id));
      } else {
        setFavList([...favList, vacancy]);
      }
    } else {
      setFavList([vacancy]);
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.filter}>
        <Filter
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
            value={filterContext?.searchField}
            placeholder="Введите название вакансии"
            onChange={(e) => {
              filterContext?.setSearchField(e.currentTarget.value);
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
          ) : vacanciesList?.objects.length ? (
            <Vacancies
              favList={favList}
              handleFavStarClick={handleFavStarClick}
              vacancies={vacanciesList.objects}
            />
          ) : (
            <EmptyState title="Кажется, мы ничего не нашли" />
          )}
        </div>
        <div className={styles.paginationContainer}>
          <Pagination
            size={'sm'}
            disabled={isLoading}
            value={filterContext?.activePage}
            onChange={filterContext?.setPage}
            total={
              vacanciesList
                ? vacanciesList.total < 500
                  ? Math.ceil(vacanciesList.total / JOB_PER_PAGE)
                  : Math.ceil(500 / JOB_PER_PAGE)
                : 0
            }
          />
        </div>
      </div>
    </div>
  );
};
