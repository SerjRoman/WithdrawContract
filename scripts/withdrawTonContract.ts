import { toNano } from '@ton/core';
import { TonContract } from '../wrappers/TonContract';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const tonContract = provider.open(await TonContract.fromInit(54321n));

    await tonContract.send(
        provider.sender(),
        {
            value: toNano('0.2'),
        },
        {
            $$type: 'Withdraw',
            amount: toNano('0.5'),
        },
    );
}
