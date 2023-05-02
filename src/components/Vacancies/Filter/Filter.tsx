import { Button, NumberInput, Select } from '@mantine/core';
import styles from './Filter.module.scss';
import { CatalogueType } from '../../../types/catalogueType';
import { useState } from 'react';
import { FilterType } from '../../../types/filterType';

type FilterComponentType = {
  catalogues: CatalogueType[];
  onSubmit: (filter: FilterType) => void;
};

export const Filter = ({ catalogues, onSubmit }: FilterComponentType) => {
  const [activeCatalogue, setActiveCatalogue] = useState<string | null>();
  const [paymentFrom, setPaymentFrom] = useState<number>();
  const [paymentTo, setPaymentTo] = useState<number>();

  const handleClick = () => {
    onSubmit({
      catalogues: catalogues.find((el) => el.title_trimmed === activeCatalogue)
        ?.key,
      payment_from: paymentFrom,
      payment_to: paymentTo,
    });
  };
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h1>Фильтры</h1>
        <div className={styles.clear}>Сбросить все</div>
      </div>
      <div className={styles.catalogues}>
        <h4>Отрасль</h4>
        <Select
          searchable
          data={catalogues.map((el) => el.title_trimmed)}
          value={activeCatalogue}
          onChange={(e) => setActiveCatalogue(e)}
        />
      </div>
      <div className={styles.payment}>
        <h4>Оклад</h4>
        <NumberInput
          value={paymentFrom}
          onChange={(e) =>
            setPaymentFrom(typeof e === 'number' ? e : undefined)
          }
          placeholder="от"
        />
        <NumberInput
          value={paymentTo}
          onChange={(e) => setPaymentTo(typeof e === 'number' ? e : undefined)}
          placeholder="до"
        />
      </div>
      <Button onClick={handleClick}>Применить</Button>
    </div>
  );
};
