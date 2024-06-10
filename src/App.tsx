import React from 'react';
import CurrencyDropdown from "./components/CurrencyDropdown";
import {TextField} from "@mui/material";
import {useSymbols} from "./useSymbols";
import {useCurrencyData} from "./useCurrencyData";

function App() {
    const [{symbols, loadingSymbols}] = useSymbols();
    const [
        {
            baseCurrency,
            quoteCurrency,
            quantity,
            conversionRate,
            loadingNewData,
            lastUpdate,
            handleBaseCurrencyChange,
            handleQuoteCurrencyChange,
            handleQuantityChange
        }] = useCurrencyData();

    return (
        <div className="App">
            <h1>Exchange App</h1>
            {symbols.length > 0 &&
                <div className="Selectors">
                    <TextField type="number"
                               label="Base Currency Amount"
                               value={quantity}
                               sx={{width: 180}}
                               inputProps={{maxLength: 12}}
                               onChange={handleQuantityChange}/>
                    <CurrencyDropdown symbols={symbols} currency={baseCurrency} title={"Base Currency"}
                                      handler={handleBaseCurrencyChange}/>
                    <CurrencyDropdown symbols={symbols} currency={quoteCurrency} title={"Quote Currency"}
                                      handler={handleQuoteCurrencyChange}/>
                </div>
            }
            {conversionRate !== 0 && !loadingNewData &&
                <div>
                    <p>You need {conversionRate * quantity} {quoteCurrency} to buy {quantity} {baseCurrency}</p>
                    <p>Exchange Rate: {conversionRate}</p>
                    <p>Last updated: {lastUpdate}</p>
                </div>
            }
            {loadingSymbols && <p>Loading symbols list...</p>}
            {loadingNewData && <p>Loading new rate...</p>}
        </div>
    );
}

export default App;
