# Project Write-Up

## Ethereum Dapp for Tracking Items through Supply Chain

### The contract address

Deployed to Sepolia network. See log output:

```
> truffle migrate --network sepolia --reset


Compiling your contracts...
===========================
> Everything is up to date, there is nothing to compile.


Starting migrations...
======================
> Network name:    'sepolia'
> Network id:      11155111
> Block gas limit: 30000000 (0x1c9c380)


1_initial_migration.js
======================

   Replacing 'Migrations'
   ----------------------
   > transaction hash:    0xe8e0f90cfcdd7d139484b4d3535c315e76d200135f943c2804d7e674af4e4f8c
   > Blocks: 1            Seconds: 17
   > contract address:    0x6f876ab9D80e220bf3869E39C72700de7D8cfC13
   > block number:        2825659
   > block timestamp:     1675440804
   > account:             0xA611dBB7cb0026020345F17Df30F9A2eaa9FF7E0
   > balance:             0.449836676234339737
   > gas used:            274088 (0x42ea8)
   > gas price:           2.500000007 gwei
   > value sent:          0 ETH
   > total cost:          0.000685220001918616 ETH

   Pausing for 2 confirmations...

   -------------------------------
   > confirmation number: 1 (block: 2825660)
   > confirmation number: 2 (block: 2825661)
   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:     0.000685220001918616 ETH


2_deploy_contracts.js
=====================

   Deploying 'FarmerRole'
   ----------------------
   > transaction hash:    0x29f254d6a01438563363dfa45ffc11274d2c8151513f6de70268e767cc3668ca
   > Blocks: 1            Seconds: 8
   > contract address:    0x7Bc5855e5b2B5cBC30e1DfbEc7Ac212Cc41Eb3Fa
   > block number:        2825664
   > block timestamp:     1675440876
   > account:             0xA611dBB7cb0026020345F17Df30F9A2eaa9FF7E0
   > balance:             0.448800076231437257
   > gas used:            368705 (0x5a041)
   > gas price:           2.500000007 gwei
   > value sent:          0 ETH
   > total cost:          0.000921762502580935 ETH

   Pausing for 2 confirmations...

   -------------------------------
   > confirmation number: 1 (block: 2825665)
   > confirmation number: 2 (block: 2825666)

   Deploying 'DistributorRole'
   ---------------------------
   > transaction hash:    0x3d4a22552d74ecef35ae71f1a044f65f5f1f131daca0dac155b8288cd74d8474
   > Blocks: 1            Seconds: 16
   > contract address:    0x72E65F0508Bbe0e512e0c5437be8A39251901312
   > block number:        2825668
   > block timestamp:     1675440924
   > account:             0xA611dBB7cb0026020345F17Df30F9A2eaa9FF7E0
   > balance:             0.447878163728855902
   > gas used:            368765 (0x5a07d)
   > gas price:           2.500000007 gwei
   > value sent:          0 ETH
   > total cost:          0.000921912502581355 ETH

   Pausing for 2 confirmations...

   -------------------------------
   > confirmation number: 1 (block: 2825669)
   > confirmation number: 2 (block: 2825670)

   Deploying 'RetailerRole'
   ------------------------
   > transaction hash:    0xe670b701650c16731ca71ce1c5beb0642e8dd93f0c1bd46c3e4cb46c45985fc5
   > Blocks: 1            Seconds: 16
   > contract address:    0x8EADFAC8554314E8E5Ca2DB4194cC26D7EB59580
   > block number:        2825672
   > block timestamp:     1675440972
   > account:             0xA611dBB7cb0026020345F17Df30F9A2eaa9FF7E0
   > balance:             0.446956251226274547
   > gas used:            368765 (0x5a07d)
   > gas price:           2.500000007 gwei
   > value sent:          0 ETH
   > total cost:          0.000921912502581355 ETH

   Pausing for 2 confirmations...

   -------------------------------
   > confirmation number: 1 (block: 2825673)
   > confirmation number: 2 (block: 2825674)

   Deploying 'ConsumerRole'
   ------------------------
   > transaction hash:    0x48969a163d7fade4ed0567fdb2e85afbc7fd026f44aeeb314c8ccbf5843a2d9a
   > Blocks: 1            Seconds: 16
   > contract address:    0xeB38CC880816D08F49B8ed3cd6E198Df18dB7e70
   > block number:        2825676
   > block timestamp:     1675441020
   > account:             0xA611dBB7cb0026020345F17Df30F9A2eaa9FF7E0
   > balance:             0.446034428723693444
   > gas used:            368729 (0x5a059)
   > gas price:           2.500000007 gwei
   > value sent:          0 ETH
   > total cost:          0.000921822502581103 ETH

   Pausing for 2 confirmations...

   -------------------------------
   > confirmation number: 1 (block: 2825677)
   > confirmation number: 2 (block: 2825678)

   Deploying 'SupplyChain'
   -----------------------
   > transaction hash:    0xdfafc1bcceac5e83da5100d34c0484e7021b73fe30bcde037c9296f10e53edde
   > Blocks: 1            Seconds: 16
   > contract address:    0x6b074B2C3EBa7F760E551D2F9C095050BB49fbE1
   > block number:        2825680
   > block timestamp:     1675441068
   > account:             0xA611dBB7cb0026020345F17Df30F9A2eaa9FF7E0
   > balance:             0.438660491203046419
   > gas used:            2949575 (0x2d01c7)
   > gas price:           2.500000007 gwei
   > value sent:          0 ETH
   > total cost:          0.007373937520647025 ETH

   Pausing for 2 confirmations...

   -------------------------------
   > confirmation number: 1 (block: 2825681)
   > confirmation number: 2 (block: 2825682)
   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:     0.011061347530971773 ETH

Summary
=======
> Total deployments:   6
> Final cost:          0.011746567532890389 ETH
```

### If libraries were used, include why these libraries were adopted.

* `@truffle/hdwallet-provider` and `dotenv` for deploying the contracts using personal credentials,
* `truffle-assertions` to fix tests after upgrading to latest truffle suite and solidity (asserting events).

### If IPFS is used, include how IPFS is used in this project.

Not used.

### Program version numbers (This information will help your reviewer troubleshoot your project if any issues arise):

* `Node v16.19.0`
* `Truffle v5.7.5`
* `web3`: added specific minified version from https://knowledge.udacity.com/questions/878475 to `/src` to fix broken boilerplate.

Please switch to Node v16 and install npm dependencies via `npm i` and use truffle from dev dependencies, e.g.:

```
npm run truffleDevelop

npm run truffleCompile

npm run truffleMigrate

```

