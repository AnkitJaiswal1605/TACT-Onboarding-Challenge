import { Blockchain, SandboxContract, TreasuryContract} from '@ton-community/sandbox';
import { toNano } from 'ton-core';
import { SmartContract } from '../wrappers/SmartContract';
import '@ton-community/test-utils';

describe('SmartContract', () => {
    let blockchain: Blockchain;
    let smartContract: SandboxContract<SmartContract>;
    let deployer: SandboxContract<TreasuryContract>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        smartContract = blockchain.openContract(await SmartContract.fromInit(12576n));

        deployer = await blockchain.treasury('deployer');

        const deployResult = await smartContract.send(
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
            to: smartContract.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and smartContract are ready to use
    });

    it('should increment', async () => {
        
        const counterBefore = await smartContract.getCounter()
        console.log("counterBefore : ", counterBefore)

        await smartContract.send(
            deployer.getSender(),
            {
                value: toNano('0.05'),
            },
            "increment"
        );

        const counterAfter = await smartContract.getCounter()
        console.log("counterAfter : ", counterAfter)

        expect(counterBefore).toBeLessThan(counterAfter)
    });
});
