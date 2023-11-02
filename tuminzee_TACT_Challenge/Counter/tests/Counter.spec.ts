import { Blockchain, SandboxContract, TreasuryContract } from '@ton-community/sandbox';
import { toNano } from 'ton-core';
import { Counter } from '../wrappers/Counter';
import '@ton-community/test-utils';

describe('CounterContract', () => {
    let blockchain: Blockchain;
    let counterContract: SandboxContract<Counter>;
    let deployer: SandboxContract<TreasuryContract>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();
        const id = BigInt(Math.floor(Date.now() / 1000));
        counterContract = blockchain.openContract(await Counter.fromInit(id));

        deployer = await blockchain.treasury('deployer');

        const deployResult = await counterContract.send(
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
            to: counterContract.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and counterContract are ready to use
    });


    it('should increment', async () => {
        // the check is done inside beforeEach
        // blockchain and counterContract are ready to use
        const countBefore = await counterContract.getCounter()
        console.log("counterBefore: ", countBefore)

        await counterContract.send(
            deployer.getSender(),
            {
                value: toNano('0.05'),
            },
            "increment"
        );

        const counterAfter = await counterContract.getCounter()
        console.log("counterAfter: ", counterAfter)

        expect(countBefore).toBeLessThan(counterAfter)
    });
});