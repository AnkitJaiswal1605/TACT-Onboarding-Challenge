// import { toNano } from 'ton-core';
import { CounterContract } from '../wrappers/CounterContract';
import { NetworkProvider } from '@ton-community/blueprint';

export async function run(provider: NetworkProvider) {
    const counterContract = provider.open(await CounterContract.fromInit());

    const value = await counterContract.getCounter();
    console.log(`Value: ${value}`);
    // run methods on `counterContract`
}
