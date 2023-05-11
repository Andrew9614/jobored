import { useEffect, useState } from 'react';
import { EmptyState } from '../EmptyState/EmptyState';
import { VacancyObject } from '../../types/vacanciesSearchResultType';
import { jobAPI } from '../../api/api';
import { VacancyCard } from '../VacanciesContainer/Vacancies/VacancyCard/VacancyCard';
import styles from './Favorites.module.scss';
import { Pagination } from '@mantine/core';
import { JOB_PER_PAGE } from '../../settings/settings';

export const Favorites = () => {
  const [favList, setFavList] = useState<VacancyObject[] | null>(null);
  const [favPage, setFavPage] = useState<VacancyObject[] | null>(null);
  const [activePage, setActivePage] = useState(1);

  useEffect(() => {
    jobAPI.getFavorites().then((res) => setFavList(res));
  }, []);

  useEffect(
    () => () => {
      jobAPI.cleanFavorites();
    },
    []
  );

  useEffect(() => {
    if (favList) jobAPI.setFavorites(favList);
  }, [favList]);

  useEffect(() => {
    if (favList) {
      let startIndex = JOB_PER_PAGE * (activePage - 1);
      let endIndex = startIndex + JOB_PER_PAGE;
      console.log(
        startIndex,
        endIndex > favList.length - 1 ? favList.length : endIndex,
        favList.length
      );
      setFavPage(
        favList?.slice(
          startIndex,
          endIndex > favList.length - 1 ? favList.length : endIndex
        )
      );
    }
  }, [activePage, favList]);

  const handleFavStarClick = (vacancy: VacancyObject) => {
    if (favList) {
      setFavList(
        favList.map((el) =>
          el.id === vacancy.id ? { ...el, isPending: !el.isPending } : el
        )
      );
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.favWrapper}>
        {favPage?.length ? (
          favPage.map((el) => (
            <div key={el.id} className={styles.vacancyContainer}>
              <div className={el.isPending ? styles.pendingFilter : ''}></div>
              <VacancyCard
                onFavStarClick={handleFavStarClick}
                vacancy={el}
                isFavorite={!el.isPending}
              />
            </div>
          ))
        ) : (
          <EmptyState title="Упс, здесь еще ничего нет!" withRedirectButton />
        )}
      </div>
      <div className={styles.paginationContainer}>
        <Pagination
          value={activePage}
          onChange={setActivePage}
          total={
            favList?.length && favList.length > JOB_PER_PAGE
              ? Math.ceil(favList.length / JOB_PER_PAGE)
              : 0
          }
        />
      </div>
    </div>
  );
};
