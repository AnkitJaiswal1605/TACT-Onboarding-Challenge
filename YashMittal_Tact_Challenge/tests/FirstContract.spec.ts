import { Blockchain, SandboxContract, TreasuryContract } from '@ton-community/sandbox';
import { toNano } from 'ton-core';
import { FirstContract } from '../wrappers/FirstContract';
import '@ton-community/test-utils';

describe('FirstContract', () => {
    let blockchain: Blockchain;
    let firstContract: SandboxContract<FirstContract>;
    let deployer: SandboxContract<TreasuryContract>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        firstContract = blockchain.openContract(await FirstContract.fromInit(12576n));

        deployer = await blockchain.treasury('deployer');

        const deployResult = await firstContract.send(
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
            to: firstContract.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and firstContract are ready to use
    });

    it('should increment', async () => {
        const counterBefore = await firstContract.getCounter()
        console.log("counterBefore : ", counterBefore)

        await firstContract.send(
            deployer.getSender(),
            {
                value: toNano('0.05'),
            },
            "increment"
        );

        const counterAfter = await firstContract.getCounter()
        console.log("counterAfter : ", counterAfter)

        expect(counterBefore).toBeLessThan(counterAfter)
    })
});