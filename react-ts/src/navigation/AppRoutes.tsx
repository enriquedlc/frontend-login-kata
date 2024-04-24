import { Route, Routes, useNavigate } from "react-router-dom";
import { AuthServiceApi } from "../infrastructure/AuthServiceApi";
import {
  Dependencies,
  DependenciesProvider,
} from "../infrastructure/dependencies/Dependencies";
import { RouterReactRouter } from "../infrastructure/RouterReactRouter";
import { TokenRepositoryLocalStorage } from "../infrastructure/TokenRepositoryLocalStorage";
import { Login } from "../pages/Login";
import { Recipes } from "../pages/Recipes";

export const AppRoutes = () => {
  const router = new RouterReactRouter(useNavigate());
  const authService = new AuthServiceApi();
  const tokenRepository = new TokenRepositoryLocalStorage();

  const dependencies: Dependencies = {
    authService,
    tokenRepository,
    router,
  };

  return (
    <DependenciesProvider dependencies={dependencies}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/recipes" element={<Recipes />} />
      </Routes>
    </DependenciesProvider>
  );
};
