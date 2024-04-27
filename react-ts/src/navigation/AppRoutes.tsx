import { Route, Routes, useNavigate } from "react-router-dom";

import { Container } from "inversify";
import { AuthServiceApi } from "../infrastructure/AuthServiceApi";
import { ContainerProvider } from "../infrastructure/dependencies/Dependencies";
import { RouterReactRouter } from "../infrastructure/RouterReactRouter";
import { TokenRepositoryLocalStorage } from "../infrastructure/TokenRepositoryLocalStorage";
import { Login } from "../pages/Login";
import { Recipes } from "../pages/Recipes";
import { Router } from "../infrastructure/Router";

export const AppRoutes = () => {
  const navigate = useNavigate();
  const container = new Container();
  container.bind("AuthService").toDynamicValue(() => new AuthServiceApi());
  container
    .bind("TokenRepository")
    .toDynamicValue(() => new TokenRepositoryLocalStorage());
  container
    .bind<Router>("Router")
    .toDynamicValue(() => new RouterReactRouter(() => navigate("/recipes")));

  return (
    <ContainerProvider container={container}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/recipes" element={<Recipes />} />
      </Routes>
    </ContainerProvider>
  );
};
