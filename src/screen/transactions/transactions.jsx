import React, { useContext, useRef, useEffect, useState } from "react";
import { List as MUIList, ListItemText, IconButton, Slide, Typography, Divider, Grid, Card, CardContent, CardHeader } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import { ExpenseTrackerContext } from "../../context/context";
import { makeStyles } from "@material-ui/core/styles";
import { SpeechState, useSpeechContext } from "@speechly/react-client";
import AddTransactions from "../../components/layout/header/addtransactions/addtransactions";
import { Box } from "@material-ui/core";
import { incomeCategories, expenseCategories } from "../../constants/categories";
import { v4 as uuid4 } from "uuid";
import { IconContext } from "react-icons/lib";
import formatDate from '../../constants/formatDate'
import TransactionDetails from "./transactiondetails";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles((theme) => ({
  list: {
    maxHeight: "345px",
    overflowX: "hidden",
  },
  transactionBox: {
    cursor: "pointer",
    "&:hover": {
      opacity: "0.7"
    }
  },
  cardSize: {
    width: "100vw",
    margin: "7px"
  }
}));

const Transactions = () => {
  const classes = useStyles();
  const { deleteTransaction, transactions } = useContext(ExpenseTrackerContext);
  const { speechState } = useSpeechContext();
  const main = useRef(null);
  const executeScroll = () => main.current.scrollIntoView();
  console.log(transactions)
  const [state, setstate] = useState({ tId: null })
  const handleTransactionClick = (transactionId) => {
    setstate({
      tId: transactionId
    });
  };

  useEffect(() => {
    if (speechState === SpeechState.Recording) {
      executeScroll();
    }
  }, [speechState]);

  return (
    <>
      <Box display="flex" alignItems="flex-start" justifyContent="center">
        <Card className={classes.cardSize}>
          <CardHeader title="All Transactions" />
          <CardContent className={classes.cardContent}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <MUIList dense={false} className={classes.list} ref={main}>
                  {transactions.map((transaction) => (
                    <Slide direction="down" in mountOnEnter unmountOnExit key={transaction.id} onClick={() => handleTransactionClick(transaction.id)}>
                      <Box display="flex" flexDirection="column" width="100%" mb="15px" className={classes.transactionBox}>
                        <Box display="flex" alignItems="center" justifyContent="space-between">
                          <Box display="flex" alignItems="center">
                            <Box fontSize="2.5rem">
                              {formatDate(transaction.date).day}
                            </Box>
                            <Box display="flex" flexDirection="column" ml="1.5em" fontSize="1rem">
                              <Box>
                                {`${formatDate(transaction.date).monthLong} ${formatDate(transaction.date).year}`}
                              </Box>
                              <Box>
                                {formatDate(transaction.date).dayOnDate}
                              </Box>
                            </Box>
                          </Box>
                          <IconButton
                            edge="end"
                            aria-label="Delete"
                            onClick={() => deleteTransaction(transaction.id)}
                            style={{ marginRight: "3px" }}
                          >
                            <Delete />
                          </IconButton>
                        </Box>
                        <Divider variant="inset" component="li" />
                        <Box display="flex" m="2px" alignItems="center">
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
                          <ListItemText
                            primary={transaction.category}
                            secondary="No Notes available"
                          />
                          <Typography variant="h6" style={{ marginRight: "8px" }}>{`$${transaction.amount}`}</Typography>
                        </Box>
                      </Box>
                    </Slide>
                  ))}
                  {transactions.length === 0 ? (
                    <Box display="flex" flexDirection="column" alignItems="center">
                      <Typography variant="h3" align="center" color="textSecondary">
                        No transactions exist
                      </Typography>
                      <br />
                      <AddTransactions />
                    </Box>
                  ) : null}
                </MUIList>
              </Grid>
            </Grid>
          </CardContent>
        </Card >
        <Card className={classes.cardSize}>
          <CardHeader
            title="Transaction Details"
            action={
              <Box>
                <IconButton color="secondary" aria-label="add an alarm">
                  <DeleteIcon />
                </IconButton>
                <IconButton color="primary" aria-label="add an alarm">
                  <EditIcon />
                </IconButton>
              </Box>
            } />
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TransactionDetails transactionId={state.tId} />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <button onClick={() => {}}>dygsb</button>
      </Box>
    </>
  );
};


export default Transactions;
