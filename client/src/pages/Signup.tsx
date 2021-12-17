import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import {
  setAuthErrorMessage,
  signup,
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
