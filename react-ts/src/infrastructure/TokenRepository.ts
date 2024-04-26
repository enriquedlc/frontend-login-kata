import { Jwt } from "./AuthService";

export interface TokenRepository {
  save(jwt: Jwt): Promise<void>;
  get: () => Promise<Jwt | null>;
}
