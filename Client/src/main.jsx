import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import router from "./router/router.jsx";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store/Store";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

