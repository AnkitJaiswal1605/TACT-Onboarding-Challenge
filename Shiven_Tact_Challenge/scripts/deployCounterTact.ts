import { toNano } from 'ton-core';
import { CounterTact } from '../wrappers/CounterTact';
import { NetworkProvider } from '@ton-community/blueprint';

export async function run(provider: NetworkProvider) {
    const counterContract = provider.open(await CounterTact.fromInit(36427n));

    await counterContract.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );

    await provider.waitForDeploy(counterContract.address);

    // run methods on `counterContract`
}
