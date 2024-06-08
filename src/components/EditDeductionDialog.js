// src/components/EditDeductionDialog.js
import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';

function EditDeductionDialog({ open, onClose, onSave, deduction }) {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    if (deduction) {
      setDescription(deduction.description || '');
      setAmount(deduction.amount || 0);
    }
  }, [deduction]);

  const handleSave = () => {
    onSave({ description, amount: parseFloat(amount) });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{deduction ? 'Edit' : 'Add'} Deduction</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Description"
          type="text"
          fullWidth
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Amount"
          type="number"
          fullWidth
          value={amount}
          onChange={(e) => setAmount(parseFloat(e.target.value))}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave} color="primary">Add</Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditDeductionDialog;
