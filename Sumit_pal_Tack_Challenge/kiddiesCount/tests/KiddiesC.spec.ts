import { Blockchain, SandboxContract } from '@ton-community/sandbox';
import { toNano } from 'ton-core';
import { KiddiesC } from '../wrappers/KiddiesC';
import '@ton-community/test-utils';

describe('KiddiesC', () => {
    let blockchain: Blockchain;
    let kiddiesC: SandboxContract<KiddiesC>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        kiddiesC = blockchain.openContract(await KiddiesC.fromInit());

        const deployer = await blockchain.treasury('deployer');

        const deployResult = await kiddiesC.send(
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
            to: kiddiesC.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and kiddiesC are ready to use
    });

    it('should increment',async()=>{
        const conuterBefore = await  kiddiesC.getcountkiddie()
    });
});
