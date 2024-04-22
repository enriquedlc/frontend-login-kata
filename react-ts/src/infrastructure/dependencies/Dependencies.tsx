import { createContext, ReactNode, useContext } from "react";
import { AuthService } from "../AuthService";
import { Router } from "../Router";
import { TokenRepository } from "../TokenRepository";

export type Dependencies = {
  authService: AuthService;
  tokenRepository: TokenRepository;
  router: Router;
};

export const DependenciesContext = createContext<Dependencies | null>(null);

export function useDependenciesContext() {
  const dependencies = useContext(DependenciesContext);

  if (!dependencies) {
    throw new Error(
      "DependenciesContext must be inside a DependenciesProvider"
    );
  }

  return { dependencies };
}

export type DependenciesProviderProps = {
  dependencies: Dependencies;
  children: ReactNode;
};

export function DependenciesProvider(props: DependenciesProviderProps) {
  const { dependencies, children } = props;
  return (
    <DependenciesContext.Provider value={dependencies}>
      {children}
    </DependenciesContext.Provider>
  );
}
