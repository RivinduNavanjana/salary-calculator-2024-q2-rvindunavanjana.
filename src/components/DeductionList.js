// src/components/DeductionList.js
import React, { useState } from 'react';
import { Button, IconButton } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import EditDeductionDialog from './EditDeductionDialog';

function DeductionList({ deductions, setDeductions }) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentDeduction, setCurrentDeduction] = useState(null);

  const handleAddDeduction = () => {
    setCurrentDeduction(null);
    setDialogOpen(true);
  };

  const handleEditDeduction = (index) => {
    setCurrentDeduction({ ...deductions[index], index });
    setDialogOpen(true);
  };

  const handleSaveDeduction = (deduction) => {
    if (currentDeduction && currentDeduction.index !== undefined) {
      const updatedDeductions = deductions.map((d, i) =>
        i === currentDeduction.index ? deduction : d
      );
      setDeductions(updatedDeductions);
    } else {
      setDeductions([...deductions, deduction]);
    }
  };

  const handleDeleteDeduction = (index) => {
    setDeductions(deductions.filter((_, i) => i !== index));
  };

  return (
    <div className="section">
      <h3>Deductions</h3>
      {deductions.map((deduction, index) => (
        <div key={index} className="deduction">
          <span>{deduction.description}</span>
          <span>{deduction.amount.toFixed(2)}</span>
          <IconButton onClick={() => handleEditDeduction(index)}><EditIcon /></IconButton>
          <IconButton onClick={() => handleDeleteDeduction(index)}><DeleteIcon /></IconButton>
        </div>
      ))}
      <Button onClick={handleAddDeduction}>+ Add New Deduction</Button>
      <EditDeductionDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSave={handleSaveDeduction}
        deduction={currentDeduction}
      />
    </div>
  );
}

export default DeductionList;
