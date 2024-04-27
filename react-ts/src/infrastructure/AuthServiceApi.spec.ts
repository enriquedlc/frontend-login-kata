import { describe, expect, it } from "vitest";
import { AuthServiceApi } from "./AuthServiceApi";
import {
  MissingEmailError,
  MissingPasswordError,
  WrongEmailOrPasswordError,
} from "../error/DomainError";

describe("AuthServiceApi", () => {
  it("throws an error if empty email", async () => {
    const authService = new AuthServiceApi();
    await expect(
      authService.execute({ email: "", password: "password" })
    ).rejects.toThrowError(MissingEmailError);
  });

  it("throws an error if empty password", async () => {
    const authService = new AuthServiceApi();
    await expect(
      authService.execute({ email: "test@gmial.com", password: "" })
    ).rejects.toThrowError(MissingPasswordError);
  });

  it("throws an error if wrong email and password", async () => {
    const authService = new AuthServiceApi();
    await expect(
      authService.execute({ email: "test@gmial.com", password: "password" })
    ).rejects.toThrowError(WrongEmailOrPasswordError);
  });

  it("throws an unexpected error if email has wrong characters", async () => {
    const authService = new AuthServiceApi();
    await expect(
      authService.execute({ email: ";'", password: "" })
    ).rejects.toThrowError();
  });
});
