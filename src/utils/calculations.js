// src/utils/calculations.js

export const calculateNetSalary = (basicSalary, allowances, deductions) => {
  const totalAllowances = allowances.reduce((sum, allowance) => sum + parseFloat(allowance.amount || 0), 0);
  const totalDeductions = deductions.reduce((sum, deduction) => sum + parseFloat(deduction.amount || 0), 0);
  return basicSalary + totalAllowances - totalDeductions;
};

export const calculateCTC = (basicSalary, allowances) => {
  const totalAllowances = allowances.reduce((sum, allowance) => sum + parseFloat(allowance.amount || 0), 0);
  return basicSalary + totalAllowances;
};

export const calculateEPF = (amount, rate) => {
  return amount * rate;
};

export const calculateAPIT = (netSalary) => {
  if (netSalary <= 0) return 0;
  if (netSalary < 100000) return netSalary * 0.06;
  if (netSalary < 200000) return netSalary * 0.12;
  return netSalary * 0.18;
};
