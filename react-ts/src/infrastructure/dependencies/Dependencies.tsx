import { createContext, ReactNode, useContext } from "react";
import { interfaces } from "inversify";

export const ContainerContext = createContext<interfaces.Container | null>(
  null
);

// eslint-disable-next-line react-refresh/only-export-components
export function useContainerContext() {
  const container = useContext(ContainerContext);

  if (!container) {
    throw new Error("ContainerContext must be inside a ContainerProvider");
  }

  return container;
}

export type ContainerProviderProps = {
  container: interfaces.Container;
  children: ReactNode;
};

export function ContainerProvider(props: ContainerProviderProps) {
  const { container, children } = props;
  return (
    <ContainerContext.Provider value={container}>
      {children}
    </ContainerContext.Provider>
  );
}
