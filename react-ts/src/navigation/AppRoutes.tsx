import { Route, Routes, useNavigate } from "react-router-dom";

import { Container } from "inversify";
import { AuthServiceApi } from "../infrastructure/AuthServiceApi";
import {
  ContainerProvider,
} from "../infrastructure/dependencies/Dependencies";
import { RouterReactRouter } from "../infrastructure/RouterReactRouter";
import { TokenRepositoryLocalStorage } from "../infrastructure/TokenRepositoryLocalStorage";
import { Login } from "../pages/Login";
import { Recipes } from "../pages/Recipes";

export const AppRoutes = () => {
  const router = new RouterReactRouter(useNavigate());
  const authService = new AuthServiceApi();
  const tokenRepository = new TokenRepositoryLocalStorage();

  const container = new Container();
  container.bind("AuthService").toDynamicValue(() => authService);
  container.bind("TokenRepository").toDynamicValue(() => tokenRepository);
  container.bind("Router").toDynamicValue(() => router);


  return (
    <ContainerProvider container={container}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/recipes" element={<Recipes />} />
      </Routes>
    </ContainerProvider>
  );
};
