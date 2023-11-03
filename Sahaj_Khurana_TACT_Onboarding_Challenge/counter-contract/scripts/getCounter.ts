import { SmartContract } from '../wrappers/SmartContract';
import {NetworkProvider} from '@ton-community/blueprint';

export async function run(provider: NetworkProvider) {
    const smartContract = provider.open(await SmartContract.fromInit(36427n));

    const counter = await smartContract.getCounter()
    const id = await smartContract.getId()

    console.log(`Counter : ${counter}, Id : ${id}`)
}