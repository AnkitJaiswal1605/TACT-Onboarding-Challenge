import { Blockchain, SandboxContract } from '@ton-community/sandbox';
import { toNano } from 'ton-core';
import { CounterTact } from '../wrappers/CounterTact';
import '@ton-community/test-utils';

describe('CounterTact', () => {
    let blockchain: Blockchain;
    let counterTact: SandboxContract<CounterTact>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        counterTact = blockchain.openContract(await CounterTact.fromInit());

        const deployer = await blockchain.treasury('deployer');

        const deployResult = await counterTact.send(
            deployer.getSender(),
            {
                value: toNano('0.05'),
            },
            {
                $$type: 'Deploy',
                queryId: 0n,
            }
        );

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: counterTact.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and counterTact are ready to use
    });
});
