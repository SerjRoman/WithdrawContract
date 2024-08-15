import {
	Address,
	OpenedContract,
	Sender,
	toNano,
} from "@ton/ton";
import { useAsyncInitialise } from "./useAsyncInitialise";
import { useTonClient } from "./useTonClient";
import { TonContract } from "../contracts/TonContract";

export function useWithdrawContract() {
	const client = useTonClient();
    // Get instance of contract
	const withdrawContract =
		useAsyncInitialise(async () => {
			if (!client) return;
			const contract = new TonContract(
				Address.parse(
					process.env.CONTRACT_ADDRESS ?? ""
				)
			);
			return client.open(
				contract
			) as OpenedContract<TonContract>;
		}, [client]);
	return {
		address: withdrawContract?.address,
		withdraw: (sender: Sender) => {
			withdrawContract?.send(
				sender,
				{
					value: toNano("0.05"),
				},
				{
					$$type: "Withdraw",
					// Mistake in contract - will withdraw all money.
					// Field amount - useless
					amount: toNano("0.01"),
				}
			);
		},
	};
}
