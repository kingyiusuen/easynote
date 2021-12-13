import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useReduxSelector, useRestoreSession } from "./hooks";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import GlobalStyle from "./styles/global";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  useRestoreSession();
  const isAuthenticated = useReduxSelector(
    (state) => state.auth.isAuthenticated
  );
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const PublicRoute = ({ children }: { children: JSX.Element }) => {
  useRestoreSession();
  const isAuthenticated = useReduxSelector(
    (state) => state.auth.isAuthenticated
  );
  return isAuthenticated ? <Navigate to="/" /> : children;
};

const App = () => {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
