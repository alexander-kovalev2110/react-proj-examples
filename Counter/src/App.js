import React, { useState } from 'react';
import './index.scss';

function App() {
  const [counter, setCounter] = useState(0);

  const counterMinus = () => {
    setCounter(counter - 1);
  };

  const counterPlus = () => {
    setCounter(counter + 1);
  };

  return (
    <div className="App">
      <div>
        <h2>Counter:</h2>
        <h1>{counter}</h1>
        <button className="minus" onClick={counterMinus} >- Minus</button>
        <button className="plus" onClick={counterPlus} >Plus +</button>
      </div>
    </div>
  );
}

export default App;
