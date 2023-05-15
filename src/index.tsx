import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Favorites } from './components/Favorites/Favorits';
import { VacanciesContainer } from './components/VacanciesContainer/VacanciesContainer';
import { VacancyPage } from './components/VacancyPage/VacancyPage';
import { EmptyState } from './components/EmptyState/EmptyState';
import { FAVORITES_PAGE_URL, SEARCH_PAGE_URL } from './globalVars/routes';

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
        path: '/:id',
        element: <VacancyPage />,
      },
      {
        path: SEARCH_PAGE_URL,
        element: <VacanciesContainer />,
      },
      {
        path: FAVORITES_PAGE_URL,
        element: <Favorites />,
      },
      {
        path: '/404',
        element: (
          <EmptyState title="Такой страницы не существует" withRedirectButton />
        ),
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
