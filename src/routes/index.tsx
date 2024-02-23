import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
  {
    async lazy() {
      const { Layout } = await import('./Layout');
      return { Component: Layout };
    },
    children: [
      {
        path: '/',
        async lazy() {
          const { Home } = await import('./Home');
          return { Component: Home };
        },
      },
      {
        path: '/note/',
        async lazy() {
          const { NoteCreate } = await import('./NoteCreate');
          return { Component: NoteCreate };
        },
      },
      {
        path: '/note/:id',
        async lazy() {
          const { Note } = await import('./Note');
          return { Component: Note };
        },
      },
      {
        path: '/settings/',
        async lazy() {
          const { Settings } = await import('./Settings');
          return { Component: Settings };
        },
      },
      {
        path: '*',
        async lazy() {
          const { NotFound } = await import('./NotFound');
          return { Component: NotFound };
        },
      },
    ],
  },
]);
