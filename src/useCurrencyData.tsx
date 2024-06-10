import {useEffect, useState} from "react";
import {ConvertCurrencies} from "./currencyexchange/CurrencyExchange";

export const useCurrencyData = () => {
    const [baseCurrency, setBaseCurrency] = useState("");
    const [quoteCurrency, setQuoteCurrency] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [conversionRate, setConversionRate] = useState(0);
    const [lastUpdate, setLastUpdate] = useState("");
    const [loadingNewData, setLoadingNewData] = useState(false);

    useEffect(() => {
        if(baseCurrency === "" || quoteCurrency === ""){
            return;
        }

        (async () => {
            setLoadingNewData(true);
            const conversionData = await ConvertCurrencies(baseCurrency, quoteCurrency);
            setConversionRate(conversionData.data?.[quoteCurrency]?.value);
            const formattedLastUpdatedAt = conversionData.meta?.last_updated_at
                ? new Date(conversionData.meta.last_updated_at).toLocaleString()
                : 'N/A';
            setLastUpdate(formattedLastUpdatedAt);
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
            lastUpdate,
            handleBaseCurrencyChange,
            handleQuoteCurrencyChange,
            handleQuantityChange
        }];
};