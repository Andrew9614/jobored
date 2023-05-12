import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { jobAPI } from '../../api/api';
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

  useEffect(() => {
    if (id)
      jobAPI
        .getVacancy(id)
        .then((res) => {
          setVacancyData(res);
          setIsLoading(false);
        })
        .catch((error) => {
          setModalError(error);
          setIsLoading(false);
          console.log('object', error.code === '404');
          if (error.code === '404') navigate('/404');
        });
  }, [id, navigate]);
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
                onFavStarClick={() => {}}
                withoutLink
                big
                vacancy={vacancyData}
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
