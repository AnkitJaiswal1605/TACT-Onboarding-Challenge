import { toNano } from 'ton-core';
import { KiddiesC } from '../wrappers/KiddiesC';
import { NetworkProvider } from '@ton-community/blueprint';

export async function run(provider: NetworkProvider) {
    const kiddiesC = provider.open(await KiddiesC.fromInit());

    await kiddiesC.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );

    await provider.waitForDeploy(kiddiesC.address);

    // run methods on `kiddiesC`
}
