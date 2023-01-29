const HDWalletProvider = require("@truffle/hdwallet-provider");
const mnemonic =
  "dawn rent you scissors south abuse once violin unveil birth slice noise";

module.exports = {
  networks: {
    ethereum_testnet: {
      provider: () =>
        new HDWalletProvider(
          mnemonic,
          `https://goerli.infura.io/v3/685daa6fa7f94b4b89cdc6d7c5a8639e`,
          0,
          1
        ),
      network_id: 5, // Goerli's id
      chain_id: 5,
      skipDryRun: true,
    },
    bsc_testnet: {
      provider: () =>
        new HDWalletProvider(
          mnemonic,
          `https://data-seed-prebsc-1-s3.binance.org:8545`
        ),
      skipDryRun: true,
      network_id: 97, // Binance Snart Chain testnet's id
      chain_id: 97,
    },
  },

  // Set default mocha options here, use special reporters etc.
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.13", // Fetch exact version from solc-bin
    },
  },
};
