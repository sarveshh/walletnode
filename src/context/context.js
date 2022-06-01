import React, { useReducer, createContext } from "react";
import contextReducer from "./contextReducer";

var incomesum=0;
var savingsum=0;
var itos=0;
var dataout=[];
const initialState = JSON.parse(localStorage.getItem("transactions")) || [
  {
    amount: 500,
    category: "Car",
    type: "Expense",
    date: "2021-12-10",
    id: "1ce4771c-64a0-4d98-8ce6-a6fc37945e89",
  },
  {
    amount: 255,
    category: "Entertainment",
    type: "Expense",
    date: "2021-12-10",
    id: "0cc4c6c0-b8ac-42e7-8d7a-469f47ad3d08",
  },
  {
    amount: 150,
    category: "Food",
    type: "Expense",
    date: "2021-12-10",
    id: "a97393bc-d9f5-4fa5-854b-1b7ecd3c639f",
  },
  {
    amount: 200,
    category: "Award",
    type: "Income",
    date: "2021-12-10",
    id: "6f1ab0c1-5554-448c-807e-0d164d92c65f",
  },
  {
    amount: 500,
    category: "Business",
    type: "Income",
    date: "2021-12-10",
    id: "d0442af5-b3fa-4b5a-bf2a-05f0d4e28528",
  },
  {
    amount: 150,
    category: "Gifts",
    type: "Income",
    date: "2021-12-10",
    id: "ce1bb2fc-b229-4139-b06e-0d6ed468c1bd",
  },
];
export const ExpenseTrackerContext = createContext(initialState);

export const Provider = ({ children }) => {
  const [transactions, dispatch] = useReducer(contextReducer, initialState);

  const deleteTransaction = (id) => {
    dispatch({
      type: "DELETE_TRANSACTION",
      payload: id,
    });
  };

  const addTransaction = (transaction) => {
    dispatch({
      type: "ADD_TRANSACTION",
      payload: transaction,
    });
  };


  

  const balance = transactions.reduce((acc, currVal) => {
    return currVal.type === "Expense"
      ? acc - currVal.amount
      : acc + currVal.amount;
  }, 0);
  
  const incomeBal = transactions.filter(transaction => transaction.type === "Income")
  console.log(incomeBal);
  incomeBal.forEach((item,index)=>{
    incomesum=incomesum+item.amount;
    
  });
  console.log(incomesum);

  const savingss = transactions.filter(transaction => transaction.category === "Savings")
  console.log(savingss);
  savingss.forEach((item,index)=>{
    savingsum=savingsum+item.amount;
    
  });
  console.log(savingsum);

  itos=(savingsum/incomesum)*10;
  console.log(itos.toFixed(2));
  


  return (
    dataout,
    <ExpenseTrackerContext.Provider
      value={{
        deleteTransaction,
        addTransaction,
        transactions,
        balance,
      }}
    >
      {children}
    </ExpenseTrackerContext.Provider>
  );
};
