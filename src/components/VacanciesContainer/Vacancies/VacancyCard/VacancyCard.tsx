import { Link } from 'react-router-dom';
import { VacancyObject } from '../../../../types/vacanciesSearchResultType';
import styles from './VacancyCard.module.scss';
import { FavStar } from '../../../svgIcons/FavStart';

type VacancyCardType = {
  vacancy: VacancyObject;
  big?: boolean;
  withoutLink?: boolean;
  isFavorite?: boolean;
  onFavStarClick: (vacancy: VacancyObject) => void;
};

export const VacancyCard = ({
  vacancy,
  withoutLink,
  big,
  onFavStarClick,
  isFavorite,
}: VacancyCardType) => {
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
      <FavStar
        onClick={() => onFavStarClick(vacancy)}
        className={styles.favStar + (isFavorite ? ' ' + styles.active : '')}
      />
    </div>
  );
};
