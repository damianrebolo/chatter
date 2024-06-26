import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from '@/context/Provider';
import { cookieToInitialState } from '@alchemy/aa-alchemy/config';
import { headers } from 'next/headers';
import { config } from '@/config/alchemy';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AA - Chatter',
  description: 'Chatter app sponsored by ME'
};

// [!region root-layout]
export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  // hydrate the initial state on the client
  const initialState = cookieToInitialState(config, headers().get('cookie') ?? undefined);

  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers initialState={initialState}>
          <main className="m-auto flex max-h-screen min-h-screen max-w-screen-sm flex-col items-center justify-between p-2">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
