export default (state, action) => {
  switch (action.type) {
    case 'DELETE_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.filter(transaction => transaction.id !== action.payload)
      }
    case 'ADD_TRANSACTION':
      return {
        ...state,
        transactions: [action.payload, ...state.transactions]
      }
    case 'UPDATE_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.map((item, i) => {
          if (action.payload.id === item.id) {
            return action.payload;
          } else {
            return item;
          }
        })
      }
    default:
      return state;
  }
}