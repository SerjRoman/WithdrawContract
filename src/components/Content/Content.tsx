import { ReactNode, useEffect, useState } from "react";
import * as styles from "./Content.module.css";
import { useTonAddress } from "@tonconnect/ui-react";
import { useWithdrawContract } from "../../hooks/useWithdrawContract";
import { useTonConnect } from "../../hooks/useTonConnect";
import { Address, fromNano, toNano } from "@ton/ton";
import { useTonClient } from "../../hooks/useTonClient";
interface ContentProps {
	children?: ReactNode;
}

export default function Content(props: ContentProps) {
	const { children } = props;

	const userAddress = useTonAddress(true);
    // contract 
	const contract = useWithdrawContract();
	const { sender, connector } = useTonConnect();
    // get wallet client
	const client = useTonClient();
	const [balance, setBalance] = useState<string>("");

    // useEffect to get user Balance. Logic kind of wrong, works only after reloading
	useEffect(() => {
		if (!userAddress) {
			setBalance("");
			return;
		}
		const getUserBalance = async () => {
			const userBalance = await client?.getBalance(
				Address.parse(userAddress)
			);
			if (!userBalance) return;
			setBalance(fromNano(userBalance));
		};
		getUserBalance();
	}, [userAddress, client]);
    // products list
	const products = [
		{
			name: "Product1",
			price: 1,
			id: 1,
		},
		{
			name: "Product2",
			price: 0.3,
			id: 2,
		},
		{
			name: "Product3",
			price: 0.5,
			id: 3,
		},
		{
			name: "Product4",
			price: 0.5,
			id: 4,
		},
		{
			name: "Product5",
			price: 0.5,
			id: 5,
		},
		{
			name: "Product6",
			price: 0.4,
			id: 6,
		},
		{
			name: "Product7",
			price: 0.3,
			id: 7,
		},
	];
	function handleClick(event: any) {
		async function buyProduct() {
			if (!sender || !contract.address) return;
			const transaction = await sender.send({
				value: toNano(event.target.id),
				to: contract.address,
			});
            // handle transaction errors
			connector.onStatusChange((walletInfo) => {
				console.log(`walletInfo: ${walletInfo}`);
			});
		}
		buyProduct();
	}
	return (
		<div className={styles.Content}>
			<h2>
				Wallet Address:{" "}
				{userAddress ? userAddress : " "}
			</h2>
			<h2>Wallet Balance: {balance}</h2>
			<div className={styles.Products}>
				{products.map((product) => {
					return (
						<div
							className={styles.Product}
							key={product.id}
						>
							<h1>{product.name}</h1>
							<p>
								Price: {product.price} TON
							</p>

							<button
								className={styles.Buy}
								onClick={handleClick}
								id={product.price.toString()}
								disabled={
									userAddress
										? false
										: true
								}
							>
								Buy me
							</button>
						</div>
					);
				})}
			</div>

			{children}
		</div>
	);
}
