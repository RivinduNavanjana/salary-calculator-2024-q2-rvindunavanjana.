// src/components/AllowanceList.js
import React, { useState } from 'react';
import { Button, IconButton } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import EditAllowanceDialog from './EditAllowanceDialog';

function AllowanceList({ allowances, setAllowances }) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentAllowance, setCurrentAllowance] = useState(null);

  const handleAddAllowance = () => {
    setCurrentAllowance(null);
    setDialogOpen(true);
  };

  const handleEditAllowance = (index) => {
    setCurrentAllowance({ ...allowances[index], index });
    setDialogOpen(true);
  };

  const handleSaveAllowance = (allowance) => {
    if (currentAllowance && currentAllowance.index !== undefined) {
      const updatedAllowances = allowances.map((a, i) =>
        i === currentAllowance.index ? allowance : a
      );
      setAllowances(updatedAllowances);
    } else {
      setAllowances([...allowances, allowance]);
    }
  };

  const handleDeleteAllowance = (index) => {
    setAllowances(allowances.filter((_, i) => i !== index));
  };

  return (
    <div className="section">
      <h3>Earnings</h3>
      {allowances.map((allowance, index) => (
        <div key={index} className="allowance">
          <span>{allowance.description}</span>
          <span>{allowance.amount.toFixed(2)}</span>
          <span>{allowance.epf ? 'EPF/ETF' : ''}</span>
          <IconButton onClick={() => handleEditAllowance(index)}><EditIcon /></IconButton>
          <IconButton onClick={() => handleDeleteAllowance(index)}><DeleteIcon /></IconButton>
        </div>
      ))}
      <Button onClick={handleAddAllowance}color='white'>+ Add New Allowance</Button>
      <EditAllowanceDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSave={handleSaveAllowance}
        allowance={currentAllowance}
      />
    </div>
  );
}

export default AllowanceList;
