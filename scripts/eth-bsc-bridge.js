const Web3 = require("web3");
const BridgeEth = require("../build/contracts/BridgeEth.json");
const BridgeBsc = require("../build/contracts/BridgeBsc.json");

// Instantiating web3 object with the Ethereum network's WebSocket URL
const web3Eth = new Web3(
  "wss://goerli.infura.io/ws/v3/685daa6fa7f94b4b89cdc6d7c5a8639e"
);

// Instantiating web3 object with the Binance Smart Chain network's RPC URL
const web3Bsc = new Web3("https://data-seed-prebsc-1-s3.binance.org:8545");

// The private key of the wallet to be used as the admin address
const adminPrivKey = "";

// Deriving the public address of the wallet using the private key
const { address: admin } = web3Bsc.eth.accounts.wallet.add(adminPrivKey);

// Instantiating the BridgeEth contract with its ABI and address
const bridgeEth = new web3Eth.eth.Contract(
  BridgeEth.abi,
  BridgeEth.networks["5"].address
);

// Instantiating the BridgeBsc contract with its ABI and address
const bridgeBsc = new web3Bsc.eth.Contract(
  BridgeBsc.abi,
  BridgeBsc.networks["97"].address
);

// Listening to Transfer events emitted by the BridgeEth contract
console.log("Listening to the events....");
bridgeEth.events
  .Transfer({ fromBlock: 0, step: 0 })
  .on("data", async (event) => {
    // Destructuring the values from the event
    const { from, to, amount, date, nonce, signature } = event.returnValues; // Defining the method to be called on the BridgeBsc contract
    const tx = bridgeBsc.methods.mint(from, to, amount, nonce, signature);

    // Getting the gas price and gas cost required for the method call
    const [gasPrice, gasCost] = await Promise.all([
      web3Bsc.eth.getGasPrice(),
      tx.estimateGas({ from: admin }),
    ]);

    // Encoding the ABI of the method
    const data = tx.encodeABI();

    // Preparing the transaction data
    const txData = {
      from: admin,
      to: bridgeBsc.options.address,
      data,
      gas: gasCost,
      gasPrice,
    };

    // Sending the transaction to the Binance Smart Chain
    const receipt = await web3Bsc.eth.sendTransaction(txData);

    // Logging the transaction hash
    console.log(`Transaction hash: ${receipt.transactionHash}`);

    // Logging the details of the processed transfer
    console.log(`
Processed transfer:
- from ${from} 
- to ${to} 
- amount ${amount} tokens
- date ${date}
- nonce ${nonce}
`);
  });
