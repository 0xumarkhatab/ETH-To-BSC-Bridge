const BridgeEth = artifacts.require("./BridgeEth.sol");

const privKey =
  "297b88a79adffda6a5e37e1cc34da8a29cd60d14f66c15f21006f39e0d69540a";

module.exports = async (done) => {
  const nonce = 1; //Need to increment this for each new transfer
  const accounts = await web3.eth.getAccounts();
  const bridgeEth = await BridgeEth.deployed();
  const amount = 1000;
  const message = web3.utils
    .soliditySha3(
      { t: "address", v: accounts[0] },
      { t: "address", v: accounts[0] },
      { t: "uint256", v: amount },
      { t: "uint256", v: nonce }
    )
    .toString("hex");
  const { signature } = web3.eth.accounts.sign(message, privKey);
  await bridgeEth.burn(accounts[0], amount, nonce, signature);
  done();
};
