# ETH-To-BSC-Bridge
This is a simple Ethereum to Binance Smart Chain Bridge for minting tokens across different chains on testnet

# How it Works?

We have two cross chain Smart contracts (Bridges)

- ETH Bridge
- BSC Bridge

We can transfer funds from one chain ( Bridge ) to other chain (Other Bridge).

From transferring from Eth to BSC , we burn tokens on Eth-bridge and mint on BSC-Bridge and vice verca.
There is a Bridge API script that runs 24/7.It has an event handler for burn on Transfer Event of ETH-Bridge (We can add for BSC-Bridge too).

Whenever burn happens on Eth-Bridge , Transfer Event is fired 
and the API catches it.
After API observe the burn event , it calls the mint function of the Binance Smart Chain Bridge and mint tokens there.


# Run it

      - Make Sure you have Installed Truffle Suit
      - Clone the repository using the command `git clone https://github.com/umaresso/ETH-To-BSC-Bridge` 
      - Open the newly created repository after cloning
      - In the Truffle config , enter your own mnemonic 
      - In the scripts and migration files , enter the private keys and mnemonic by your own testwallets
      - Run `npm install` in a new terminal by pressing ` CTRL+` `
      - Run following commands for deploying Both the Bridges

## Deploy Bridges

Deploy Ethereum Bridge `truffle migrate --network ethereum_testnet` 

The output will be like as follows

![image](https://user-images.githubusercontent.com/71306738/215405211-d1c6e150-1d69-4e4d-bf14-e1722520cfdd.png)
![image](https://user-images.githubusercontent.com/71306738/215405329-52ef3fc7-4a28-4a36-9555-50f1900184a8.png)



Deploy BSC Bridge `truffle migrate --network bsc_testnet` 

The output will be like as follows

![image](https://user-images.githubusercontent.com/71306738/215405502-9b06f0b3-603d-4750-8319-e5b07c95499a.png)

## Balance Check

Check the Token Balances again by running following Commands

ETH Token Balance of the User : `truffle exec scripts/eth-token-balance.js --network ethereum_testnet `

BSC Token Balance of the User : `truffle exec scripts/bsc-token-balance.js --network bsc_testnet `

## Run API for listening token Transfer Events

Time to run BSC Bridge for listening to the Burning event:

Type `node scripts/eth-bsc-bridge.js` in the terminal
![image](https://user-images.githubusercontent.com/71306738/215405761-e185dbf0-7db6-42af-a0cb-9ba799e4016f.png)

## Actual Transfer

Now Open Another terminal and Run `truffle exec scripts/eth-bsc-transfer.js --network ethereum_testnet`

Let the transaction be completed.

Open the first terminal and you will see something like this 

![image](https://user-images.githubusercontent.com/71306738/215406032-2f830e3c-f85b-4571-b213-2d8ba64ec4c7.png)


## Recheck Balances

Check the Token Balances again by running following Commands

ETH Token Balance of the User : `truffle exec scripts/eth-token-balance.js --network ethereum_testnet `

BSC Token Balance of the User : `truffle exec scripts/bsc-token-balance.js --network bsc_testnet `

