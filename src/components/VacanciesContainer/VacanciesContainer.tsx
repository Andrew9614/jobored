import styles from './VacanciesContainer.module.scss';

import { useContext, useEffect, useState } from 'react';
import { favAPI, jobAPI } from '../../api/api';
import {
  VacanciesSearchResultType,
  VacancyObject,
} from '../../types/vacanciesSearchResultType';
import { Button, Loader, Modal, Pagination, TextInput } from '@mantine/core';
import { Filter } from './Filter/Filter';
import { CatalogueType } from '../../types/catalogueType';
import { Vacancies } from './Vacancies/Vacancies';
import { EmptyState } from '../EmptyState/EmptyState';
import { JOB_PER_PAGE, TOTAL_LIMIT } from '../../globalVars/settings';
import { FilterContext } from '../../App';
import { ErrorType } from '../../types/errorType';
import { ErrorModal } from '../ErrorModal/ErrorModal';

export const VacanciesContainer = () => {
  const filterProvider = useContext(FilterContext);
  const [vacanciesList, setVacanciesList] =
    useState<VacanciesSearchResultType>();
  const [isLoading, setIsLoading] = useState(true);
  const [catalogues, setCatalogues] = useState<CatalogueType[]>([]);
  const [favList, setFavList] = useState<VacancyObject[] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalError, setModalError] = useState<ErrorType | null>(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 700);

  const [searchField, setSearchField] = useState(
    filterProvider ? filterProvider.filter.keyword : ''
  );
  const [activeCatalogue, setActiveCatalogue] = useState<
    number | null | undefined
  >(filterProvider?.filter.catalogues);
  const [paymentFrom, setPaymentFrom] = useState<number | '' | undefined>(
    filterProvider?.filter.payment_from
  );
  const [paymentTo, setPaymentTo] = useState<number | '' | undefined>(
    filterProvider?.filter.payment_to
  );

  useEffect(() => {
    setIsModalOpen(false);
    setIsLoading(true);
    Promise.all([
      jobAPI
        .getVacancies(JOB_PER_PAGE, filterProvider?.filter)
        .then((res) => {
          setVacanciesList(res);
          process.env.NODE_ENV === 'development' && console.log(res);
        })
        .catch((error) => {
          setModalError(error);
          setIsLoading(false);
        }),
      jobAPI
        .getCatalogues()
        .then((res) => setCatalogues(res))
        .catch((error) => {
          setModalError(error);
          setIsLoading(false);
        }),
      favAPI
        .getFavorites()
        .then((res) => setFavList(res))
        .catch((error) => {
          setModalError(error);
          setIsLoading(false);
        }),
    ]).then(() => setIsLoading(false));
  }, [filterProvider]);

  useEffect(() => {
    if (favList) favAPI.setFavorites(favList);
  }, [favList]);

  useEffect(() => {
    window.addEventListener('resize', () =>
      setIsMobile(window.innerWidth < 700)
    );
    return () => {
      window.removeEventListener('resize', () =>
        setIsMobile(window.innerWidth < 700)
      );
    };
  }, []);

  const handleFilterSubmit = () => {
    filterProvider?.setFilter({
      page: 1,
      keyword: searchField,
      catalogues: activeCatalogue ? activeCatalogue : undefined,
      payment_from: paymentFrom === '' ? undefined : paymentFrom,
      payment_to: paymentTo === '' ? undefined : paymentTo,
    });
  };
  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleFilterSubmit();
  };

  const handleClear = () => {
    setSearchField('');
    filterProvider?.setFilter({ page: 1 });
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
    <>
      <ErrorModal
        error={modalError}
        onClose={() => setModalError(null)}
        open={!!modalError && !vacanciesList?.objects.length}
        submit={() => handleFilterSubmit()}
      />
      <div className={styles.container}>
        <div className={styles.filter}>
          <FilterWrapper
            onOpen={() => setIsModalOpen(true)}
            isModalOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            isMobile={isMobile}
            disabled={isLoading}
          >
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
          </FilterWrapper>
        </div>
        <div className={styles.vacanciesWrapper}>
          <div className={styles.vacanciesContainer}>
            <TextInput
              disabled={isLoading}
              className={styles.search}
              value={searchField ? searchField : ''}
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
          {vacanciesList && vacanciesList.total > JOB_PER_PAGE && (
            <div className={styles.paginationContainer}>
              <Pagination
                disabled={isLoading}
                value={filterProvider?.filter.page}
                onChange={(e) =>
                  filterProvider?.setFilter({
                    ...filterProvider.filter,
                    page: e,
                  })
                }
                size={isMobile ? 'sm' : undefined}
                total={
                  vacanciesList.total < TOTAL_LIMIT
                    ? Math.ceil(vacanciesList.total / JOB_PER_PAGE)
                    : Math.ceil(TOTAL_LIMIT / JOB_PER_PAGE)
                }
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

type FilterWrapperType = {
  children?: JSX.Element;
  isMobile: boolean;
  disabled?: boolean;
  isModalOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
};

const FilterWrapper = ({
  children,
  isMobile,
  disabled,
  isModalOpen,
  onClose,
  onOpen,
}: FilterWrapperType) => {
  return isMobile ? (
    <>
      <Button
        disabled={disabled}
        className={styles.mobileFilterButton}
        onClick={() => onOpen()}
      >
        Фильтры
      </Button>
      <Modal
        className={styles.modal}
        opened={isModalOpen}
        onClose={() => onClose()}
        centered
      >
        {children}
      </Modal>
    </>
  ) : (
    <>{children}</>
  );
};
