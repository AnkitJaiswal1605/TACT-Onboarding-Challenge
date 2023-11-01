import { toNano } from 'ton-core';
import { Counter } from '../wrappers/Counter';
import { NetworkProvider } from '@ton-community/blueprint';

export async function run(provider: NetworkProvider) {
    const counter = provider.open(await Counter.fromInit());

    await counter.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );

    await provider.waitForDeploy(counter.address);

    // run methods on `counter`
}
