import { Blockchain, SandboxContract, TreasuryContract} from '@ton-community/sandbox';
import { toNano } from 'ton-core';
import { CounterContract } from '../wrappers/CounterContract';
import '@ton-community/test-utils';

describe('CounterContract', () => {
    let blockchain: Blockchain;
    let counterContract: SandboxContract<CounterContract>;
    let deployer: SandboxContract<TreasuryContract>
    beforeEach(async () => {
        blockchain = await Blockchain.create();

        counterContract = blockchain.openContract(await CounterContract.fromInit(12345n));

        deployer = await blockchain.treasury('deployer');
        // const deployer = await blockchain.treasury('deployer');

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

    it ('shoudl increment', async () => {
        const counterBefore = await counterContract.getCounter()
        console.log("counterBefore : ", counterBefore)

        await counterContract.send(
            deployer.getSender(),{
                value : toNano('0.05'),
            },
            "increment"
        );
        const counterAfter = await counterContract.getCounter()
        console.log("counterAfter : ",counterAfter)

        expect(counterBefore).toBeLessThan(counterAfter)
    })
});
