import { useState } from 'react';
import './App.css';

function App() {
  const [quoteData, setQuoteData] = useState(null);
  const [symbol, setSymbol] = useState("AAPL");
  const [lastSymbolSubmitted, setLastSymbolSubmitted] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleFormChange = (event) => {
    setSymbol(event.target.value);
  }
  const handleFormSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    setLastSymbolSubmitted(symbol);
    const apiUrl = `/api/test?${new URLSearchParams({symbol: symbol}).toString()}`;
    fetch(apiUrl)
        .then((res) => res.json())
        .then((data) => setQuoteData(data))
        .then(() => setIsLoading(false))
  }

  const currentPrice = (currentPrice) =>
      <div className={quoteData.c >= quoteData.o ? 'green-price' : 'red-price'}>${currentPrice}</div>;

  return (
    <div className="App">
      <header className="App-header">
        <form onSubmit={handleFormSubmit}>
          <label><div>Enter a stock symbol</div>
            <input type="text" value={symbol} onChange={handleFormChange} />
          </label>
          <input type={"submit"} value={"Submit"} />
        </form>
        <br/>
        <div className="resultsBox">
          <div className="search-ideas">{!quoteData && !isLoading && <>Need a suggestion? Try: GME AAPL MSFT AMZN NVDA</>}</div>
          {isLoading && <>Loading...</>}
          {quoteData && !isLoading &&
              <>
                <b>Quote Data for {lastSymbolSubmitted}</b>
                <div className="stock-container">
                  <div>Current price: {currentPrice(quoteData.c)}</div>
                  <div>(change: {quoteData.dp}%)</div>
                  <hr/>
                  <div>Today's open: ${quoteData.o}</div>
                  <div>Today's high (so far): ${quoteData.h}</div>
                  <div>Today's low (so far): ${quoteData.l}</div>
                  <div>Yesterday's close: ${quoteData.pc}</div>
                </div>
              </>}
        </div>
      </header>
    </div>
  );
}

export default App;
