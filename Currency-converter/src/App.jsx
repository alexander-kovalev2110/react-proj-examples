import React, { useEffect, useRef, useState } from 'react';
import { Block } from './Block';
import './index.scss';

const App = () => {
  const [fromCurrency, setFromCurrency] = useState('UAH');
  const [toCurrency, setToCurrency] = useState('USD');
  const [fromPrice, setFromPrice] = useState(0);
  const [toPrice, setToPrice] = useState(1);

  const ratesRef = useRef([]);

  useEffect(() => {
    fetch('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json')
      .then((res) => res.json())
      .then((json) => {
        // setRates(json);
        ratesRef.current = json;
        onChangeToPrice(1)
      }).catch(err => {
        console.warn(err);
        alert('Failed to retrieve information');
      });
  }, []);

  useEffect(() => {
    if (ratesRef.current.length > 0) {
      onChangeFromPrice(fromPrice);
    }
  }, [fromCurrency]); // Runs whenever fromCurrency changes

  useEffect(() => {
    if (ratesRef.current.length > 0) {
      onChangeToPrice(toPrice);
    }
  }, [toCurrency]); // Runs whenever toCurrency changes

  const rate = (curr) => {
    // The rates array contains rates relative to UAH, but UAH itself is not in the array(!)
    return curr !== 'UAH' ? ratesRef.current.find((cur) => cur.cc === curr)?.rate : 1;
  };
  
  const onChangeFromPrice = (value) => {
    const result = value * (rate(fromCurrency) / rate(toCurrency));
    setToPrice(result.toFixed(3));
    setFromPrice(value);
  };

  const onChangeToPrice = (value) => {
    const result = value * (rate(toCurrency) / rate(fromCurrency));
    setFromPrice(result.toFixed(3));
    setToPrice(value);
  };

  return (
    <div className="App">
      <Block 
        value={fromPrice} 
        currency={fromCurrency} 
        onChangeCurrency={setFromCurrency}       
        onChangeValue={onChangeFromPrice}
      />
      <Block 
        value={toPrice} 
        currency={toCurrency} 
        onChangeCurrency={setToCurrency} 
        onChangeValue={onChangeToPrice}
      />
    </div>
  );
}

export default App;
