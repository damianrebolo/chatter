import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";

import { cookieStorage, createStorage } from "wagmi";
import { mainnet, sepolia, Chain } from "wagmi/chains";

// Get projectId at https://cloud.walletconnect.com
export const projectId = "cfb91b538070178dfeafb31e20837b58";
// export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;

if (!projectId) throw new Error("Project ID is not defined");

const metadata = {
  name: "Chatter",
  description: "Web3Modal Example",
  url: "https://web3modal.com", // origin must match your domain & subdomain
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

const localhost: Chain = {
  id: 31337,
  name: "Localhost",
  nativeCurrency: {
    decimals: 18,
    name: "tETH",
    symbol: "tETH",
  },
  rpcUrls: {
    public: { http: ["http://localhost:8545"] },
    default: { http: ["http://localhost:8545"] },
  },
  testnet: true,
};

// Create wagmiConfig
const chains = [localhost] as const;
export const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
});
