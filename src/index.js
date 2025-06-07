import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import BlogPost from "./containers/blogpost/BlogPost";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/blogpost",
    element: <BlogPost />,
  },

]);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
