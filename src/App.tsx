import { Outlet } from 'react-router-dom';
import './App.scss';
import { Header } from './components/Header/Header';
import { CSSObject, MantineProvider } from '@mantine/core';

const inputStyle = {
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

function App() {
  return (
    <MantineProvider
      theme={{
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
            styles: () => ({ input: inputStyle } as Record<string, CSSObject>),
          },
          TextInput: {
            styles: () => ({ input: inputStyle } as Record<string, CSSObject>),
          },
          NumberInput: {
            styles: () => ({ input: inputStyle } as Record<string, CSSObject>),
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
      }}
    >
      <Header />
      <Outlet />
    </MantineProvider>
  );
}

export default App;
