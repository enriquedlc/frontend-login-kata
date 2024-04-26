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

    console.log(data);

    if (data.status === "error") {
      throw new Error(data.code);
    }
    return data.payload.jwt;
  }
}
