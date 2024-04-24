import { render, screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Login } from "./Login";
import { RouterReactRouter } from "../infrastructure/RouterReactRouter";
import { TokenRepositoryLocalStorage } from "../infrastructure/TokenRepositoryLocalStorage";
import { ContainerProvider } from "../infrastructure/dependencies/Dependencies";
import { AuthService } from "../infrastructure/AuthService";
import { Container } from "inversify";

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

    const container = new Container();
    container.bind("AuthService").toConstantValue(authService);
    container.bind("TokenRepository").toConstantValue(tokenRepository);
    container.bind("Router").toConstantValue(router);
    
    render(
      <ContainerProvider container={container}>
        <Login />
      </ContainerProvider>
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
