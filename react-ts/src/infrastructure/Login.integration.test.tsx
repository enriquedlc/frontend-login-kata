import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { Container } from "inversify";
import { describe } from "node:test";
import { it, vi } from "vitest";

import { Login } from "../pages/Login";
import { AuthServiceApi } from "./AuthServiceApi";
import { ContainerProvider } from "./dependencies/Dependencies";
import { RouterReactRouter } from "./RouterReactRouter";
import { TokenRepositoryLocalStorage } from "./TokenRepositoryLocalStorage";

describe("Login", () => {
  it("ui renders error Wrong email or password message", async () => {
    const user = userEvent.setup();
    const navigateSpy = vi.fn();
    const router = new RouterReactRouter(navigateSpy);
    const tokenRepository = new TokenRepositoryLocalStorage();
    const authService = new AuthServiceApi();

    const container = new Container();
    container.bind("AuthService").toConstantValue(authService);
    container.bind("TokenRepository").toConstantValue(tokenRepository);
    container.bind("Router").toConstantValue(router);

    render(
      <ContainerProvider container={container}>
        <Login />
      </ContainerProvider>
    );

    await user.type(screen.getByLabelText("Your email"), "fakeemail@gmial.com");
    await user.type(screen.getByLabelText("Your password"), "ilovecats");
    await user.click(screen.getByRole("button", { name: /login/i }));

    screen.getByText("Wrong email or password");
  });
});
