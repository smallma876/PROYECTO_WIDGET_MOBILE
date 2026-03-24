import React, { createContext, useContext } from 'react';

import { Container } from './container';

const ContainerContext = createContext<Container | null>(null);

interface ContainerProviderProps {
  container: Container;
  children: React.ReactNode;
}

export function ContainerProvider({ container, children }: ContainerProviderProps): React.JSX.Element {
  return (
    <ContainerContext.Provider value={container}>
      {children}
    </ContainerContext.Provider>
  );
}

export function useAppContainer(): Container {
  const container = useContext(ContainerContext);
  if (!container) {
    throw new Error('useAppContainer must be used within a ContainerProvider');
  }
  return container;
}
