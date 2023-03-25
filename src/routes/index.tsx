import { createBrowserRouter } from 'react-router-dom';

import { Layout } from './Layout';
import { Home } from './Home';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
    ],
  },
]);
