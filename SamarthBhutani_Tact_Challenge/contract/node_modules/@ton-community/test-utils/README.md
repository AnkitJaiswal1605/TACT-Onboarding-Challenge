# test-utils

This package contains useful testing utilities, such as unit test matchers (for jest and chai) and other useful functions, such as `randomAddress`.

## Installation

```
yarn add @ton-community/test-utils -D
```
or
```
npm i --save-dev @ton-community/test-utils
```

## Usage

To use the test matchers, just install either jest or chai and import this package like so:
```typescript
import "@ton-community/test-utils";
```

### Transaction matcher notice

The transaction matcher (`.toHaveTransaction`) can only perform matching on transactions with descriptions of type `generic`. When matching an array of transactions, all transactions of other types will be filtered out. When matching a single transaction of non-generic type, an exception will be thrown.

## License

This package is released under the [MIT License](LICENSE).
