/**
 * React Router 설정
 */
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { MapPage } from '@/pages/map/ui/MapPage';
import { ComponentsPage } from '@/pages/components/ui/ComponentsPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MapPage />,
  },
  {
    path: '/components',
    element: <ComponentsPage />,
  },
]);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
