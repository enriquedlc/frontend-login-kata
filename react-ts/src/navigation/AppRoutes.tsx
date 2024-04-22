import { Route, Routes, useNavigate } from "react-router-dom";
import { AuthServiceApi } from "../infrastructure/AuthServiceApi";
import { RouterReactRouter } from "../infrastructure/RouterReactRouter";
import { TokenRepositoryLocalStorage } from "../infrastructure/TokenRepositoryLocalStorage";
import { Login } from "../pages/Login";
import { Recipes } from "../pages/Recipes";

export const AppRoutes = () => {
  const router = new RouterReactRouter(useNavigate());
  const authService = new AuthServiceApi();
  const tokenRepository = new TokenRepositoryLocalStorage();

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Login
            authService={authService}
            router={router}
            tokenRepository={tokenRepository}
          />
        }
      />
      <Route path="/recipes" element={<Recipes />} />
    </Routes>
  );
};
