import {
  Button,
  NumberInput,
  NumberInputHandlers,
  Select,
} from '@mantine/core';
import styles from './Filter.module.scss';
import { CatalogueType } from '../../../types/catalogueType';
import { useRef } from 'react';

type FilterComponentType = {
  catalogues: CatalogueType[];
  onSubmit: () => void;
  onClear: () => void;
  disabled: boolean;
  activeCatalogue: string | null | undefined;
  paymentFrom: number | '' | undefined;
  paymentTo: number | '' | undefined;
  setActiveCatalogue: React.Dispatch<
    React.SetStateAction<string | null | undefined>
  >;
  setPaymentFrom: React.Dispatch<React.SetStateAction<number | '' | undefined>>;
  setPaymentTo: React.Dispatch<React.SetStateAction<number | '' | undefined>>;
};

export const Filter = ({
  catalogues,
  onSubmit,
  onClear,
  disabled,
  activeCatalogue,
  paymentFrom,
  paymentTo,
  setActiveCatalogue,
  setPaymentFrom,
  setPaymentTo,
}: FilterComponentType) => {
  const handleSubmit = () => {
    onSubmit();
  };

  const clearFilter = () => {
    setActiveCatalogue(null);
    setPaymentFrom('');
    setPaymentTo('');
    onClear();
  };

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') onSubmit();
  };

  const handlers = useRef<NumberInputHandlers>();
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h1>Фильтры</h1>
        <div onClick={clearFilter} className={styles.clear}>
          Сбросить все
          <img src="/images/closeIcoSmall.svg" alt="clear" />
        </div>
      </div>
      <div className={styles.catalogues}>
        <h4>Отрасль</h4>
        <Select
          searchable
          disabled={disabled}
          data={catalogues.map((el) => el.title_trimmed)}
          placeholder="Выберете отрасль"
          value={activeCatalogue}
          onChange={(e) => setActiveCatalogue(e)}
          clearable
          styles={{ rightSection: { pointerEvents: 'none' } }}
          rightSection={
            <img
              style={{ width: '14px' }}
              src="/images/arrowDownBig.svg"
              alt="arrow"
            />
          }
        />
      </div>
      <div className={styles.payment}>
        <h4>Оклад</h4>
        <NumberInput
          thousandsSeparator=" "
          disabled={disabled}
          value={paymentFrom}
          type="number"
          handlersRef={handlers}
          rightSection={<NumberInputButtons handlersRef={handlers} />}
          onChange={setPaymentFrom}
          placeholder="от"
          min={0}
          onKeyUp={handleEnter}
        />
        <NumberInput
          thousandsSeparator=","
          disabled={disabled}
          className={styles.numberInput}
          value={paymentTo}
          type="number"
          handlersRef={handlers}
          rightSection={<NumberInputButtons handlersRef={handlers} />}
          onChange={setPaymentTo}
          placeholder="до"
          min={0}
          onKeyUp={handleEnter}
        />
      </div>
      <Button disabled={disabled} onClick={handleSubmit}>
        Применить
      </Button>
    </div>
  );
};

type NumberInputButtonsType = {
  handlersRef: React.MutableRefObject<NumberInputHandlers | undefined>;
};

const NumberInputButtons = ({ handlersRef }: NumberInputButtonsType) => {
  return (
    <div className={styles.numberInputButtonsContainer}>
      <button onClick={() => handlersRef.current?.increment()}>
        <img src="/images/arrowUpSmall.svg" alt="up" style={{backgroundColor:'green'}}/>
				
      </button>
      <button onClick={() => handlersRef.current?.decrement()}>
        <img src="/images/arrowDownSmall.svg" alt="down" />
      </button>
    </div>
  );
};
