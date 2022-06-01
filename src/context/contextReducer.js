import { db } from '../firebase'

const contextReducer = (state, action) => {
    let transactions;

    switch (action.type) {
        case 'DELETE_TRANSACTION':
            transactions = state.filter((t) => t.id !== action.payload);
            localStorage.setItem('transactions', JSON.stringify(transactions))
            db.doc(`users/${localStorage.getItem('userId')}`).update({ transactions: JSON.parse(localStorage.getItem('transactions')) })

            return transactions;
        case 'ADD_TRANSACTION':
            transactions = [action.payload, ...state]
            localStorage.setItem('transactions', JSON.stringify(transactions))

            return transactions;
        default:
            return state;
    }
}

export default contextReducer