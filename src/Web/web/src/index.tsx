import { ThemeProvider } from "@mui/material";
import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { RecoilRoot } from "recoil";
import RecoilNexus from "recoil-nexus";
import "./index.css";
import { Layout } from "./pages/Layout";
import { Loader } from "./pages/Loader";
import { SignIn } from "./pages/SignIn";
import { publicRoutes } from "./routing/publicRoutes";
import { authorizedRoutes } from "./routing/routes";
import { theme } from "./theme";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

const router = createBrowserRouter(
  createRoutesFromElements([
    <Route element={<Layout />}>
      {publicRoutes.map((publicRoute) => (
        <Route path={publicRoute.path} element={<publicRoute.content />} />
      ))}
      {authorizedRoutes.map((authorizedRoute) => (
        <Route
          path={authorizedRoute.path}
          element={
            <Suspense fallback={<Loader />}>
              <authorizedRoute.content />
            </Suspense>
          }
        />
      ))}
      <Route path="*" element={<SignIn />} />
    </Route>,
  ]),
);

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <RecoilRoot>
        <RecoilNexus />
        <RouterProvider router={router} />
      </RecoilRoot>
    </ThemeProvider>
  </React.StrictMode>,
);
