import { Button } from '@mantine/core';
import styles from './Favorites.module.scss';
import { Link } from 'react-router-dom';

export const Favorites = () => {
  return (
    <div className={styles.container}>
      <img src="/images/chelik.svg" alt="chelik" />
      <h3>Упс, здесь еще ничего нет!</h3>
      <Link to={'/search'}>
        <Button>Поиск вакансий</Button>
      </Link>
    </div>
  );
};
