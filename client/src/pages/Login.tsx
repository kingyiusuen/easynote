import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import {
  login,
  setAuthErrorMessage,
  UsernamePassword,
} from "../actions/session.action";
import Input from "../components/shared/Input";
import ErrorMessage from "../components/shared/ErrorMessage";
import Footer from "../components/AuthPage/Footer";
import Form from "../components/AuthPage/Form";
import Header from "../components/AuthPage/Header";
import SubmitButton from "../components/AuthPage/SubmitButton";
import PageContainer from "../components/AuthPage/PageContainer";
import { useReduxSelector } from "../hooks";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const handleLogin = (userData: UsernamePassword) => {
    setIsLoading(true);
    dispatch(login(userData));
    setIsLoading(false);
  };

  // Clear error message when switch form
  const location = useLocation();
  useEffect(() => {
    dispatch(setAuthErrorMessage(""));
  }, [location, dispatch]);

  // Get current error message
  const serverError = useReduxSelector((state) => state.session.error);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <PageContainer>
      <Header />
      <Form onSubmit={handleSubmit(handleLogin)}>
        <Input
          placeholder="Username"
          defaultValue="jane_doe"
          {...register("username", { required: "Username is required" })}
        />
        {errors.username && (
          <ErrorMessage>{errors.username.message}</ErrorMessage>
        )}
        <Input
          type="password"
          placeholder="Password"
          defaultValue="jane_doe"
          {...register("password", { required: "Password is required" })}
        />
        {errors.password && (
          <ErrorMessage>{errors.password.message}</ErrorMessage>
        )}
        <SubmitButton disabled={isLoading}>Login</SubmitButton>
        {serverError && <ErrorMessage>{serverError}</ErrorMessage>}
      </Form>
      <Footer>
        Don&rsquo;t have an account? <Link to="/signup">Sign up</Link>
      </Footer>
    </PageContainer>
  );
};

export default Login;
