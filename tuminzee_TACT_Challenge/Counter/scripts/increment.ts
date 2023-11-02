import { toNano, Address } from 'ton-core';
import { Counter } from '../wrappers/Counter';
import { NetworkProvider } from '@ton-community/blueprint';

export async function run(provider: NetworkProvider, args: string[]) {
    const ui = provider.ui();

    const address = Address.parse(args.length > 0 ? args[0] : await ui.input('Counter address'));

    if (!(await provider.isContractDeployed(address))) {
        ui.write(`Error: Contract at address ${address} is not deployed!`);
        return;
    }

    const counter = provider.open(Counter.fromAddress(address));

    const countBefore = await counter.getCounter();

    console.log(`Counter at ${address} has value ${countBefore}`);



    await counter.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        "increment"
    );

    const countAfter = await counter.getCounter();

    console.log(`Counter at ${address} has value ${countAfter}`);

    
}
