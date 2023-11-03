# CounterTutorial
Contract Depplyed at address: `EQCsjPdU3EHBACK9b100hrDgirSkJbN1d4ZU_mF54tPeWe8K`

You can checkout here: [https://testnet.tonscan.org/address/EQCsjPdU3EHBACK9b100hrDgirSkJbN1d4ZU_mF54tPeWe8K](https://testnet.tonscan.org/address/EQCsjPdU3EHBACK9b100hrDgirSkJbN1d4ZU_mF54tPeWe8K)
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
