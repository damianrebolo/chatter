'use client';

import { PropsWithChildren } from 'react';
import { WagmiProvider } from 'wagmi';
import { AlchemyAccountProvider, AlchemyAccountsProviderProps } from '@alchemy/aa-alchemy/react';
import { config, queryClient } from '@/config/alchemy';
import { wagmiConfig } from '@/config/wagmi';

// [!region providers]
export const Providers = ({
  initialState,
  children
}: PropsWithChildren<{
  initialState?: AlchemyAccountsProviderProps['initialState'];
}>) => {
  return (
    <WagmiProvider config={wagmiConfig}>
      <AlchemyAccountProvider config={config} queryClient={queryClient} initialState={initialState}>
        {children}
      </AlchemyAccountProvider>
    </WagmiProvider>
  );
};
