export async function GetSymbols(){
    const response = await fetch("https://api.exchangerate.host/symbols");
    const json = await response.json();
    return Object.keys(json.symbols);
}

export async function ConvertCurrencies(baseCurrency:string, quoteCurrency:string){
    const response = await fetch(`https://api.exchangerate.host/convert?from=${baseCurrency}&to=${quoteCurrency}`);
    const json = await response.json();
    return json.info.rate;
}