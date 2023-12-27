import { Suspense, lazy } from "react";
import { Navigate, useRoutes } from "react-router-dom";
import DashboardLayout from "../layouts/dashboard";
import { DEFAULT_PATH } from "../config";
import LoadingScreen from "../components/LoadingScreen";
import AuthLayout from "../pages/auth/authLayout";
import Signup from "../pages/auth/Signup";
import Call from "../components/Call/call";
const Loadable = (Component) => (props) => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );
};
export default function Router() {
  return useRoutes([
    {
      path: "/",
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to={DEFAULT_PATH} replace />, index: true },
        { path: "app", element:<GeneralApp />},      
        { path: "settings", element:<Settings/>},
        {path: "call", element:<Call/>},
        { path: "404", element:<Page404 /> },
        { path: "*", element:<Navigate to="/404" replace /> },
      ],
    },
    {
      path: "/auth",
      element: <AuthLayout/>,
      children:[
        {path:"login", element:<Login/>},
        {path:"signup", element:<Signup/>},
        {path:"verify-otp", element:<OtpVerification/>}
      ]
    },
    { path: "*", element: <Navigate to="/404" replace /> },
  ]);
}

const GeneralApp = Loadable(
  lazy(() => import("../pages/dashboard/GeneralApp")),
);
const Settings = Loadable(
  lazy(()=> import("../pages/Settings/Settings"))
)
const Login = Loadable(
  lazy(()=> import("../pages/auth/Login"))
)
const OtpVerification = Loadable(
  lazy(()=> import("../pages/auth/otpVerification"))
)
const Page404 = Loadable(
  lazy(() => import("../pages/Page404"))
);