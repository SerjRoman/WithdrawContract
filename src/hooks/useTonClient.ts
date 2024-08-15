import { getHttpEndpoint } from "@orbs-network/ton-access";
import { TonClient } from "@ton/ton";
import { useAsyncInitialise } from "./useAsyncInitialise";

export function useTonClient() {
	return useAsyncInitialise(
		async () =>
			new TonClient({
				endpoint: await getHttpEndpoint({
					network: "testnet",
				}),
			})
	);
}
