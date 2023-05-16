import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { favAPI, jobAPI } from '../../api/api';
import { VacancyObject } from '../../types/vacanciesSearchResultType';
import { VacancyCard } from '../VacancyCard/VacancyCard';
import { Loader } from '@mantine/core';
import styles from './VacancyPage.module.scss';
import { ErrorModal } from '../ErrorModal/ErrorModal';
import { ErrorType } from '../../types/errorType';

export const VacancyPage = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [vacancyData, setVacancyData] = useState<VacancyObject>();
  const [isLoading, setIsLoading] = useState(true);
  const [modalError, setModalError] = useState<ErrorType | null>(null);
  const [favList, setFavList] = useState<VacancyObject[] | null>(null);

  useEffect(() => {
    document.title = vacancyData?.profession || 'Вакансия';
  }, [vacancyData?.profession]);

  useEffect(() => {
    if (id) {
      if (isNaN(+id)) {
        navigate('/404');
      }
      jobAPI
        .getVacancy(id)
        .then((res) => {
          setVacancyData(res);
          setIsLoading(false);
        })
        .catch((error) => {
          setModalError(error);
          setIsLoading(false);
          if (error.code === '404') navigate('/404');
        });
    }
  }, [id, navigate]);

  useEffect(() => {
    favAPI.getFavorites().then((res) => setFavList(res));
  }, []);

  useEffect(() => {
    if (favList) favAPI.setFavorites(favList);
  }, [favList]);

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
    <>
      <ErrorModal
        error={modalError}
        onClose={() => setModalError(null)}
        open={!!modalError}
        submit={() => navigate(0)}
      />
      <div className={styles.container}>
        {isLoading ? (
          <div className={styles.loaderContainer}>
            <Loader />
          </div>
        ) : (
          vacancyData && (
            <>
              <VacancyCard
                onFavStarClick={handleFavStarClick}
                withoutLink
                big
                vacancy={vacancyData}
                isFavorite={!!favList?.find((el) => el.id === vacancyData.id)}
              />
              <div
                className={styles.description}
                dangerouslySetInnerHTML={{
                  __html: vacancyData?.vacancyRichText,
                }}
              ></div>
            </>
          )
        )}
      </div>
    </>
  );
};
