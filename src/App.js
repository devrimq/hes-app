import React, { useState } from 'react';

function App() {
  const [calc, setCalc] = useState("");
  const [result, setResult] = useState("");
  const ops = ['/', '*', '+', '-', '.'];

  const updateCalc = (value) => setCalc((prevCalc) => prevCalc + value);

  const createButton = (text, onClick) => (
    <button onClick={onClick}>{text}</button>
  );

  const createDigits = () => {
    return Array.from({ length: 9 }, (_, i) =>
      createButton(i + 1, () => updateCalc(i + 1))
    );
  };

  const calculate = () => {
    try {
      const formattedExpression = calc.replace(/ /g, '');
      setResult(Function(`return ${formattedExpression}`)().toString());
    } catch (error) {
      setResult("Hata");
    }
  };

  const handleOperation = (value) => {
    const newValue = ops.includes(value) ? ` ${value} ` : value;
    updateCalc(newValue);
  };

  const clear = () => {
    setCalc("");
    setResult("");
  };

  return (
    <div className="App">
      <div className="calculator">
        <div className="display">
          <span>({result})</span> {calc}
        </div>

        <div className="operators">
          {ops.map((op) => createButton(op, () => handleOperation(op)))}
          {createButton('C', clear)}
        </div>

        <div className="digits">
          {createDigits()}
          {createButton(0, () => updateCalc(0))}
          {createButton('.', () => handleOperation('.'))}
          {createButton('=', calculate)}
        </div>
      </div>
    </div>
  );
}

export default App;
