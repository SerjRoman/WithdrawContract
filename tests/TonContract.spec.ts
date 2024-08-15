import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { fromNano, toNano } from '@ton/core';
import { TonContract } from '../wrappers/TonContract';
import '@ton/test-utils';

describe('TonContract', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let tonContract: SandboxContract<TonContract>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        tonContract = blockchain.openContract(await TonContract.fromInit(1000n));

        deployer = await blockchain.treasury('deployer');

        const deployResult = await tonContract.send(
            deployer.getSender(),
            {
                value: toNano('0.05'),
            },
            {
                $$type: 'Deploy',
                queryId: 0n,
            },
        );

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: tonContract.address,
            deploy: true,
            success: true,
        });
        const sendResult = await tonContract.send(
            deployer.getSender(),
            {
                value: toNano('1000'),
            },
            null,
        );
    });

    it('should deploy and receive ton', async () => {
        const balance = await tonContract.getBalance();
        console.log('Balance - ',balance);
    });
    it('should withdraw', async () => {
        console.log("Balance before withdraw -  ", fromNano(await deployer.getBalance()))

        const withdrawResult = await tonContract.send(
            deployer.getSender(),
            {
                value: toNano('0.02'),
            },
            {
                $$type: 'Withdraw',
                amount: toNano('100'),
            },
        );
        const contractBalance = await tonContract.getBalance()
        console.log("Contract balance after withdraw", contractBalance)
        console.log("Balance after withdraw -  ", fromNano(await deployer.getBalance()))
    });
});
