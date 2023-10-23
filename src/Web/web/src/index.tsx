import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import { ThemeProvider } from "@mui/material";
import React, { Suspense, useEffect, useState } from "react";
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
      {publicRoutes.map((publicRoute, index) => (
        <Route
          key={`${publicRoute.path}_${index}`}
          path={publicRoute.path}
          element={<publicRoute.content />}
        />
      ))}
      {authorizedRoutes.map((authorizedRoute, index) => (
        <Route
          key={`${authorizedRoute.path}_${index}`}
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
      <Hub>
        <RecoilRoot>
          <RecoilNexus />
          <RouterProvider router={router} />
        </RecoilRoot>
      </Hub>
    </ThemeProvider>
  </React.StrictMode>,
);

function Hub({ children }: { children: JSX.Element }): JSX.Element {
  const [connection, setConnection] = useState<null | HubConnection>(null);

  useEffect(() => {
    const connect = new HubConnectionBuilder()
      .withUrl("http://localhost:5154/hubs/notifications")
      .withAutomaticReconnect()
      .build();

    setConnection(connect);
  }, []);

  useEffect(() => {
    const startConnection = async () => {
      if (connection) {
        await connection.start();
      }
    };

    if (connection) {
      startConnection();
      connection.on("NotificationCreated", (message) => {
        console.log(message);
      });
    }
  }, [connection]);

  return children;
}
