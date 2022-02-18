import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { MIN_CHARACTER, VALIDATE_EMAIL } from '../lib/constants';
import { login as loginAction } from '../actions';
import wallet from '../img/wallet.png';
import '../css/login.css';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      loginButtonDisabled: true,
      password: '',
    };
  }

  handleSubmit =(e) => {
    e.preventDefault();
    const { email } = this.state;
    const { login, history } = this.props;
    login({ email });
    history.push('/carteira');
  }

  // funcao criada para validar o enable do button
  changeStateButton() {
    const { email, password } = this.state;
    const verifyCharacters = password.length >= MIN_CHARACTER;

    // referencia para pesquisa: https://www.horadecodar.com.br/2020/09/13/como-validar-email-com-javascript/
    const verifyEmail = VALIDATE_EMAIL.test(email);

    if (verifyCharacters && verifyEmail) {
      this.setState({ loginButtonDisabled: false });
    } else {
      this.setState({ loginButtonDisabled: true });
    }
  }

  render() {
    const { loginButtonDisabled } = this.state;
    return (
      <div className="container">
        <main>
          <h1>TrybeWallet</h1>
          <img src={ wallet } alt="Wallet" />
          <form onSubmit={ this.handleSubmit }>
            <input
              type="email"
              data-testid="email-input"
              placeholder="Digite seu email"
              onChange={ (e) => {
                this.setState({ email: e.target.value });
                this.changeStateButton();
              } }
              required
            />
            <input
              type="password"
              data-testid="password-input"
              placeholder="Digite uma senha"
              onChange={ (e) => {
                this.setState({ password: e.target.value });
                this.changeStateButton();
              } }
              required
            />
            <button type="submit" disabled={ loginButtonDisabled }>Entrar</button>
          </form>
        </main>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  login: (value) => dispatch(loginAction(value)),
});

Login.propTypes = {
  login: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
