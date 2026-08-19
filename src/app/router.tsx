import { createBrowserRouter } from 'react-router';
import { RootLayout } from './RootLayout';
import { PortfolioHome } from '../pages/PortfolioHome';
import { LabHome } from '../pages/LabHome';
import { NotFound } from '../pages/NotFound';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <PortfolioHome /> },
      { path: 'lab', element: <LabHome /> },
      // Future tool route example, added one at a time as tools are built:
      // { path: 'lab/json-formatter', lazy: () => import('../lab/json-formatter/route') },
      { path: '*', element: <NotFound /> },
    ],
  },
]);
