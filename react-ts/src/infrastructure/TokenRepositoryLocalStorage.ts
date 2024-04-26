import { Jwt } from "./AuthService";

export class TokenRepositoryLocalStorage {
  async save(jwt: Jwt) {
    localStorage.setItem("token", jwt);
  }

  async get(): Promise<Jwt | null> {
    return localStorage.getItem("token");
  }
}
