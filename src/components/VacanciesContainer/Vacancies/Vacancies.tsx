import styles from './Vacancies.module.scss';
import { VacancyObject } from '../../../types/vacanciesSearchResultType';
import { VacancyCard } from './VacancyCard/VacancyCard';

type VacanciesType = {
  vacancies: VacancyObject[];
  handleFavStarClick: (vacancy: VacancyObject) => void;
  favList: VacancyObject[] | null;
};

export const Vacancies = ({
  vacancies,
  handleFavStarClick,
  favList,
}: VacanciesType) => {
  return (
    <div className={styles.container}>
      {vacancies.map((el) => (
        <VacancyCard
          isFavorite={!!favList?.find((fav) => fav.id === el.id)}
          onFavStarClick={handleFavStarClick}
          key={el.id}
          vacancy={el}
        />
      ))}
    </div>
  );
};
