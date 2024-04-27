import {
  DomainErrorCode,
  MissingEmailError,
  MissingPasswordError,
  WrongEmailOrPasswordError,
} from "../error/DomainError";
import { AuthService, Jwt } from "./AuthService";

export class AuthServiceApi implements AuthService {
  async execute(params: LoginParams): Promise<Jwt> {
    const response = await fetch(
      "https://backend-login-placeholder.deno.dev/api/users/login",
      {
        method: "POST",
        body: JSON.stringify(params),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

    if (data.status === "error") {
      domainErrorMapper(data.code);
    }
    return data.payload.jwt;
  }
}

const ERROR_MAP: Record<DomainErrorCode, () => Error> = {
  [DomainErrorCode.MissingEmail]: () => new MissingEmailError(),
  [DomainErrorCode.MissingPasswordField]: () => new MissingPasswordError(),
  [DomainErrorCode.WrongEmailOrPassword]: () => new WrongEmailOrPasswordError(),
};

const domainErrorMapper = (code: DomainErrorCode) => {
  throw ERROR_MAP[code]();
};
