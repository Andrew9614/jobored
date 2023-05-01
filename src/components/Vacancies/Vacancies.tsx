import { useEffect, useRef, useState } from 'react';
import styles from './Vacancies.module.scss';
import { jobAPI } from '../../api/api';
import { VacanciesSearchResultType } from '../../types/vacanciesSearchResultType';
import { VacancyCard } from './VacancyCard/VacancyCard';
import { Loader, Pagination } from '@mantine/core';

const COUNT = 20;

let prevScroll = 0;
let initialHeight = 0;

export const Vacancies = () => {
  const [vacanciesList, setVacanciesList] =
    useState<VacanciesSearchResultType>();
  const [activePage, setPage] = useState(1);
  const [scrollDisplace, setScrollDisplace] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  const handleScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    if (!initialHeight) initialHeight = e.currentTarget.scrollHeight;
    const diff = prevScroll - e.currentTarget.scrollTop;
    const elemHeight = ref.current?.offsetHeight
      ? -ref.current.offsetHeight
      : 0;
    let displace = diff + scrollDisplace;
    if (displace < elemHeight) displace = elemHeight;
    if (displace > 0) displace = 0;
    if (
      e.currentTarget.scrollTop + e.currentTarget.offsetHeight - displace >
      initialHeight
    ) {
      setScrollDisplace(
        e.currentTarget.scrollTop + e.currentTarget.offsetHeight - initialHeight
      );
    } else {
      setScrollDisplace(displace);
    }
    prevScroll = e.currentTarget.scrollTop;
  };

  useEffect(() => {
    setIsLoading(true);
    jobAPI.getVacancies(activePage).then((res) => {
      setVacanciesList(res);
      setIsLoading(false);
      console.log(res.total);
    });
  }, [activePage]);

  return (
    <div onScroll={handleScroll} className={styles.container}>
      {isLoading ? (
        <div className={styles.loaderContainer}>
          <Loader />
        </div>
      ) : (
        <div className={styles.vacanciesWrapper}>
          {vacanciesList?.objects.map((el) => (
            <VacancyCard key={el.id} vacancy={el} />
          ))}
        </div>
      )}
      <div
        ref={ref}
        style={{ transform: `translateY(${-1 * scrollDisplace}px)` }}
        className={styles.paginationContainer}
      >
        <Pagination
          disabled={isLoading}
          value={activePage}
          onChange={setPage}
          total={
            vacanciesList?.total
              ? vacanciesList.total / COUNT < 500
                ? vacanciesList.total / COUNT
                : 26
              : 0
          }
        />
      </div>
    </div>
  );
};
