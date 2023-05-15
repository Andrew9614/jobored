import { Button } from '@mantine/core';
import styles from './EmptyState.module.scss';
import { Link } from 'react-router-dom';
import { SEARCH_PAGE_URL } from '../../globalVars/routes';

type EmptyStateType = {
  withRedirectButton?: boolean;
  title?: string;
};

export const EmptyState = ({ withRedirectButton, title }: EmptyStateType) => {
  return (
    <div className={styles.container}>
      <img src="/images/chelik.svg" alt="chelik" />
      {title && <h3>{title}</h3>}
      {withRedirectButton && (
        <Link to={SEARCH_PAGE_URL}>
          <Button>Поиск вакансий</Button>
        </Link>
      )}
    </div>
  );
};
