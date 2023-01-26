import React, {useEffect, useState} from 'react';
import {ConvertCurrencies, GetSymbols} from "./currencyexchange/CurrencyExchange";
import CurrencyDropdown from "./components/CurrencyDropdown";
import {TextField} from "@mui/material";

function App() {
  const [symbols, setSymbols] = useState<string[]>([]);
  const [baseCurrency, setBaseCurrency] = useState("");
  const [quoteCurrency, setQuoteCurrency] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [conversionRate, setConversionRate] = useState(0);
  const [loading, setLoading] = useState(false);

    useEffect(() => {
        (async () => {
            setLoading(true);
            const symbolData = await GetSymbols();
            setSymbols(symbolData);
            setLoading(false);
        })();

        return () => {
            // this now gets called when the component unmounts
        };
      }, []);

    useEffect(() => {
        if(baseCurrency === "" || quoteCurrency === ""){
            return;
        }

        (async () => {
            setLoading(true);
            const conversion = await ConvertCurrencies(baseCurrency, quoteCurrency);
            setConversionRate(conversion);
            setLoading(false);
        })();

        return () => {
            // this now gets called when the component unmounts
        };
    }, [baseCurrency, quoteCurrency, quantity]);

    const handleBaseCurrencyChange = (event: any, newValue: string) => {
        setBaseCurrency(newValue);
    };

    const handleQuoteCurrencyChange = (event: any, newValue: string) => {
        setQuoteCurrency(newValue);
    };

    function handleQuantityChange(event: any) {
        if(event.target.value.length > 15){
            return;
        }
        setQuantity(event.target.value)
    }

    return (
    <div className="App">
        <h1>Exchange App</h1>
        {symbols.length > 0 &&
        <div className="Selectors">
            <TextField  type="number"
                        label="Base Currency Amount"
                        value={quantity}
                        sx={{ width: 180 }}
                        inputProps={{ maxLength: 12 }}
                        onChange={handleQuantityChange} />
            <CurrencyDropdown symbols={symbols} currency={baseCurrency} title={"Base Currency" } handler={handleBaseCurrencyChange}/>
            <CurrencyDropdown symbols={symbols} currency={quoteCurrency} title={"Quote Currency" } handler={handleQuoteCurrencyChange}/>
        </div>
        }
        {conversionRate !== 0 && !loading &&
            <>
                <p>You need {conversionRate*quantity} {quoteCurrency} to buy {quantity} {baseCurrency}</p>
                <p>Exchange Rate: {conversionRate}</p>
            </>
        }
        {loading && <p>Loading...</p>}

    </div>
  );
}

export default App;
