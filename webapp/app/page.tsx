'use client';

import { Chatter } from '@/components/Chatter';
import { LogInCard } from '@/components/LoginCard';
import { LoadingSpinner } from '@/components/Spinner';
import { useSignerStatus } from '@alchemy/aa-alchemy/react';

export default function Home() {
  const { isInitializing, isAuthenticating, isConnected, status } = useSignerStatus();
  const isLoading = isInitializing || (isAuthenticating && status !== 'AWAITING_EMAIL_AUTH');

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!isLoading && !isConnected) {
    return <LogInCard />;
  }

  return <Chatter />;
}
