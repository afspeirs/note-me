import { createBrowserRouter } from 'react-router-dom';

import { Layout } from './Layout';
import { Home } from './Home';
import { Note } from './Note';
import { Settings } from './Settings';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/note/',
        element: <Note />,
      },
      // {
      //   path: '/note/:id',
      //   element: <Note />,
      // },
      {
        path: '/settings/',
        element: <Settings />,
      },
    ],
  },
]);
