import React, { useContext } from 'react'
import { Grid } from '@material-ui/core';
import Details from './details';
import { ExpenseTrackerContext } from '../../context/context'
import PageTitle from '../../components/layout/pagetitle'
import { Box } from '@material-ui/core';
import ClosingBalances from './closingbalances'


export default function Dashboard() {

  const { balance } = useContext(ExpenseTrackerContext)

  return (
    <>

      <Box display="flex" alignItems="center" justifyContent="space-between">
        <PageTitle title="Dashboard" />
        <PageTitle title={`Total Balance : ${balance}`} />
      </Box>
      <Grid container spacing={1} alignItems="center" justify="space-around" direction="row">
        <Details title="Income" />
        <Details title="Expense" />
        <ClosingBalances />
      </Grid>
    </ >
  )
}
