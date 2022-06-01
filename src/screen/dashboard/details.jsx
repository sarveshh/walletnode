import React from 'react'
import { Card, CardHeader, CardContent, Typography, Box } from '@material-ui/core'
import { Pie } from 'react-chartjs-2'
import useTransactions from '../../hooks/useTransactions'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    income: {
        borderBottom: '10px solid rgba(0, 255, 0, 0.5)'
    },
    expense: {
        borderBottom: '10px solid rgba(255, 0, 0, 0.5)'
    },
    incomeColor: {
        color: "#43a047",
        marginRight: theme.spacing(2)
    },
    expenseColor: {
        color: "#f44336",
        marginRight: theme.spacing(2)
    },
}));


const Details = ({ title }) => {

    const classes = useStyles()
    const { total, chartData } = useTransactions(title)

    return (
        <>
            <Box className={title === 'Income' ? classes.income : classes.expense} width="50%">
                <Card variant="outlined">
                    <Box display="flex" alignItems="center" justifyContent="space-between">
                        <CardHeader title={title} align="left" />
                        <Typography variant="h4" align="right" className={title === 'Income' ? classes.incomeColor : classes.expenseColor}>${total}</Typography>
                    </Box>
                    {total !== 0 ?
                        <CardContent className={classes.pie}>
                            <Pie data={chartData} height={300} options={{ maintainAspectRatio: false }} />
                        </CardContent> :
                        <CardContent>Please add transactions to show analysis</CardContent>
                    }
                </Card>
            </Box>
        </>
    )
}

export default Details
