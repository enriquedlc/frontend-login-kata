import { render, screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Login } from "./Login";
import { useNavigate } from "react-router-dom";
import { AuthServiceApi } from "../infrastructure/AuthServiceApi";
import { RouterReactRouter } from "../infrastructure/RouterReactRouter";
import { TokenRepositoryLocalStorage } from "../infrastructure/TokenRepositoryLocalStorage";
import { Dependencies, DependenciesProvider } from "../infrastructure/dependencies/Dependencies";
import { AuthService } from "../infrastructure/AuthService";
import { TokenRepository } from '../infrastructure/TokenRepository';

const fakeLogin = async ({ email, password }: LoginParams) => {
  if (email === "linustorvalds@gmail.com" && password === "ilovecats") {
    return "fake-jwt";
  }
  return "";
};

describe("Login", () => {
  it("redirects to recipe page after login", async () => {
    const navigateSpy = vi.fn();
    const router = new RouterReactRouter(navigateSpy);
    const tokenRepository = new TokenRepositoryLocalStorage();

    const authService: AuthService = {
      execute: async ({email, password}) => await fakeLogin({email, password})
    };

    const dependencies: Dependencies = {
      authService,
      tokenRepository,
      router,
    };

    render(
      <DependenciesProvider dependencies={dependencies}>
        <Login />
      </DependenciesProvider>
    );

    const user = userEvent.setup();

    await user.type(
      screen.getByLabelText("Your email"),
      "linustorvalds@gmail.com"
    );
    await user.type(screen.getByLabelText("Your password"), "ilovecats");

    await user.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(
      () => {
        expect(navigateSpy).toHaveBeenCalledWith("/recipes");
      },
      {
        timeout: 5000,
      }
    );
  });
});
