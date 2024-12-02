import { RouteObject } from "react-router-dom";
import { PATH } from "constant";
import { Login, Register, Home, Account, Stories, Saved } from "pages";
import { AuthLayout, MainLayout } from "../components";

export const router: RouteObject[] = [
  {
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: PATH.account,
        element: <Account />,
      },
      {
        path: PATH.saved,
        element: <Saved />,
      },
    ],
  },
  {
    path: PATH.stories,
    element: <Stories />,
  },
  // {
  //   path: PATH.watch,
    
  // },
  {
    element: <AuthLayout />,
    children: [
      {
        path: PATH.login,
        element: <Login />,
      },
      {
        path: PATH.register,
        element: <Register />,
      },
    ],
  },
];
