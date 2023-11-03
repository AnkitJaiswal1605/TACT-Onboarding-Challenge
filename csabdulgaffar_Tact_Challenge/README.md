# Address: 
UQCn_NvM_pYnFjIQiz7lqSysRXpTkeu4Ye4JAy9vR4nUUMZJ
-Contract deployed at address UQCn_NvM_pYnFjIQiz7lqSysRXpTkeu4Ye4JAy9vR4nUUMZJ
You can view it at https://testnet.tonscan.org/address/UQCn_NvM_pYnFjIQiz7lqSysRXpTkeu4Ye4JAy9vR4nUUMZJ
## Project structure

-   `contracts` - source code of all the smart contracts of the project and their dependencies.
-   `wrappers` - wrapper classes (implementing `Contract` from ton-core) for the contracts, including any [de]serialization primitives and compilation functions.
-   `tests` - tests for the contracts.
-   `scripts` - scripts used by the project, mainly the deployment scripts.

## How to use

### Build

`npx blueprint build` or `yarn blueprint build`

### Test

`npx blueprint test` or `yarn blueprint test`

### Deploy or run another script

`npx blueprint run` or `yarn blueprint run`

### Add a new contract

`npx blueprint create ContractName` or `yarn blueprint create ContractName`
