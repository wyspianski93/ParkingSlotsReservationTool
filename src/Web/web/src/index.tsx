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
import { AuthorizedPageContent } from "./pages/AuthorizedPageContent";
import BaseViewPaper from "./pages/BaseViewPaper";
import { Layout } from "./pages/Layout";
import { SignIn } from "./pages/SignIn";
import { authorizedRoutes, publicRoutes } from "./routing/routes";
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
            <Suspense fallback={<BaseViewPaper>Loading</BaseViewPaper>}>
              <AuthorizedPageContent>
                <authorizedRoute.content></authorizedRoute.content>
              </AuthorizedPageContent>
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
