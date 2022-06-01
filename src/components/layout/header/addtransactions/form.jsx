import React, { useState, useContext, useEffect } from 'react';
import { TextField, Grid, Button, FormControl, InputLabel, Select, MenuItem, Box } from '@material-ui/core';
import { v4 as uuidv4 } from 'uuid';
import { useSpeechContext } from '@speechly/react-client';
import Snackbar from '../../../snackbar';
import formatDate from '../../../../constants/formatDate';
import { ExpenseTrackerContext } from '../../../../context/context';
import { incomeCategories, expenseCategories } from '../../../../constants/categories';
import { makeStyles } from '@material-ui/core/styles';
import { IconContext } from "react-icons";
import { useAuth } from '../../../../context/AuthContext'
import { db } from '../../../../firebase'

const useStyles = makeStyles((theme) => ({
    button: {
        marginTop: '20px',
    },
}));

const initialState = {
    amount: '',
    category: '',
    type: 'Income',
    date: formatDate(new Date()).formattedDate,
};

const Form = () => {
    const classes = useStyles();
    const { addTransaction } = useContext(ExpenseTrackerContext);
    const [formData, setFormData] = useState(initialState);
    const { segment } = useSpeechContext();
    const { currentUser } = useAuth()
    const [open, setOpen] = React.useState(false);
    const selectedCategories = formData.type === 'Income' ? incomeCategories : expenseCategories;

    const createTransaction = () => {
        if (Number.isNaN(Number(formData.amount)) || !formData.date.includes('-')) return;

        if (incomeCategories.map((iC) => iC.type).includes(formData.category)) {
            setFormData({ ...formData, type: 'Income' });
        } else if (expenseCategories.map((iC) => iC.type).includes(formData.category)) {
            setFormData({ ...formData, type: 'Expense' });
        }

        setOpen(true);
        addTransaction({ ...formData, amount: Number(formData.amount), id: uuidv4() });
        db.doc(`users/${currentUser.uid}`).update({ transactions: JSON.parse(localStorage.getItem('transactions')) })
        setFormData(initialState);
    };

    useEffect(() => {
        if (segment) {
            if (segment.intent.intent === 'add_expense') {
                setFormData({ ...formData, type: 'Expense' });
            } else if (segment.intent.intent === 'add_income') {
                setFormData({ ...formData, type: 'Income' });
            } else if (segment.isFinal && segment.intent.intent === 'create_transaction') {
                return createTransaction();
            } else if (segment.isFinal && segment.intent.intent === 'cancel_transaction') {
                return setFormData(initialState);
            }

            segment.entities.forEach((s) => {
                const category = `${s.value.charAt(0)}${s.value.slice(1).toLowerCase()}`;

                switch (s.type) {
                    case 'amount':
                        setFormData({ ...formData, amount: s.value });
                        break;
                    case 'category':
                        if (incomeCategories.map((iC) => iC.type).includes(category)) {
                            setFormData({ ...formData, type: 'Income', category });
                        } else if (expenseCategories.map((iC) => iC.type).includes(category)) {
                            setFormData({ ...formData, type: 'Expense', category });
                        }
                        break;
                    case 'date':
                        setFormData({ ...formData, date: s.value });
                        break;
                    default:
                        break;
                }
            });

            if (segment.isFinal && formData.amount && formData.category && formData.type && formData.date) {
                createTransaction();
            }
        }
    }, [segment]);


    return (
        <Grid container spacing={2}>
            <Snackbar open={open} setOpen={setOpen} content="Transaction Successfully created" />
            <Grid item xs={12}>

            </Grid>
            <Grid item xs={6}>
                <FormControl fullWidth required>
                    <InputLabel>Type</InputLabel>
                    <Select value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })}>
                        <MenuItem value="Income">Income</MenuItem>
                        <MenuItem value="Expense">Expense</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={6}>
                <FormControl fullWidth required>
                    <InputLabel>Category</InputLabel>
                    <Select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })}>
                        {selectedCategories.map((c) =>
                            <MenuItem key={c.type} value={c.type}>
                                <Box display="flex" alignItems="center">
                                    <IconContext.Provider value={{ color: "black", style: { width: "35px", height: "35px", borderRadius: "50%", marginRight: "8px", padding: "5px" } }} >
                                        {c.icon}
                                    </IconContext.Provider>
                                    {c.type}
                                </Box>
                            </MenuItem>
                        )}
                    </Select>
                </FormControl>
            </Grid>

            <Grid item xs={6}>
                <TextField type="number" label="Amount" value={formData.amount} onChange={(e) => setFormData({ ...formData, amount: e.target.value })} fullWidth />
            </Grid>
            <Grid item xs={6}>
                <TextField fullWidth label="Date" type="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: formatDate(e.target.value).formattedDate })} />
            </Grid>
            <Button className={classes.button} variant="outlined" color="primary" fullWidth onClick={createTransaction}>Create Transaction</Button>
        </Grid >
    );
};

export default Form;