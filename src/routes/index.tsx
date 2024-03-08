import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import { SuspenseWrapper } from '@/components/SuspenseWrapper';

const Home = lazy(() => import('./Home').then((module) => ({ default: module.Home })));
const Layout = lazy(() => import('./Layout').then((module) => ({ default: module.Layout })));
const Note = lazy(() => import('./Note').then((module) => ({ default: module.Note })));
const NoteCreate = lazy(() => import('./NoteCreate').then((module) => ({ default: module.NoteCreate })));
const NotFound = lazy(() => import('./NotFound').then((module) => ({ default: module.NotFound })));
const Settings = lazy(() => import('./Settings').then((module) => ({ default: module.Settings })));

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <SuspenseWrapper component={Home} />,
      },
      {
        path: '/note/',
        element: <SuspenseWrapper component={NoteCreate} />,
      },
      {
        path: '/note/:id',
        element: <SuspenseWrapper component={Note} />,
      },
      {
        path: '/settings/',
        element: <SuspenseWrapper component={Settings} />,
      },
      {
        path: '*',
        element: <SuspenseWrapper component={NotFound} />,
      },
    ],
  },
]);
