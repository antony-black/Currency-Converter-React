import React from "react";
import { Block } from "./Block";
import "./index.scss";

function App() {
  const [forExchangeCurrency, setForExchangeCurrency] = React.useState("USD");
  const [exchangedCurrency, setExchangedCurrency] = React.useState("RUB");
  const [forExchangeValue, setForExchangeValue] = React.useState(1);
  const [exchangedValue, setExchangedValue] = React.useState(0);
  const ratesRef = React.useRef({});

  React.useEffect(() => {
    fetch("https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json")
      .then((res) => res.json())
      .then((data) => {
        data.forEach((currencyItem) => {
          ratesRef[currencyItem.cc] = currencyItem.rate;
        });
        exchangeProcess(1);
      })
      .catch((err) => console.log(err));
  }, []);

  const exchangeProcess = (value) => {
    const sum = parseInt(value);
    const toLocalCurrency = sum * ratesRef[forExchangeCurrency];
    const exchanged = toLocalCurrency / ratesRef[exchangedCurrency];

    setForExchangeValue(sum);
    setExchangedValue(exchanged);
  };

  React.useEffect(() => {
    exchangeProcess(forExchangeValue);
  }, [forExchangeCurrency]);

  return (
    <div className="App">
      <Block
        value={forExchangeValue.toString()}
        currency={forExchangeCurrency}
        onChangeCurrency={setForExchangeCurrency}
        onChangeValue={exchangeProcess}
      />
      <Block value={exchangedValue.toString()} currency={exchangedCurrency} />
    </div>
  );
}

export default App;
