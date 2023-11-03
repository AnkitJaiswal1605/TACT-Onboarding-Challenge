import { toNano } from 'ton-core';
import { AnotherContract } from '../wrappers/AnotherContract';
import { NetworkProvider } from '@ton-community/blueprint';

export async function run(provider: NetworkProvider) {
    const anotherContract = provider.open(await AnotherContract.fromInit(BigInt(Math.floor(Math.random() * 10000))));

    await anotherContract.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );

    await provider.waitForDeploy(anotherContract.address);

    console.log('ID', await anotherContract.getId());
}
