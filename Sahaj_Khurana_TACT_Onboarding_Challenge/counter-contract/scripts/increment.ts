import { toNano } from 'ton-core';
import { SmartContract } from '../wrappers/SmartContract';
import {NetworkProvider} from '@ton-community/blueprint';

export async function run(provider: NetworkProvider) {
    const smartContract = provider.open(await SmartContract.fromInit(36427n));

    await smartContract.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        "increment"
    );
}    