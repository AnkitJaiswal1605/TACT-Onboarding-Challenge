# TON-X

Connector for dApps for TON blockchain

Supported connectors:
* [Tonhub](https://tonhub.com) and [Sandbox Wallet](https://test.tonhub.com)
* Extension for [Tonhub](https://tonhub.com) and [Sandbox Wallet](https://test.tonhub.com)

```
yarn install ton-x
```

## Tonhub connector

Connecting app to a wallet:
1) Create session
2) Show user QR Code or link
3) Await session confirmation

### Create connector

```typescript
import { TonhubConnector } from 'ton-x';
const connector = new TonhubConnector({ testnet: true });
```

### Creating session

```typescript
let session: TonhubCreatedSession = await connector.createNewSession({
    name: 'Your app name',
    url: 'Your app url'
});

// Session ID, Seed and Auth Link
const sessionId = session.id;
const sessionSeed = session.seed;
const sessionLink = session.link;
```

### Await session confirmation

```typescript
const session: TonhubSessionAwaited = await connector.awaitSessionReady(sessionId, 5 * 60 * 1000); // 5 min timeout

if (session.state === 'revoked' || session.state === 'expired') {
    // Handle revoked or expired session
} else if (session.state === 'ready') {
    
    // Handle session
    const walletConfig: TonhubWalletConfig = session.walletConfig;
    
    // You need to persist this values to work with this connection:
    // * sessionId
    // * sessionSeed
    // * walletConfig

    // You can check signed wallet config on backend using TonhubConnector.verifyWalletConfig.
    // walletConfig is cryptographically signed for specific session and other parameters
    // you can safely use it as authentication proof without the need to sign something.
    const correctConfig: boolean = TonhubConnector.verifyWalletConfig(sessionId, walletConfig);

    // ...

} else {
    throw new Error('Impossible');
}
```

### Check session validity
After session established it is useful to check from time to time that session wasn't revoked

```typescript
const session: TonhubSessionState = await connector.getSessionState(sessionId);
```

### Request transaction

```typescript
// Request body
const request: TonhubTransactionRequest = {
    seed: sessionSeed, // Session Seed
    appPublicKey: walletConfig.appPublicKey, // Wallet's app public key
    to: 'EQCkR1cGmnsE45N4K0otPl5EnxnRakmGqeJUNua5fkWhales', // Destination
    value: '10000000000', // Amount in nano-tons
    timeout: 5 * 60 * 1000, // 5 minut timeout
    stateInit: '....', // Optional serialized to base64 string state_init cell
    text: 'Hello world', // Optional comment. If no payload specified - sends actual content, if payload is provided this text is used as UI-only hint
    payload: '....' // Optional serialized to base64 string payload cell
};
const response: TonhubTransactionResponse = await connector.requestTransaction(request);
if (response.type === 'rejected') {
    // Handle rejection
} else if (response.type === 'expired') {
    // Handle expiration
} else if (response.type === 'invalid_session') {
    // Handle expired or invalid session
} else if (response.type === 'success') {
    // Handle successful transaction
    const externalMessage = response.response; // Signed external message that was sent to the network
} else {
    throw new Error('Impossible');
}
```

### Request signature
In tonhub user user signs both text and binary payload, but only text is presented to the user. For future compatibility we recommend to prefix your cell binary payload with `0x00000000`.
```typescript

const payloadToSign = Buffer.concat([Buffer.from([0, 0, 0, 0]), Buffer.from('Some random string')]);
const payload = beginCell()
    .storeBuffer(payloadToSign)
    .endCell()
    .toBoc({idx:false})
    .toString('base64');
const text = 'Please, sign our terms or service and privacy policy';

// Request body
const request: TonhubSignRequest = {
    seed: sessionSeed, // Session Seed
    appPublicKey: walletConfig.appPublicKey, // Wallet's app public key
    timeout: 5 * 60 * 1000, // 5 minut timeout
    text: 'Hello world', // Text to sign, presented to the user.
    payload: payload // Optional serialized to base64 string payload cell
};
const response: TonhubSignResponse = await connector.requestSign(request);
if (response.type === 'rejected') {
    // Handle rejection
} else if (response.type === 'expired') {
    // Handle expiration
} else if (response.type === 'invalid_session') {
    // Handle expired or invalid session
} else if (response.type === 'success') {
    // Handle successful transaction
    const signature = response.signature;

    // You can check signature on the backend with TonhubConnector.verifySignatureResponse
    let correctSignature = TonhubConnector.verifySignatureResponse({ signature: signature, config: walletConfig });
} else {
    throw new Error('Impossible');
}
```

# License 
MIT