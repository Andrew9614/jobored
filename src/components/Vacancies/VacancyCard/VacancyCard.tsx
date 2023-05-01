import { VacancyObject } from '../../../types/vacanciesSearchResultType';
import styles from './VacancyCard.module.scss';

type VacancyCardType = {
  vacancy: VacancyObject;
};

export const VacancyCard = ({ vacancy }: VacancyCardType) => {
  const paymentTransformer = (
    paymentFrom: number,
    paymentTo: number,
    currency: string
  ) => {
    if (paymentFrom || paymentTo) {
      if (paymentFrom && paymentTo) {
        return ` ${paymentFrom} - ${paymentTo} ${currency}`;
      }
      if (paymentFrom) {
        return ` от ${paymentFrom} ${currency}`;
      } else {
        return ` до ${paymentTo} ${currency}`;
      }
    } else {
      return ' не указана';
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.description}>
        <div className={styles.profession}>{vacancy.profession}</div>
        <div className={styles.paymentAndType}>
          <div className={styles.payment}>
            {'з/п' +
              paymentTransformer(
                vacancy.payment_from,
                vacancy.payment_to,
                vacancy.currency
              )}
          </div>
          <div className={styles.dot}>•</div>
          <div className={styles.typeOfWork}>{vacancy.type_of_work.title}</div>
        </div>
        <div className={styles.location}>
          <img src="/images/location.svg" alt="geo" />
          {vacancy.town.title}
        </div>
      </div>
      <img src="/images/favStar.svg" alt="favStar" />
    </div>
  );
};
