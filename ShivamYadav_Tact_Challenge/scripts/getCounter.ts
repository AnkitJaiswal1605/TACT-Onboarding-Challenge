import { CounterContract } from "../wrappers/CounterContract";
import { NetworkProvider } from "@ton-community/blueprint";

export async function run(provider: NetworkProvider) {
    const counterContract = provider.open(await CounterContract.fromInit(36427n));
    const counter = await counterContract.getCounter()
    const id = await counterContract.getId()
    console.log(`Counter : ${counter}, Id : ${id}`)
    
}