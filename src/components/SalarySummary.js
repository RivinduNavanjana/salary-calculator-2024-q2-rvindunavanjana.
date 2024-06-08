// src/components/SalarySummary.js
import React from 'react';

function SalarySummary({ netSalary, ctc, epf, apit }) {
  return (
    <div className="section results">
      <h3>Salary Summary</h3>
      <p>Net Salary: {netSalary.toFixed(2)}</p>
      <p>Cost to Company (CTC): {ctc.toFixed(2)}</p>
      <p>EPF: {epf.toFixed(2)}</p>
      <p>Annual Personal Income Tax (APIT): {apit.toFixed(2)}</p>
    </div>
  );
}

export default SalarySummary;
