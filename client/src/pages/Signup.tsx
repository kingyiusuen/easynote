import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { signup } from "../reducers/sessionReducer";
import { UserCreateDto } from "../dtos/users.dto";
import { RootState } from "../store";
import Input from "../components/shared/Input";
import ErrorMessage from "../components/AuthPage/ErrorMessage";
import Footer from "../components/AuthPage/Footer";
import Form from "../components/AuthPage/Form";
import Header from "../components/AuthPage/Header";
import SubmitButton from "../components/AuthPage/SubmitButton";
import PageContainer from "../components/AuthPage/PageContainer";

const Signup = () => {
  const dispatch = useDispatch();

  const handleSignup = (userData: UserCreateDto) => {
    dispatch(signup(userData));
  };

  const isLoading = useSelector((state: RootState) => state.session.isLoading);

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
              message: "Username must be 3 to 70 characters long",
            },
            maxLength: {
              value: 70,
              message: "Username must be 3 to 70 characters long",
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
      </Form>
      <Footer>
        Already have an account? <Link to="/login">Login</Link>
      </Footer>
    </PageContainer>
  );
};

export default Signup;
