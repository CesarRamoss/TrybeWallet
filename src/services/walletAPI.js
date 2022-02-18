const WALLET_API = 'https://economia.awesomeapi.com.br/json/all';

const getCurrentCoins = async () => {
  const response = await fetch(WALLET_API);
  const result = await response.json();
  return result;
};

export default getCurrentCoins;
