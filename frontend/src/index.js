import React from "react";
import ReactDOM from "react-dom/client";

// react-router-dom
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import { HelmetProvider } from "react-helmet-async";

// Redux & Store
import { Provider } from "react-redux";
import store from "./store";

// Importing the Bootstrap CSS and index.css
import "./assets/styles/bootstrap.custom.css";
import "./assets/styles/index.css";

import App from "./App";
import reportWebVitals from "./reportWebVitals";

// screens
import HomeScreen from "./screens/HomeScreen";
import PostScreen from "./screens/PostScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import PostEditScreen from "./screens/PostEditScreen";
import UserListScreen from "./screens/admin/UserListScreen";
import UserEditScreen from "./screens/admin/UserEditScreen";
import PostsListScreen from "./screens/admin/PostsListScreen";

// PrivateRoute component
import PrivateRoute from "./components/PrivateRoute";

// AdminRoute component
import AdminRoute from "./components/AdminRoute";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomeScreen />} />
      <Route path="/search/:keyword" element={<HomeScreen />} />
      <Route path="/page/:pageNumber" element={<HomeScreen />} />

      <Route
        path="/search/:keyword/page/:pageNumber"
        element={<HomeScreen />}
      />

      <Route path="/posts/:id" element={<PostScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />

      {/* Private Route */}
      <Route path="" element={<PrivateRoute />}>
        <Route path="/profile" element={<ProfileScreen />} />
        <Route path="/posts/:id/edit" element={<PostEditScreen />} />
      </Route>

      {/* Admin Route */}
      <Route path="" element={<AdminRoute />}>
        {/* admin/postlist,  ,admin/userlist , admin/user/:id/edit */}
        <Route path="/admin/userlist" element={<UserListScreen />} />
        <Route path="/admin/postlist" element={<PostsListScreen />} />
        <Route
          path="/admin/postlist/:pageNumber"
          element={<PostsListScreen />}
        />
        <Route
          path="/admin/userlist/:pageNumber"
          element={<UserListScreen />}
        />
        <Route path="/admin/user/:id/edit" element={<UserEditScreen />} />
      </Route>
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </HelmetProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
