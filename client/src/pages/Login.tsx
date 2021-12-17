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
import Footer from "../components/SessionPage/Footer";
import Form from "../components/SessionPage/Form";
import Header from "../components/SessionPage/Header";
import SubmitButton from "../components/SessionPage/SubmitButton";
import PageContainer from "../components/SessionPage/PageContainer";
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
