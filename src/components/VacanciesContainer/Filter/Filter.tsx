import {
  Button,
  NumberInput,
  NumberInputHandlers,
  Select,
} from '@mantine/core';
import styles from './Filter.module.scss';
import { CatalogueType } from '../../../types/catalogueType';
import { useContext, useRef, useState } from 'react';
import { ArrowSmall } from '../../svgIcons/ArrowSmall';
import { ArrowBig } from '../../svgIcons/ArrowBig';
import { CloseIcoSmall } from '../../svgIcons/CloseIcoSmall';
import { FilterContext } from '../../../App';

type FilterComponentType = {
  catalogues: CatalogueType[];
  onSubmit: () => void;
  onClear: () => void;
  disabled: boolean;
};

export const Filter = ({
  catalogues,
  onSubmit,
  onClear,
  disabled,
}: FilterComponentType) => {
  const filterContext = useContext(FilterContext);

  const refPaymentTo = useRef<NumberInputHandlers>();
  const refPaymentFrom = useRef<NumberInputHandlers>();
  const refSelector = useRef<HTMLInputElement>(null);

  const [selectorIsActive, setSelectorIsActive] = useState(false);

  const handleSubmit = () => {
    onSubmit();
  };

  const clearFilter = () => {
    filterContext?.setActiveCatalogue(null);
    filterContext?.setPaymentFrom('');
    filterContext?.setPaymentTo('');
    onClear();
  };

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const activeElement = document.activeElement as HTMLElement; //Костыль для скидывания фокуса с NumberInput без лишних рефов (чтлбы корректно отработало min value)
      activeElement.blur();
      onSubmit();
    }
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

  const findCatalogueTitleByKey = () => {
    return catalogues.find((el) => el.key === filterContext?.activeCatalogue)
      ?.title_trimmed;
  };
  const findCatalogueKeyByTitle = (title: string | null) => {
    return catalogues.find((el) => el.title_trimmed === title)?.key;
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
          value={findCatalogueTitleByKey()}
          onChange={(e) =>
            filterContext?.setActiveCatalogue(findCatalogueKeyByTitle(e))
          }
          rightSectionProps={{ onMouseDown: handleSelectorIconClick }}
          rightSection={
            <ArrowBig direction={selectorIsActive ? 'up' : 'down'} />
          }
        />
      </div>
      <div style={{ userSelect: 'none' }} className={styles.payment}>
        <h4>Оклад</h4>
        <NumberInput
          disabled={disabled}
          value={filterContext?.paymentFrom}
          type="number"
          handlersRef={refPaymentFrom}
          rightSection={<NumberInputButtons handlersRef={refPaymentFrom} />}
          onChange={filterContext?.setPaymentFrom}
          placeholder="от"
          min={0}
          step={1000}
          onKeyUp={handleEnter}
        />
        <NumberInput
          disabled={disabled}
          className={styles.numberInput}
          value={filterContext?.paymentTo}
          type="number"
          handlersRef={refPaymentTo}
          rightSection={<NumberInputButtons handlersRef={refPaymentTo} />}
          onChange={filterContext?.setPaymentTo}
          placeholder="до"
          min={filterContext?.paymentFrom ? filterContext?.paymentFrom : 0}
          step={1000}
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
