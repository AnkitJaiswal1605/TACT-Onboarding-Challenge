# Counter_Tutorial

## Project structure

-   `contracts` - source code of all the smart contracts of the project and their dependencies.
-   `wrappers` - wrapper classes (implementing `Contract` from ton-core) for the contracts, including any [de]serialization primitives and compilation functions.
-   `tests` - tests for the contracts.
-   `scripts` - scripts used by the project, mainly the deployment scripts.

## How to use
## Deploy Details [Complete Chanllenge]
- Contract deployed at address EQB09q-Fn56iPCLwuaDbJA-RZal3wUgai9gzrgjJ8LtwJhw2
- You can view it at https://testnet.tonscan.org/address/EQB09q-Fn56iPCLwuaDbJA-RZal3wUgai9gzrgjJ8LtwJhw2

### Build

`npx blueprint build` or `yarn blueprint build`

### Test

`npx blueprint test` or `yarn blueprint test`

### Deploy or run another script

`npx blueprint run` or `yarn blueprint run`

### Add a new contract

`npx blueprint create ContractName` or `yarn blueprint create ContractName`
