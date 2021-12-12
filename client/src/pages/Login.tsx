import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { login } from "../reducers/sessionReducer";
import { UserCreateDto } from "../dtos/users.dto";
import { RootState } from "../store";
import Input from "../components/shared/Input";
import ErrorMessage from "../components/AuthPage/ErrorMessage";
import Footer from "../components/AuthPage/Footer";
import Form from "../components/AuthPage/Form";
import Header from "../components/AuthPage/Header";
import SubmitButton from "../components/AuthPage/SubmitButton";
import PageContainer from "../components/AuthPage/PageContainer";

const Login = () => {
  const dispatch = useDispatch();

  const handleLogin = (userData: UserCreateDto) => {
    dispatch(login(userData));
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
      <Form onSubmit={handleSubmit(handleLogin)}>
        <Input
          placeholder="Username"
          defaultValue="john_doe"
          {...register("username", { required: "Username is required" })}
        />
        {errors.username && (
          <ErrorMessage>{errors.username.message}</ErrorMessage>
        )}
        <Input
          type="password"
          placeholder="Password"
          defaultValue="john_doe"
          {...register("password", { required: "Password is required" })}
        />
        {errors.password && (
          <ErrorMessage>{errors.password.message}</ErrorMessage>
        )}
        <SubmitButton disabled={isLoading}>Login</SubmitButton>
      </Form>
      <Footer>
        Don&rsquo;t have an account? <Link to="/signup">Sign up</Link>
      </Footer>
    </PageContainer>
  );
};

export default Login;
