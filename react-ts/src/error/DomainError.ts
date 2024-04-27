export enum DomainErrorCode {
  MissingEmail = "missing_email_field",
  MissingPasswordField = "missing_password_field",
  WrongEmailOrPassword = "wrong_email_or_password",
}

export class DomainError extends Error {
  code: DomainErrorCode;

  constructor(message: string, code: DomainErrorCode) {
    super(message);
    this.code = code;
  }
}

export class MissingEmailError extends DomainError {
  constructor() {
    super("Email field is required", DomainErrorCode.MissingEmail);
  }
}

export class MissingPasswordError extends DomainError {
  constructor() {
    super("Password field is required", DomainErrorCode.MissingPasswordField);
  }
}

export class WrongEmailOrPasswordError extends DomainError {
  constructor() {
    super("Wrong email or password", DomainErrorCode.WrongEmailOrPassword);
  }
}
