import { RouterProvider, createBrowserRouter } from "react-router-dom";
import SignIn from "../../Pages/SignIn/SignIn";
import SignUp from "../../Pages/SignUp/SignUp";

const router = createBrowserRouter([
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
