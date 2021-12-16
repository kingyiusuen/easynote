import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useReduxSelector, useRestoreSession } from "./hooks";
import LandingPage from "./pages/LandingPage";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import GlobalStyle from "./styles/global";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  useRestoreSession();
  const isAuthenticated = useReduxSelector(
    (state) => state.session.isAuthenticated
  );
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const PublicRoute = ({ children }: { children: JSX.Element }) => {
  useRestoreSession();
  const isAuthenticated = useReduxSelector(
    (state) => state.session.isAuthenticated
  );
  return isAuthenticated ? <Navigate to="/home/all" /> : children;
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
          path="/home/:notebookId"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/"
          element={
            <PublicRoute>
              <LandingPage />
            </PublicRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
