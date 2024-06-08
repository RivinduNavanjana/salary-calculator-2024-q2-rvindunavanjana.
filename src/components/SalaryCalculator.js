import React, { useState } from 'react';
import './SalaryCalculator.css';
import { IconButton, Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import frameImage from '../assests/images/Frame 9.png';

const SalaryCalculator = () => {
  const [basicSalary, setBasicSalary] = useState('');
  const [earnings, setEarnings] = useState([]);
  const [deductions, setDeductions] = useState([]);
  const [newItem, setNewItem] = useState({ type: '', description: '', amount: '' });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddItem = (type) => {
    setNewItem({ ...newItem, type });
    setIsDialogOpen(true);
  };

  const handleSaveItem = () => {
    if (newItem.type === 'earning') {
      setEarnings([...earnings, { description: newItem.description, amount: parseFloat(newItem.amount) }]);
    } else {
      setDeductions([...deductions, { description: newItem.description, amount: parseFloat(newItem.amount) }]);
    }
    setIsDialogOpen(false);
    setNewItem({ type: '', description: '', amount: '' });
  };

  const handleDeleteItem = (type, index) => {
    if (type === 'earning') {
      setEarnings(earnings.filter((_, i) => i !== index));
    } else {
      setDeductions(deductions.filter((_, i) => i !== index));
    }
  };

  const handleEditItem = (type, index) => {
    const item = type === 'earning' ? earnings[index] : deductions[index];
    setNewItem({ type, description: item.description, amount: item.amount });
    setIsDialogOpen(true);
  };

  const calculateTotal = (items) => items.reduce((acc, item) => acc + item.amount, 0);

  const totalEarnings = calculateTotal(earnings) + (parseFloat(basicSalary) || 0);
  const totalDeductions = calculateTotal(deductions);
  const netSalary = totalEarnings - totalDeductions;

  const handleReset = () => {
    setBasicSalary('');
    setEarnings([]);
    setDeductions([]);
  };

  return (
    <div className="salary-calculator">
      <div className="left-panel">
        <div className="header-container">
          <h2>Calculate Your Salary</h2>
          <img src={frameImage} alt="Frame" onClick={handleReset} />
        </div>
        <div className="section">
          <label>Basic Salary</label>
          <TextField
            type="number"
            value={basicSalary}
            onChange={(e) => setBasicSalary(e.target.value)}
            fullWidth
          />
        </div>
        <div className="section">
          <h3>Earnings</h3>
          {earnings.map((earning, index) => (
            <div key={index} className="allowance">
              <span>{earning.description}: ${earning.amount.toFixed(2)}</span>
              <IconButton onClick={() => handleEditItem('earning', index)}><Edit /></IconButton>
              <IconButton onClick={() => handleDeleteItem('earning', index)}><Delete /></IconButton>
            </div>
          ))}
          <Button className="add-button" onClick={() => handleAddItem('earning')}>+ ADD NEW ALLOWANCE</Button>
        </div>
        <div className="section">
          <h3>Deductions</h3>
          {deductions.map((deduction, index) => (
            <div key={index} className="deduction">
              <span>{deduction.description}: ${deduction.amount.toFixed(2)}</span>
              <IconButton onClick={() => handleEditItem('deduction', index)}><Edit /></IconButton>
              <IconButton onClick={() => handleDeleteItem('deduction', index)}><Delete /></IconButton>
            </div>
          ))}
          <Button className="add-button" onClick={() => handleAddItem('deduction')}>+ ADD NEW DEDUCTION</Button>
        </div>
      </div>
      <div className="right-panel">
        <h2>Salary Summary</h2>
        <div className="results">
          <p className="bold">Net Salary: ${netSalary.toFixed(2)}</p>
          <p>Cost to Company (CTC): ${totalEarnings.toFixed(2)}</p>
          <p>EPF: ${(totalEarnings * 0.08).toFixed(2)}</p>
          <p>Annual Personal Income Tax (APIT): ${(netSalary * 0.15).toFixed(2)}</p>
          <div className="contribution">
            <h3>Contribution from Employer</h3>
            <p>EPF/ETF: ${(totalEarnings * 0.12).toFixed(2)}</p>
          </div>
        </div>
      </div>

      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <DialogTitle>{newItem.type === 'earning' ? 'Add/Edit Allowance' : 'Add/Edit Deduction'}</DialogTitle>
        <DialogContent>
          <TextField
            label="Description"
            fullWidth
            margin="normal"
            value={newItem.description}
            onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
          />
          <TextField
            label="Amount"
            type="number"
            fullWidth
            margin="normal"
            value={newItem.amount}
            onChange={(e) => setNewItem({ ...newItem, amount: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleSaveItem}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default SalaryCalculator;
