import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { addItem, getExpenseThunk } from '../actions/index';
import { TAG_INITIAL } from '../lib/constants';

class Form extends React.Component {
  constructor() {
    super();
    this.state = {
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: TAG_INITIAL,
    };
  }

  componentDidMount() {
    const { dispatchSetCoins } = this.props;
    dispatchSetCoins();
  }

  // funcao generica para adicionar os dados de input ao estado do componente
  handleChange = ({ target }) => {
    const { id, value } = target;

    this.setState({ [id]: value });
  }

  // funcao para adicionar o estado do componente ao global
  addRegister = (e) => {
    e.preventDefault();
    const { dispatchSetData } = this.props;
    dispatchSetData(this.state);
    this.setState({
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: TAG_INITIAL,
    });
  }

  render() {
    const { currencies } = this.props;
    const { value, description, currency, method, tag } = this.state;
    return (
      <form onSubmit={ this.addRegister }>
        <label htmlFor="value">
          { }
          Valor
          <input
            type="number"
            id="value"
            data-testid="value-input"
            onChange={ this.handleChange }
            value={ value }
          />
        </label>
        <label htmlFor="description">
          { ' ' }
          Descrição
          <input
            type="text"
            id="description"
            data-testid="description-input"
            onChange={ this.handleChange }
            value={ description }
          />
        </label>
        <label htmlFor="currency">
          { ' ' }
          Moeda
          <select
            data-testid="currency-input"
            id="currency"
            onChange={ this.handleChange }
            value={ currency }
          >
            {
              currencies.map((i) => (<option key={ i } value={ i }>{ i }</option>))
            }
          </select>
        </label>
        <label htmlFor="method">
          { ' ' }
          Método de Pagamento
          <select
            data-testid="method-input"
            id="method"
            onChange={ this.handleChange }
            value={ method }
          >
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag">
          { ' ' }
          Tag
          <select
            data-testid="tag-input"
            id="tag"
            onChange={ this.handleChange }
            value={ tag }
          >
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </label>
        <button type="submit">Adicionar</button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchSetData: (value) => dispatch(addItem(value)),
  dispatchSetCoins: (value) => dispatch(getExpenseThunk(value)),
});

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  currencies: state.wallet.currencies,
});

Form.propTypes = {
  currencies: propTypes.object,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Form);
