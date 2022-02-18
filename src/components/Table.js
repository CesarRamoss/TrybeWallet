import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteItem } from '../actions';
import trash from '../img/trash.svg';

// material estudado para split e shift: https://pt.stackoverflow.com/questions/216333/split-regex-apenas-na-primeira-barra-vertical

class Table extends React.Component {
  deleteItem =({ target }) => {
    const { dispatchDelete } = this.props;
    dispatchDelete(target.value);
  }

  render() {
    const { expenses } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Excluir</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((element) => (
            <tr key={ element.id }>
              <td>{element.description}</td>
              <td>{element.tag}</td>
              <td>{element.method}</td>
              <td>{Number(element.value).toFixed(2)}</td>
              <td>{(element.exchangeRates[element.currency].name).split('/').shift()}</td>
              <td>{Number(element.exchangeRates[element.currency].ask).toFixed(2)}</td>
              <td>
                {Number(element.value * element.exchangeRates[element.currency].ask)
                  .toFixed(2)}

              </td>
              <td>Real</td>
              <td>
                <button
                  className="delete"
                  type="button"
                  data-testid="delete-btn"
                  onClick={ this.deleteItem }
                  value={ element.id }
                >
                  <img src={ trash } alt="trash" />
                </button>
              </td>

            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchDelete: (value) => dispatch(deleteItem(value)),
});

Table.propTypes = {
  expenses: PropTypes.object,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Table);
