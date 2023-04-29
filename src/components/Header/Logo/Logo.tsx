import styles from './Logo.module.scss';

export const Logo = () => {
  return (
    <div className={styles.container}>
      <img className={styles.logoImg} src="/images/logo.svg" alt='logo' />
			<div className={styles.logoText}>Jobored</div>
    </div>
  );
};
