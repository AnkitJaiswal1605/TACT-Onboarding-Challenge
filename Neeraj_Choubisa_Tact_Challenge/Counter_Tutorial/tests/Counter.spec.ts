import { Blockchain, SandboxContract } from '@ton-community/sandbox';
import { toNano } from 'ton-core';
import { Counter } from '../wrappers/Counter';
import '@ton-community/test-utils';

describe('Counter', () => {
    let blockchain: Blockchain;
    let counter: SandboxContract<Counter>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        counter = blockchain.openContract(await Counter.fromInit());

        const deployer = await blockchain.treasury('deployer');

        const deployResult = await counter.send(
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
            to: counter.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and counter are ready to use
    });
});
