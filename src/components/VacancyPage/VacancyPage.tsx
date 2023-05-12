import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { jobAPI } from '../../api/api';
import { VacancyObject } from '../../types/vacanciesSearchResultType';
import { VacancyCard } from '../VacancyCard/VacancyCard';
import { Loader } from '@mantine/core';
import styles from './VacancyPage.module.scss';

export const VacancyPage = () => {
  const { id } = useParams();
  const [vacancyData, setVacancyData] = useState<VacancyObject>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id)
      jobAPI.getVacancy(id).then((res) => {
        setVacancyData(res);
        setIsLoading(false);
      });
  }, [id]);
  return (
    <div className={styles.container}>
      {isLoading ? (
        <div className={styles.loaderContainer}>
          <Loader />
        </div>
      ) : (
        vacancyData && (
          <>
            <VacancyCard onFavStarClick={()=>{}} withoutLink big vacancy={vacancyData} />
            <div
              className={styles.description}
              dangerouslySetInnerHTML={{ __html: vacancyData?.vacancyRichText }}
            ></div>
          </>
        )
      )}
    </div>
  );
};
