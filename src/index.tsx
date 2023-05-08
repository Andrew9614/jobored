import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Favorites } from './components/Favorites/Favorits';
import { VacanciesContainer } from './components/VacanciesContainer/VacanciesContainer';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: '/',
        element: <div>Main</div>,
      },
      {
        path: '/search',
        element: <VacanciesContainer />,
      },
      {
        path: '/favorites',
        element: <Favorites />,
      },
    ],
  },
]);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
