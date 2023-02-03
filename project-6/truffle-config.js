const dotenv = require('dotenv');

dotenv.config();
dotenv.config({ path: '.env.local', override: true });

const { mnemonic, infuraKey } = process.env;

const HDWalletProvider = require('@truffle/hdwallet-provider');

module.exports = {
  networks: {
    develop: {
      host: "127.0.0.1",
      port: 9545,
      network_id: "*" // Match any network id
    },
    sepolia: {
      provider: () => new HDWalletProvider({
        mnemonic,
        providerOrUrl: `https://sepolia.infura.io/v3/${infuraKey}`,
        pollingInterval: 8000
      }),
      network_id: 11155111,
      confirmations: 2,
      timeoutBlocks: 10000,
      skipDryRun: true,
      deploymentPollingInterval: 8000,
      networkCheckTimeout: 100000000
    }
  },
  compilers: {
    solc: {
      version: "0.8.17"
    }
  }
};