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
      // TODO: create a new note and redirect the user to that note if the id isn't present
      // {
      //   path: '/note/',
      //   element: <NoteCreate />,
      // },
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
