import getCurrentCoins from '../services/walletAPI';

export const LOGIN_TYPE = 'LOGIN';
export const DELETE_EXPENSE_TYPE = 'DELETE_EXPENSE';
export const ADD_EXPENSE_TYPE = 'ADD_EXPENSE';
export const GET_EXPENSE_TYPE = 'GET_EXPENSE';

export const login = (value) => ({ type: LOGIN_TYPE, value });
export const deleteItem = (value) => ({ type: DELETE_EXPENSE_TYPE, value });

// funcao acionada ao submit do form
export const addItem = (value) => async (dispatch) => {
  const result = await getCurrentCoins();
  dispatch({
    type: ADD_EXPENSE_TYPE,
    value: {
      ...value,
      exchangeRates: result,
    },
  });
};

// funcao para add o currencies chamado pelo thunk
export const getExpense = (value) => ({ type: GET_EXPENSE_TYPE, value });

// thunk recebe uma funcao que retorna uma funcao
export const getExpenseThunk = () => async (dispatch) => {
  try {
    const response = await getCurrentCoins();
    const array = Object.keys(response).filter((currency) => currency !== 'USDT');
    // console.log(response);
    dispatch(getExpense(array));
  } catch (error) {
    console.error(error.message);
  }
};
