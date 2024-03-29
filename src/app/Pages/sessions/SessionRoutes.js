import Loadable from "../../components/Loadable";
import { lazy } from "react";

import AuthGuard from "../../auth/AuthGuard";
import MatxLayout from "../../components/MatxLayout/MatxLayout";

const NotFound = Loadable(lazy(() => import("./NotFound")));
const ForgotPassword = Loadable(lazy(() => import("./ForgotPassword")));
const JwtLogin = Loadable(lazy(() => import("./JwtLogin")));
const JwtRegister = Loadable(lazy(() => import("./JwtRegister")));

const sessionRoutes = [
    { path: "/session/signup", element: <JwtRegister /> },
    { path: "/session/signin", element: <JwtLogin /> },
    { path: "/session/forgot-password", element: <ForgotPassword /> },
    { path: "/session/404", element: <NotFound /> },
];

export default sessionRoutes;
