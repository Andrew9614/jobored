import { Link, NavLink } from 'react-router-dom';
import styles from './Header.module.scss';
import { Logo } from './Logo/Logo';
import { FAVORITES_PAGE_URL, SEARCH_PAGE_URL } from '../../globalVars/routes';

export const Header = () => {
  return (
    <header className={styles.container}>
      <Link className={styles.logo} to={'/'}>
        <Logo />
      </Link>
      <nav className={styles.linkContainer}>
        <NavLink
          className={({ isActive }) => (isActive ? styles.active : '')}
          to={SEARCH_PAGE_URL}
        >
          Поиск Вакансий
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? styles.active : '')}
          to={FAVORITES_PAGE_URL}
        >
          Избраное
        </NavLink>
      </nav>
    </header>
  );
};
