import { useEffect, useState } from "react";
import { Button } from "../components/Button.js";
import { EmailField } from "../components/EmailField.js";
import { PasswordField } from "../components/PasswordField.js";
import { Title } from "../components/Title.js";
import { useDependenciesContext } from "../infrastructure/dependencies/Dependencies.js";
import { translateError } from "../utils/translateError.js";
import "./Login.css";

export const Login = () => {
  const { dependencies } = useDependenciesContext();
  const { authService, tokenRepository, router } = dependencies;

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
    authService
      .execute({ email, password })
      .then((token) => {
        tokenRepository.save(token);
        router.goToRecipes();
      })
      .catch((err) => setErrorMessage(err.message))
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
