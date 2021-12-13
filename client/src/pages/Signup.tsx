import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import {
  setLoginSignupError,
  signup,
  UsernamePassword,
} from "../actions/auth.action";
import Input from "../components/shared/Input";
import ErrorMessage from "../components/AuthPage/ErrorMessage";
import Footer from "../components/AuthPage/Footer";
import Form from "../components/AuthPage/Form";
import Header from "../components/AuthPage/Header";
import SubmitButton from "../components/AuthPage/SubmitButton";
import PageContainer from "../components/AuthPage/PageContainer";
import { useReduxSelector } from "../hooks";

const Signup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const handleSignup = (userData: UsernamePassword) => {
    setIsLoading(true);
    dispatch(signup(userData));
    setIsLoading(false);
  };

  // Clear error message when switch form
  const location = useLocation();
  useEffect(() => {
    dispatch(setLoginSignupError(""));
  }, [location, dispatch]);

  // Get current error message
  const serverError = useReduxSelector((state) => state.auth.error);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <PageContainer>
      <Header />
      <Form onSubmit={handleSubmit(handleSignup)}>
        <Input
          placeholder="Username"
          {...register("username", {
            required: "Username is required",
            minLength: {
              value: 3,
              message: "Username must be 3 to 30 characters long",
            },
            maxLength: {
              value: 30,
              message: "Username must be 3 to 30 characters long",
            },
          })}
        />
        {errors.username && (
          <ErrorMessage>{errors.username.message}</ErrorMessage>
        )}
        <Input
          type="password"
          placeholder="Password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 3,
              message: "Password must be 3 to 70 characters long",
            },
            maxLength: {
              value: 70,
              message: "Password must be 3 to 70 characters long",
            },
          })}
        />
        {errors.password && (
          <ErrorMessage>{errors.password.message}</ErrorMessage>
        )}
        <SubmitButton disabled={isLoading}>Sign Up</SubmitButton>
        {serverError && <ErrorMessage>{serverError}</ErrorMessage>}
      </Form>
      <Footer>
        Already have an account? <Link to="/login">Login</Link>
      </Footer>
    </PageContainer>
  );
};

export default Signup;
