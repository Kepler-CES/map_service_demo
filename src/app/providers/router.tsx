/**
 * React Router 설정
 */
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { MapPage } from '@/pages/map/ui/MapPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MapPage />,
  },
]);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
