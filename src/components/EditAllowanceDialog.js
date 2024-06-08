// src/components/EditAllowanceDialog.js
import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, FormControlLabel, Checkbox } from '@mui/material';

function EditAllowanceDialog({ open, onClose, onSave, allowance }) {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState(0);
  const [epf, setEpf] = useState(false);

  useEffect(() => {
    if (allowance) {
      setDescription(allowance.description || '');
      setAmount(allowance.amount || 0);
      setEpf(allowance.epf || false);
    }
  }, [allowance]);

  const handleSave = () => {
    onSave({ description, amount: parseFloat(amount), epf });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{allowance ? 'Edit' : 'Add'} Allowance</DialogTitle>
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
        <FormControlLabel
          control={<Checkbox checked={epf} onChange={(e) => setEpf(e.target.checked)} />}
          label="EPF/ETF"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave} color="primary">Add</Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditAllowanceDialog;
