import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import ErrorPage from "./pages/ErrorPage";
import PlaylistPage from "./pages/PlaylistPage";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "playlist/:playlistID",
    element: <PlaylistPage />,
  },
]);

ReactDOM.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
  document.getElementById("root")
)