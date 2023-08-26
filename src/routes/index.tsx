import { createBrowserRouter } from 'react-router-dom';

import { Home } from '@/routes/Home';
import { Layout } from '@/routes/Layout';
import { Note } from '@/routes/Note';
import { NoteCreate } from '@/routes/NoteCreate';
import { NotFound } from '@/routes/NotFound';
import { Settings } from '@/routes/Settings';

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
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);