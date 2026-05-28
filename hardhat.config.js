require("@nomicfoundation/hardhat-toolbox");
require("@openzeppelin/hardhat-upgrades");
require("dotenv").config();

const alchemyApiKey = process.env.ALCHEMY_API_KEY || "";

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.28",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    hardhat: {},
    localhost: {
      url: "http://127.0.0.1:8545",
    },
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${alchemyApiKey}`,
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
    },
    base: {
      url: `https://base-mainnet.g.alchemy.com/v2/${alchemyApiKey}`,
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      chainId: 8453,
    },
    baseSepolia: {
      url: `https://base-sepolia.g.alchemy.com/v2/${alchemyApiKey}`,
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      chainId: 84532,
      ignoreUnknownTxType: true,
    },
    bsc: {
      url: `https://bnb-mainnet.g.alchemy.com/v2/${alchemyApiKey}`,
      accounts: process.env.PRIVATE_KEY_2 ? [process.env.PRIVATE_KEY_2] : [],
      chainId: 56,
    },
    bscTestnet: {
      url: `https://bnb-testnet.g.alchemy.com/v2/${alchemyApiKey}`,
      accounts: process.env.PRIVATE_KEY_2 ? [process.env.PRIVATE_KEY_2] : [],
      chainId: 97,
      ignoreUnknownTxType: true,
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
    customChains: [
      {
        network: "baseSepolia",
        chainId: 84532,
        urls: {
          apiURL: "https://api.etherscan.io/v2/api?chainid=84532",
          browserURL: "https://sepolia.basescan.org",
        },
      },
    ],
  },
};
