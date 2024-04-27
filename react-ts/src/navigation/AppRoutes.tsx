import { Route, Routes, useNavigate } from "react-router-dom";

import { Container } from "inversify";
import { AuthServiceApi } from "../infrastructure/AuthServiceApi";
import { ContainerProvider } from "../infrastructure/dependencies/Dependencies";
import { RouterReactRouter } from "../infrastructure/RouterReactRouter";
import { TokenRepositoryLocalStorage } from "../infrastructure/TokenRepositoryLocalStorage";
import { Login } from "../pages/Login";
import { Recipes } from "../pages/Recipes";

export const AppRoutes = () => {
  const container = new Container();
  container.bind("AuthService").toDynamicValue(() => new AuthServiceApi());
  container
    .bind("TokenRepository")
    .toDynamicValue(() => new TokenRepositoryLocalStorage());
  container
    .bind("Router")
    .toDynamicValue(() => new RouterReactRouter(useNavigate));

  return (
    <ContainerProvider container={container}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/recipes" element={<Recipes />} />
      </Routes>
    </ContainerProvider>
  );
};
