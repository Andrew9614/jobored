import styles from './Vacancies.module.scss';
import { VacancyObject } from '../../../types/vacanciesSearchResultType';
import { VacancyCard } from './VacancyCard/VacancyCard';

type VacanciesType = {
  vacancies: VacancyObject[];
};

export const Vacancies = ({ vacancies }: VacanciesType) => {
  return (
    <div className={styles.container}>
      {vacancies.map((el) => (
        <VacancyCard key={el.id} vacancy={el} />
      ))}
    </div>
  );
};
