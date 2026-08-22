import { createBrowserRouter } from 'react-router';
import { RootLayout } from './RootLayout';
import { AboutPage } from '../pages/AboutPage';
import { ExperiencePage } from '../pages/ExperiencePage';
import { ContactPage } from '../pages/ContactPage';
import { LabHome } from '../pages/LabHome';
import { NotFound } from '../pages/NotFound';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <AboutPage /> },
      { path: 'experience', element: <ExperiencePage /> },
      { path: 'contact', element: <ContactPage /> },
      { path: 'lab', element: <LabHome /> },
      // Future tool route example, added one at a time as tools are built:
      // { path: 'lab/json-formatter', lazy: () => import('../lab/json-formatter/route') },
      { path: '*', element: <NotFound /> },
    ],
  },
]);
