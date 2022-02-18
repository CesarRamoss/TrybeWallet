import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Form from '../components/Form';
import Table from '../components/Table';
import '../css/wallet.css';
import wallet from '../img/wallet.png';

class Wallet extends React.Component {
  render() {
    const { email, expenses } = this.props;
    return (
      <div className="container_wallet">
        <header>
          <img src={ wallet } alt="Wallet" />
          <nav>
            <ul>
              <li data-testid="email-field">{ email }</li>
              <li data-testid="total-field">
                <span>Total: </span>
                {expenses.reduce((acc, item) => {
                  const valor = Number(item.value)
                    * Number(item.exchangeRates[item.currency].ask);
                  return acc + valor;
                }, 0).toFixed(2)}
              </li>
              <li data-testid="header-currency-field">
                <span>Moeda: </span>
                BRL
              </li>
            </ul>
          </nav>
        </header>
        <Form />
        <Table />
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Wallet.propTypes = {
  email: PropTypes.string,
  expenses: PropTypes.object,
}.isRequired;

export default connect(mapStateToProps)(Wallet);
