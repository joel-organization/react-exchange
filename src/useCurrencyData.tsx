import {useEffect, useState} from "react";
import {ConvertCurrencies} from "./currencyexchange/CurrencyExchange";

export const useCurrencyData = () => {
    const [baseCurrency, setBaseCurrency] = useState("");
    const [quoteCurrency, setQuoteCurrency] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [conversionRate, setConversionRate] = useState(0);
    const [loadingNewData, setLoadingNewData] = useState(false);

    useEffect(() => {
        if(baseCurrency === "" || quoteCurrency === ""){
            return;
        }

        (async () => {
            setLoadingNewData(true);
            const conversion = await ConvertCurrencies(baseCurrency, quoteCurrency);
            setConversionRate(conversion);
            setLoadingNewData(false);
        })();

        return () => {
            // this now gets called when the component unmounts
        };
    }, [baseCurrency, quoteCurrency]);


    const handleBaseCurrencyChange = (event: any, newValue: string) => {
        setBaseCurrency(newValue);
    };

    const handleQuoteCurrencyChange = (event: any, newValue: string) => {
        setQuoteCurrency(newValue);
    };

    const handleQuantityChange = (event: any) => {
        if(event.target.value.length > 12){
            return;
        }
        setQuantity(event.target.value)
    }

    return [
        {
            baseCurrency,
            quoteCurrency,
            quantity,
            conversionRate,
            loadingNewData,
            handleBaseCurrencyChange,
            handleQuoteCurrencyChange,
            handleQuantityChange
        }];
};