import { Sender, SenderArguments } from "@ton/core";
import {
	ITonConnect,
	useTonConnectUI,
} from "@tonconnect/ui-react";
export function useTonConnect(): {
	sender: Sender;
	connected: boolean;
	address: string | undefined;
	connector: ITonConnect;
} {
	const [tonConnectUI] = useTonConnectUI();
	return {
		sender: {
			send: async (args: SenderArguments) => {
				tonConnectUI
					.sendTransaction({
						messages: [
							{
								address: args.to.toString(),
								amount: args.value.toString(),
								payload: args.body
									?.toBoc()
									.toString("base64"),
							},
						],
						validUntil:
							Date.now() + 5 * 60 * 1000,
					})
					.catch((error) => {
						console.log(error);
					});
			},
		},
		connected: tonConnectUI.connected,
		address: tonConnectUI.account?.address,
		connector: tonConnectUI.connector,
	};
}
