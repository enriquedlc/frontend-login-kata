export type Jwt = string;

export interface AuthService {
  execute(params: LoginParams): Promise<Jwt>;
}
