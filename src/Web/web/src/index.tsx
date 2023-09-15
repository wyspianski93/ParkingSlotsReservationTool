import { ThemeProvider } from "@mui/material";
import React from "react";
import ReactDOM from "react-dom/client";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { RecoilRoot } from "recoil";
import "./index.css";
import { AuthorizedContent } from "./pages/AuthorizedContent";
import { Layout } from "./pages/Layout";
import { authorizedRoutes } from "./routing/authorizedRoutes";
import { publicRoutes } from "./routing/publicRotues";
import { theme } from "./theme";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

const router = createBrowserRouter(
  createRoutesFromElements([
    <Route element={<Layout />}>
      {publicRoutes.map((publicRoute) => (
        <Route path={publicRoute.path} element={<publicRoute.content />}></Route>
      ))}
      ,
      {authorizedRoutes.map((authorizedRoute) => (
        <Route
          path={authorizedRoute.path}
          element={
            <AuthorizedContent>
              <authorizedRoute.content></authorizedRoute.content>
            </AuthorizedContent>
          }
        />
      ))}
    </Route>,
  ]),
);

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <RecoilRoot>
        <RouterProvider router={router} />
      </RecoilRoot>
    </ThemeProvider>
  </React.StrictMode>,
);
