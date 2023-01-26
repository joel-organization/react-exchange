import {useEffect, useState} from "react";
import {GetSymbols} from "./currencyexchange/CurrencyExchange";

export const useSymbols = () => {
    const [symbols, setSymbols] = useState<string[]>([]);
    const [loadingSymbols, setLoadingSymbols] = useState(false);

    useEffect(() => {
        (async () => {
            setLoadingSymbols(true);
            const symbolData = await GetSymbols();
            setSymbols(symbolData);
            setLoadingSymbols(false);
        })();

        return () => {
            // this now gets called when the component unmounts
        };
    }, []);

    return [{symbols, loadingSymbols}];
};