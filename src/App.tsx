import { Outlet } from 'react-router-dom';
import './App.scss';
import { Header } from './components/Header/Header';
import {
  CSSObject,
  MantineProvider,
  MantineThemeOverride,
} from '@mantine/core';
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
  activePage: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  searchField: string;
  setSearchField: React.Dispatch<React.SetStateAction<string>>;
  activeCatalogue: number | null | undefined;
  setActiveCatalogue: React.Dispatch<
    React.SetStateAction<number | null | undefined>
  >;
  paymentFrom: number | '' | undefined;
  setPaymentFrom: React.Dispatch<React.SetStateAction<number | '' | undefined>>;
  paymentTo: number | '' | undefined;
  setPaymentTo: React.Dispatch<React.SetStateAction<number | '' | undefined>>;
} | null>(null);

function App() {
  const [activePage, setPage] = useState(1);
  const [searchField, setSearchField] = useState('');
  const [activeCatalogue, setActiveCatalogue] = useState<number | null>();
  const [paymentFrom, setPaymentFrom] = useState<number | ''>();
  const [paymentTo, setPaymentTo] = useState<number | ''>();

  return (
    <MantineProvider theme={theme}>
      <Header />
      <main className="content">
        <FilterContext.Provider
          value={{
            activePage,
            setPage,
            searchField,
            setSearchField,
            activeCatalogue,
            setActiveCatalogue,
            paymentFrom,
            setPaymentFrom,
            paymentTo,
            setPaymentTo,
          }}
        >
          <Outlet />
        </FilterContext.Provider>
      </main>
    </MantineProvider>
  );
}

export default App;
