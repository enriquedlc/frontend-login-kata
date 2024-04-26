import { useEffect, useState } from "react";
import { Button } from "../components/Button.js";
import { EmailField } from "../components/EmailField.js";
import { PasswordField } from "../components/PasswordField.js";
import { Title } from "../components/Title.js";
import { useContainerContext } from "../infrastructure/dependencies/Dependencies.js";
import { translateError } from "../utils/translateError.js";
import { LoginUseCase } from "../useCases/LoginUseCase.ts";

import "./Login.css";
import { AuthService } from "../infrastructure/AuthService.ts";
import { TokenRepository } from "../infrastructure/TokenRepository.ts";
import { Router } from "../infrastructure/Router.ts";
import { useAsyncError } from "../components/error/hooks/throwError.ts";

export const Login = () => {
  const container = useContainerContext();
  const { propagateError } = useAsyncError();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setErrorMessage(null);
  }, [email, password]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    const authService = container.get<AuthService>("AuthService");
    const tokenRepository = container.get<TokenRepository>("TokenRepository");
    const router = container.get<Router>("Router");

    const loginUseCase = new LoginUseCase({
      authService,
      tokenRepository,
      router,
    });

    loginUseCase
      .execute({ email, password })
      .catch((err) => setErrorMessage(err.message))
      .catch(propagateError)
      .finally(() => setIsLoading(false));
  };

  return (
    <main className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <Title>Login with email</Title>
        <p>Enter your email address to login with your account.</p>

        <EmailField
          id="email"
          labelText="Your email"
          value={email}
          onChange={setEmail}
        />
        <PasswordField
          id="password"
          labelText="Your password"
          value={password}
          onChange={setPassword}
        />
        {errorMessage && <p>{translateError(errorMessage)}</p>}
        <Button title="Login" disabled={isLoading} />
      </form>
    </main>
  );
};
