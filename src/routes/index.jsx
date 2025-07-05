import { createBrowserRouter } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Home from '../pages/dashboard/home';
import Login from '../pages/auth/login';

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/',
    element: <PrivateRoute />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
    ],
  },
  // {
  //   path: '*',
  //   element: <NotFound />,
  // },
]);