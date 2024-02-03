import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';

// Initial state as empty array
const initialState = {
  transactions: []
}

// Context to provide globally
export const GlobalContext = createContext(initialState);

export const TransactionProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  function deleteTransaction(id) {
    dispatch({
      type: 'DELETE_TRANSACTION',
      payload: id
    });
  }

  function addTransaction(transaction) {
    dispatch({
      type: 'ADD_TRANSACTION',
      payload: transaction
    });
  }

  function updateTransaction(transaction) {
    dispatch({
      type: 'UPDATE_TRANSACTION',
      payload: transaction
    });
  }


  return (<GlobalContext.Provider value={{
    transactions: state.transactions,
    deleteTransaction,
    addTransaction,
    updateTransaction
  }}>
    {children}
  </GlobalContext.Provider>);
}