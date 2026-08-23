import { createBrowserRouter } from 'react-router';

import { AboutPage } from '../pages/AboutPage/AboutPage';
import { ContactPage } from '../pages/ContactPage/ContactPage';
import { ExperiencePage } from '../pages/ExperiencePage/ExperiencePage';
import { LabHome } from '../pages/LabHome/LabHome';
import { NotFound } from '../pages/NotFound/NotFound';
import { RouteError } from '../pages/RouteError/RouteError';
import { RootLayout } from './RootLayout';

export const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <RootLayout />,
      errorElement: <RouteError />,
      children: [
        { index: true, element: <AboutPage /> },
        { path: 'experience', element: <ExperiencePage /> },
        { path: 'contact', element: <ContactPage /> },
        { path: 'lab', element: <LabHome /> },
        {
          path: 'lab/json-formatter',
          lazy: () =>
            import('../lab/json-formatter/JsonFormatterPage').then((m) => ({ Component: m.JsonFormatterPage })),
        },
        {
          path: 'lab/color-contrast-checker',
          lazy: () =>
            import('../lab/color-contrast-checker/ColorContrastCheckerPage').then((m) => ({
              Component: m.ColorContrastCheckerPage,
            })),
        },
        { path: '*', element: <NotFound /> },
      ],
    },
  ],
  { basename: import.meta.env.BASE_URL },
);
