export enum DomainErrorCode {
  MissingEmail = "missing_email_field",
  MissingPasswordField = "missing_password_field",
  WrongEmailOrPassword = "wrong_email_or_password",
}

export class DomainError extends Error {
  code: DomainErrorCode;

  constructor(message: string, code: DomainErrorCode) {
    super(message);
    this.name = "DomainError";
    this.code = code;
  }
}

export class MissingEmailError extends DomainError {
  constructor() {
    super("Email is missing", DomainErrorCode.MissingEmail);
  }
}

export class MissingPasswordError extends DomainError {
  constructor() {
    super("Password is missing", DomainErrorCode.MissingPasswordField);
  }
}

export class WrongEmailOrPasswordError extends DomainError {
  constructor() {
    super("Wrong email or password", DomainErrorCode.WrongEmailOrPassword);
  }
}
