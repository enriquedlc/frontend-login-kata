import { Jwt } from "./AuthService";

export class TokenRepositoryLocalStorage {
  async save(jwt: Jwt) {
    localStorage.setItem("token", jwt);
  }
}
