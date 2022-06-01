import React, { useContext } from "react";
import { Grid } from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import { ExpenseTrackerContext } from '../../context/context'

const columns = [
  {
    name: "type",
    label: "Type",
    options: {
      filter: true,
      sort: true,
    }
  },
  {
    name: "amount",
    label: "Amount",
    options: {
      filter: true,
      sort: true,
    }
  },
  {
    name: "category",
    label: "Category",
    options: {
      filter: true,
      sort: true,
    }
  },
  {
    name: "date",
    label: "Date",
    options: {
      filter: true,
      sort: true,
    }
  },
];


export default function Tables() {

  const { transactions } = useContext(ExpenseTrackerContext)

  return (
    <>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <MUIDataTable
            title="All Transactions"
            data={transactions}
            columns={columns}
            options={{
              filterType: "checkbox",
            }}
          />
        </Grid>
      </Grid>
    </>
  );
}
