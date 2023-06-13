import { createBrowserRouter } from 'react-router-dom';

import { Home } from './Home';
import { Layout } from './Layout';
import { Note } from './Note';
import { NoteCreate } from './NoteCreate';
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
        element: <NoteCreate />,
      },
      {
        path: '/note/:id',
        element: <Note />,
      },
      {
        path: '/settings/',
        element: <Settings />,
      },
      // TODO: Create 404 page
      // {
      //   path: '*',
      //   element: <NoPage />,
      // },
    ],
  },
]);
