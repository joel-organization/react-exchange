import { getApiKey } from '../util/ApiKey';

export async function GetSymbols(){
    const apiKey = getApiKey();
    const response = await fetch(`https://api.currencyapi.com/v3/currencies?apikey=${apiKey}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
    const json = await response.json();
    return Object.keys(json.data);
}

export async function ConvertCurrencies(baseCurrency:string, quoteCurrency:string){
    const apiKey = getApiKey();
    const response = await fetch(`https://api.currencyapi.com/v3/latest?apikey=${apiKey}&currencies=${quoteCurrency}&base_currency=${baseCurrency}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
    const json = await response.json();
    return json;
}
