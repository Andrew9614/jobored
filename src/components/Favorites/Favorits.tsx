import { useEffect, useState } from 'react';
import { EmptyState } from '../EmptyState/EmptyState';
import { VacancyObject } from '../../types/vacanciesSearchResultType';
import { favAPI } from '../../api/api';
import { VacancyCard } from '../VacancyCard/VacancyCard';
import styles from './Favorites.module.scss';
import { Loader, Pagination } from '@mantine/core';
import { JOB_PER_PAGE } from '../../globalVars/settings';
import { ErrorModal } from '../ErrorModal/ErrorModal';
import { ErrorType } from '../../types/errorType';
import { useNavigate } from 'react-router-dom';

export const Favorites = () => {
  const navigate = useNavigate();

  const [favList, setFavList] = useState<VacancyObject[] | null>(null);
  const [favPage, setFavPage] = useState<VacancyObject[] | null>(null);
  const [activePage, setActivePage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [modalError, setModalError] = useState<ErrorType | null>(null);

  useEffect(() => {
    setIsLoading(true);
    favAPI
      .getFavorites()
      .then((res) => {
        setIsLoading(false);
        setFavList(res);
      })
      .catch((error) => {
        setIsLoading(false);
        setModalError(error);
      });
  }, []);

  useEffect(
    () => () => {
      favAPI.cleanFavorites();
    },
    []
  );

  useEffect(() => {
    if (favList) favAPI.setFavorites(favList);
  }, [favList]);

  useEffect(() => {
    if (favList) {
      let startIndex = JOB_PER_PAGE * (activePage - 1);
      let endIndex = startIndex + JOB_PER_PAGE;
      process.env.NODE_ENV==='development' && console.log(
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
    <>
      <ErrorModal
        error={modalError}
        onClose={() => setModalError(null)}
        open={!!modalError}
        submit={() => navigate(0)}
      />
      <div className={styles.container}>
        <div className={styles.favWrapper}>
          {isLoading ? (
            <div className={styles.loaderContainer}>
              <Loader />
            </div>
          ) : favPage?.length ? (
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
        {favList && favList.length > JOB_PER_PAGE && (
          <div className={styles.paginationContainer}>
            <Pagination
              value={activePage}
              onChange={setActivePage}
              total={Math.ceil(favList.length / JOB_PER_PAGE)}
            />
          </div>
        )}
      </div>
    </>
  );
};
