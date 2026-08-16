import { createBrowserRouter } from 'react-router';
import { RootLayout } from './RootLayout';
import { SandboxHome } from '../pages/SandboxHome';
import { NotFound } from '../pages/NotFound';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <SandboxHome /> },
      // Future feature route example, added one at a time as demos are built:
      // { path: 'hooks/use-reducer', lazy: () => import('../features/hooks/use-reducer/route') },
      { path: '*', element: <NotFound /> },
    ],
  },
]);
