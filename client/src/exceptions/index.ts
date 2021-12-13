export class ApiResponseError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export class UnknownError extends Error {
  constructor() {
    super("Something went wrong");
  }
}

export class LoginError extends Error {
  constructor() {
    super("Invalid username/password");
  }
}

export class SignupError extends Error {
  constructor() {
    super("Username already taken");
  }
}
