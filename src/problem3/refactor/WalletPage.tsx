import React from "react";
import { BoxProps } from "@mui/material";
import { useProcessedWallets } from "../hooks/useProcessedWallets";
import { WalletRow } from "./WalletRow";
import classes from "./WalletPage.module.css";

interface Props extends BoxProps {}

export const WalletPage: React.FC<Props> = (props: Props) => {
	const { ...rest } = props;
	const balances = useProcessedWallets();

	return (
		<div {...rest}>
			{balances.map((balance) => (
				<WalletRow
					key={balance.currency}
					className={classes.row}
					amount={balance.amount}
					usdValue={balance.usdValue}
					formattedAmount={balance.formatted}
				/>
			))}
		</div>
	);
};
