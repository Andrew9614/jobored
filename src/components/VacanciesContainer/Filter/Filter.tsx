import {
  Button,
  NumberInput,
  NumberInputHandlers,
  Select,
} from '@mantine/core';
import styles from './Filter.module.scss';
import { CatalogueType } from '../../../types/catalogueType';
import { useRef, useState } from 'react';
import { ArrowSmall } from '../../svgIcons/ArrowSmall';
import { ArrowBig } from '../../svgIcons/ArrowBig';
import { CloseIcoSmall } from '../../svgIcons/CloseIcoSmall';

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
  const refPaymentTo = useRef<NumberInputHandlers>();
  const refPaymentFrom = useRef<NumberInputHandlers>();
  const refSelector = useRef<HTMLInputElement>(null);

  const [selectorIsActive, setSelectorIsActive] = useState(false);

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

  const handleSelectorIconClick = (
    e: React.MouseEvent<HTMLInputElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (selectorIsActive) {
      refSelector.current?.blur();
    } else {
      refSelector.current?.focus();
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h1>Фильтры</h1>
        <div onClick={clearFilter} className={styles.clear}>
          Сбросить все
          <CloseIcoSmall />
        </div>
      </div>

      <div className={styles.catalogues}>
        <h4>Отрасль</h4>
        <Select
          onFocus={() => setSelectorIsActive(true)}
          onBlur={() => setSelectorIsActive(false)}
          ref={refSelector}
          searchable
          clearable
          disabled={disabled}
          data={catalogues.map((el) => el.title_trimmed)}
          placeholder="Выберете отрасль"
          value={activeCatalogue}
          onChange={(e) => setActiveCatalogue(e)}
          rightSectionProps={{ onMouseDown: handleSelectorIconClick }}
          rightSection={
            <ArrowBig direction={selectorIsActive ? 'up' : 'down'} />
          }
        />
      </div>
      <div className={styles.payment}>
        <h4>Оклад</h4>
        <NumberInput
          disabled={disabled}
          value={paymentFrom}
          type="number"
          handlersRef={refPaymentFrom}
          rightSection={<NumberInputButtons handlersRef={refPaymentFrom} />}
          onChange={setPaymentFrom}
          placeholder="от"
          min={0}
          onKeyUp={handleEnter}
        />
        <NumberInput
          disabled={disabled}
          className={styles.numberInput}
          value={paymentTo}
          type="number"
          handlersRef={refPaymentTo}
          rightSection={<NumberInputButtons handlersRef={refPaymentTo} />}
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
      <div
        className={styles.control}
        onClick={() => handlersRef.current?.increment()}
      >
        <ArrowSmall direction="up" />
      </div>
      <div
        className={styles.control}
        onClick={() => handlersRef.current?.decrement()}
      >
        <ArrowSmall direction="down" />
      </div>
    </div>
  );
};
