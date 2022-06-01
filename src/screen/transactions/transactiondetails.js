import { Box, Typography } from '@material-ui/core'
import React, { useContext } from 'react'
import { ExpenseTrackerContext } from "../../context/context";
import { incomeCategories, expenseCategories } from "../../constants/categories";
import formatDate from '../../constants/formatDate'
import { Slide } from '@material-ui/core'
import { IconContext } from "react-icons/lib";
import { v4 as uuid4 } from "uuid";

const TransactionDetails = (transactionId) => {
	const { transactions } = useContext(ExpenseTrackerContext);
	let selectedTransactionData = transactions.filter((item) => item.id === transactionId.transactionId)

	return (
		<>
			{selectedTransactionData.map((transaction) => (
				<Slide direction="right" in mountOnEnter unmountOnExit key={transaction.id}>
					<Box display="flex" alignItems="center">
						<Box>
							{
								(transaction.type === "Income" ? incomeCategories : expenseCategories)
									.filter((item) => item.type === transaction.category)
									.map((item) => (
										<Box key={uuid4()}>
											<IconContext.Provider value={{ style: { width: "35px", height: "35px", marginRight: "15px", }, }}>
												{item.icon}
											</IconContext.Provider>
										</Box>
									))
							}
						</Box>
						<Box display="flex" flexDirection="column" ml="10px">
							<Box>
								{transaction.category}
							</Box>
							<Box>
								{`${formatDate(transaction.date).dayOnDate}, ${[formatDate(transaction.date).day, formatDate(transaction.date).monthLong, formatDate(transaction.date).year].join('/')}`}
							</Box>
							<Box>
								{`$${transaction.amount}`}
							</Box>
						</Box>
					</Box>
				</Slide>
			))}
			{selectedTransactionData.length === 0 ? (
				<Box display="flex" flexDirection="column" alignItems="center">
					<Typography variant="h5" align="center" color="textSecondary">Select a transaction for details</Typography>
				</Box>
			) : null}

		</>
	)
}

export default TransactionDetails
