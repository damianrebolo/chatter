'use client';

import { useLogout, useSmartAccountClient, useUser } from '@alchemy/aa-alchemy/react';
import { accountType } from '@/config/alchemy';
import JazziconImage from './Icon';
import { Hex } from 'viem';

export const ProfileCard = () => {
  const user = useUser();
  const { address, isLoadingClient } = useSmartAccountClient({
    type: accountType
  });
  const { logout } = useLogout();

  function shortenAddress(address: string) {
    return `${address.slice(0, 2)}...${address.slice(-4)}`;
  }

  if (isLoadingClient) {
    return null;
  }
  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex items-center gap-3">
        <JazziconImage address={address as Hex} className="h-6 w-6 rounded-full" />
        <div className="text-md">{shortenAddress(address as Hex)}</div>
      </div>
      <div className="flex items-center gap-3">
        <div className="text-md">{user?.email?.split('@')[0]}</div>
        <button className="text-md rounded-lg border border-cyan-800 p-1 font-semibold" onClick={() => logout()}>
          Logout
        </button>
      </div>
    </div>
  );
};
