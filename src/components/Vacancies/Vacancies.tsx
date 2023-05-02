import { useEffect, useRef, useState } from 'react';
import styles from './Vacancies.module.scss';
import { jobAPI } from '../../api/api';
import { VacanciesSearchResultType } from '../../types/vacanciesSearchResultType';
import { VacancyCard } from './VacancyCard/VacancyCard';
import { Loader, Pagination } from '@mantine/core';
import { Filter } from './Filter/Filter';
import { CatalogueType } from '../../types/catalogueType';
import { FilterType } from '../../types/filterType';

const COUNT = 20;

// let prevScroll = 0;
export const Vacancies = () => {
  const [vacanciesList, setVacanciesList] =
    useState<VacanciesSearchResultType>();
  const [activePage, setPage] = useState(1);
  const [scrollDisplace, setScrollDisplace] = useState(0);
  const [initialHeight, setInitialHeight] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [catalogues, setCatalogues] = useState<CatalogueType[]>([]);
  const [filter, setFilter] = useState<FilterType>({});

  const paginateDiv = useRef<HTMLDivElement>(null);
  const scrollDiv = useRef<HTMLDivElement>(null);
  const handleScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    // const diff = prevScroll - e.currentTarget.scrollTop;
    // const elemHeight = -(paginateDiv.current?.clientHeight || 0);
    // let displace = diff + scrollDisplace;
    // if (displace < elemHeight) {
    //   displace = elemHeight;
    // }
    // if (displace > 0) {
    //   displace = 0;
    // }
    // if (
    //   e.currentTarget.scrollTop + e.currentTarget.clientHeight - displace >
    //   initialHeight
    // ) {
    // 	console.log(e.currentTarget.scrollTop + e.currentTarget.clientHeight - initialHeight);
    // 	if(e.currentTarget.scrollTop + e.currentTarget.clientHeight - initialHeight===0){
    // 		paginateDiv.current?.classList.add(styles.bottom)
    // 	}else{
    // 		paginateDiv.current?.classList.remove(styles.bottom)
    // 		setScrollDisplace(
    // 			e.currentTarget.scrollTop + e.currentTarget.clientHeight - initialHeight
    // 		);
    // 	}
    // } else {
    //   setScrollDisplace(displace);
    // }
    // prevScroll = e.currentTarget.scrollTop;
  };

  const handleResize = () => {
    setInitialHeight(scrollDiv.current?.scrollHeight || 0);
  };

  const handleFilterSubmit = (f: FilterType) => {
    setFilter({ ...Object.assign(filter, f) });
  };

  useEffect(() => {
    console.log(filter);
    setIsLoading(true);
    jobAPI.getVacancies(activePage, COUNT, filter).then((res) => {
      setVacanciesList(res);
      setIsLoading(false);
      handleResize();
      console.log(res.total);
    });
  }, [activePage, filter]);

  useEffect(() => {
    jobAPI.getCatalogues().then((res) => setCatalogues(res));
  }, []);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  return (
    <div ref={scrollDiv} onScroll={handleScroll} className={styles.container}>
      <div className={styles.filter}>
        <Filter onSubmit={handleFilterSubmit} catalogues={catalogues} />
      </div>
      <div className={styles.vacancies}>
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
          ref={paginateDiv}
          style={{ transform: `translateY(${-scrollDisplace}px)` }}
          className={styles.paginationContainer}
        >
          <Pagination
            disabled={isLoading}
            value={activePage}
            onChange={setPage}
            total={
              vacanciesList?.total
                ? vacanciesList.total / COUNT <= 500
                  ? Math.ceil(vacanciesList.total / COUNT)
                  : Math.ceil(520 / COUNT) //yes, in doc maximum number is 500, but in fact api gives 520 entities
                : 0
            }
          />
        </div>
      </div>
    </div>
  );
};
