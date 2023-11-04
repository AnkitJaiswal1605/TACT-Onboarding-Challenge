# _PranshuGupta_Tact_Challenge_

-   `deployed contract address` - UQCTkeA3wVwKrPIBYsqIC-Lb_kcm1bloLTuoqgyd0rTgo7GB /  EQBjYTzTpyTyRuUyfkZhpdO2FO8wK-EpWH5VY4o5qQUe3Kfq

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
