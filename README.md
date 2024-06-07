# Chatter

## Local Environment

### Run a node
```shell
npx hardhat node
```

### Deploy contract in local node
```shell
npx hardhat ignition deploy ./ignition/modules/Lock.ts --network localhost
```

> [!NOTE]
> Import accounts to metamask using private key

## Deploy to testnet

```ts
import { HardhatUserConfig, vars } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const OWNER_PRIVATE_KEY = vars.get("OWNER_PRIVATE_KEY");
const ALCHEMY_API_KEY = vars.get("ALCHEMY_API_KEY");
const ETHERSCAN_API_KEY = vars.get("ETHERSCAN_API_KEY");

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  networks: {
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
      accounts: [OWNER_PRIVATE_KEY],
    },
  },
  etherscan: {
    apiKey: {
      sepolia: ETHERSCAN_API_KEY,
    },
  },
};

export default config;
```

```shell
npx hardhat ignition deploy ignition/modules/Lock.ts --network sepolia --verify
```