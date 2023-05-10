import { Link } from 'react-router-dom';
import { VacancyObject } from '../../../../types/vacanciesSearchResultType';
import styles from './VacancyCard.module.scss';

type VacancyCardType = {
  vacancy: VacancyObject;
  withoutLink?: boolean;
  big?: boolean;
};

export const VacancyCard = ({ vacancy, withoutLink, big }: VacancyCardType) => {
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
      <div className={styles.description + (big ? ' ' + styles.big : '')}>
        {withoutLink ? (
          <div className={styles.profession}>{vacancy.profession}</div>
        ) : (
          <Link
            to={'/' + vacancy.id.toString()}
            className={styles.profession + ' ' + styles.link}
          >
            {vacancy.profession}
          </Link>
        )}
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
      <img className={styles.favStar} src="/images/favStar.svg" alt="favStar" />
    </div>
  );
};
