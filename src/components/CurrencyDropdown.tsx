import React from "react";
import "../App.css"
import {Autocomplete, TextField} from "@mui/material";


function CurrencyDropdown(data: { symbols: string[], title: string, currency: string, handler:any }){
    return(
        <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={data.symbols}
            disableClearable={true}
            sx={{ minWidth: 200 }}
            renderInput={(params) => <TextField {...params} label={data.title} />}
            onChange={data.handler}
        />
    )
}

export default CurrencyDropdown;