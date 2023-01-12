const express = require("express");
const Axios = require('axios');

const PORT = process.env.PORT || 3001;

const app = express();

const config = {
    params:  {
        'api_key': process.env.API_KEY_FH
    }
};

// return type: : Promise<[]>
const getSymbolData = async (symbol) => {
    const result = await Axios.get(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${config.params.api_key}`);
    return result.data;
};

app.get("/api/test", async (req, res) => {
    res.json(await getSymbolData(req.query.symbol));
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});