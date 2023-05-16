import { Outlet } from 'react-router-dom';
import './App.scss';
import { Header } from './components/Header/Header';
import {
  CSSObject,
  MantineProvider,
  MantineThemeOverride,
} from '@mantine/core';
import { FilterType } from './types/filterType';
import { createContext, useState } from 'react';

const inputStyle: CSSObject = {
  height: '42px',
  border: '1px solid #EAEBED',
  '::placeholder': {
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '21px',
    letterSpacing: '0em',
    textAlign: 'left',
  },
};

const theme: MantineThemeOverride = {
  components: {
    Button: {
      styles: () => ({
        root: {
          height: '40px',
          fontWeight: 500,
          fontSize: '14px',
          transition: 'background-color 0.2s',
        },
      }),
    },
    Select: {
      styles: () => ({ input: inputStyle }),
    },
    TextInput: {
      styles: () => ({ input: inputStyle }),
    },
    NumberInput: {
      styles: () => ({ input: inputStyle }),
    },
  },
  defaultRadius: '8px',
  fontFamily: 'Inter',
  colors: {
    blue: [
      undefined,
      undefined,
      '#DEECFF',
      '#C9E0FF',
      '#B7D6FF',
      '#92C1FF',
      '#5E96FC',
      '#3B7CD3',
      undefined,
      undefined,
    ],
  },
};

export const FilterContext = createContext<{
  filter: FilterType;
  setFilter: React.Dispatch<React.SetStateAction<FilterType>>;
} | null>(null);

function App() {
  const [filter, setFilter] = useState<FilterType>({});
  return (
    <MantineProvider theme={theme}>
      <Header />
      <main className="content">
        <FilterContext.Provider value={{ filter, setFilter }}>
          <Outlet />
        </FilterContext.Provider>
      </main>
    </MantineProvider>
  );
}

export default App;
