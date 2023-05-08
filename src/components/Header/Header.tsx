import { Link, NavLink } from 'react-router-dom';
import styles from './Header.module.scss';
import { Logo } from './Logo/Logo';

export const Header = () => {
  return (
    <header className={styles.container}>
      <Link className={styles.logo} to={'/'}>
        <Logo />
      </Link>
      <nav className={styles.linkContainer}>
        <NavLink
          className={({ isActive }) => (isActive ? styles.active : '')}
          to={'/search'}
        >
          Поиск Вакансий
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? styles.active : '')}
          to={'/favorites'}
        >
          Избраное
        </NavLink>
      </nav>
    </header>
  );
};
