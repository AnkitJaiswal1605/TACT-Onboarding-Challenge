import { toNano } from 'ton-core';
import { CounterContract } from '../wrappers/CounterContract';
import { NetworkProvider } from '@ton-community/blueprint';

export async function run(provider: NetworkProvider) {
    const counterContract = provider.open(await CounterContract.fromInit(BigInt(Math.floor(Math.random() * 10000))));

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

    console.log('ID', await counterContract.getId());
}
