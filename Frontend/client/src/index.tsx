import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
// bootstrap css file cdn
import "bootstrap/dist/css/bootstrap.min.css";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider, Route, Link } from "react-router-dom";
import PageLoader from "./components/PageLoader";
import ResetPassword from "./pages/resetPassword/ResetPassword";

const HomePage = React.lazy(() => import("./pages/homePage/HomePage"));
const LoginPage = React.lazy(() => import("./pages/loginPage/LoginPage"));
const SignUpPage = React.lazy(() => import("./pages/SignupPage/SignUpPage"));
const ForgetPassword = React.lazy(() => import("./pages/ForgetPassword/ForgetPassword"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,

    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<PageLoader />}>
            <HomePage />
          </Suspense>
        ),
      },
      {
        path: "login",
        element: (
          <Suspense fallback={<PageLoader />}>
            <LoginPage />
          </Suspense>
        ),
      },
      {
        path: "register",
        element: (
          <Suspense fallback={<PageLoader />}>
            <SignUpPage />
          </Suspense>
        ),
      },
      {
        path: "forgetpassword",
        element: (
          <Suspense fallback={<PageLoader />}>
            <ForgetPassword />
          </Suspense>
        ),
      },
      {
        path: "resetpassword/:token",
        element: (
          <Suspense fallback={<PageLoader />}>
            <ResetPassword />
          </Suspense>
        ),
      },
      {
        path: "*",
        element: <h1>Sorry No Page</h1>,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
