import { ADD_EXPENSE_TYPE, GET_EXPENSE_TYPE, DELETE_EXPENSE_TYPE } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

function walletReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case ADD_EXPENSE_TYPE:
    return {
      ...state,
      expenses: [...state.expenses, { id: state.expenses.length, ...action.value }],

    };
  case GET_EXPENSE_TYPE:
    return {
      ...state,
      currencies: action.value,
    };

  case DELETE_EXPENSE_TYPE:
    return {
      ...state,
      expenses: state.expenses.filter((item) => item.id !== Number(action.value)),
    };

  default:
    return state;
  }
}

export default walletReducer;
