import { toNano } from 'ton-core';
import { CounterContract } from '../wrappers/Countercontract';
import { NetworkProvider } from '@ton-community/blueprint';

export async function run(provider: NetworkProvider) {
    const countercontract = provider.open(await CounterContract.fromInit(36427n));

    await countercontract.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );

    await provider.waitForDeploy(countercontract.address);

    // run methods on `countercontract`
}
