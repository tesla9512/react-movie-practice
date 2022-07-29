import { useState, useEffect } from "react";
// import PropTypes from "prop-types";

function Converter() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [result, setResult] = useState([]);
  const [usd, setUSD] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [price, setPrice] = useState(0);
  const [cvt, setCvt] = useState(0);
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
  }, []);

  const onChangeUSD = (event) => setUSD(event.target.value);
  const onChangeKeyword = (event) => setKeyword(event.target.value);
  const onSelect = (event) => {
    setPrice(event.target.value);
  };

  const convert = () => {
    if (price === 0 || usd <= 0) {
      return;
    }
    setCvt((usd / price).toFixed(6));
  };
  const search = () => {
    if (keyword.length < 3) {
      return;
    }

    setResult(
      coins.filter((coin) => coin.name.toLowerCase().includes(keyword))
    );
  };

  return (
    <div>
      <h1>My USD to Coin Converter</h1>
      <input
        placeholder="Find coin type"
        onChange={onChangeKeyword}
        value={keyword}
        type="text"
      ></input>
      <button onClick={search}>Search</button>
      <br />
      <br />
      {result.length > 0 ? (
        <select value={price} onChange={onSelect}>
          <option key="-" value="0" selected>
            -
          </option>
          {result.map((item) => (
            <option key={item.id} value={item.quotes.USD.price}>
              {item.name} ({item.symbol})
            </option>
          ))}
        </select>
      ) : null}
      <br />
      <br />
      <input
        placeholder="Input your USD"
        onChange={onChangeUSD}
        value={usd}
        type="number"
      ></input>
      <button onClick={convert}>Convert</button>
      {cvt > 0 ? <h3>= {cvt}</h3> : null}
      <hr />
      <h1>There are many many Coins! ({coins.length})</h1>
      {loading ? (
        <strong>Loading...</strong>
      ) : (
        <ul>
          {coins.map((coin) => (
            <li key={coin.id}>
              {coin.name} ({coin.symbol} : {coin.quotes.USD.price} USD)
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function App() {
  return (
    <div>
      <Converter />
    </div>
  );
}

export default App;
