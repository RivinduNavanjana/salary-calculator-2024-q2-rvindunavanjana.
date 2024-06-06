import React, { useState } from 'react';
import styled from 'styled-components';

const CalculatorContainer = styled.div`
  margin: 20px auto;
  padding: 20px;
  max-width: 400px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const Calculator = () => {
  const [salary, setSalary] = useState('');
  const [result, setResult] = useState(null);

  const handleCalculate = () => {
    // Example calculation logic
    const annualSalary = parseFloat(salary) * 12;
    setResult(annualSalary);
  };

  return (
    <CalculatorContainer>
      <h2>Calculate Your Salary</h2>
      <Input
        type="number"
        placeholder="Enter your monthly salary"
        value={salary}
        onChange={(e) => setSalary(e.target.value)}
      />
      <Button onClick={handleCalculate}>Calculate</Button>
      {result && <p>Your annual salary is: {result}</p>}
    </CalculatorContainer>
  );
};

export default Calculator;
