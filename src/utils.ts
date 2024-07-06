// src/utils.ts

import { Transaction } from './data';

export const calculateTotalSpending = (transactions: Transaction[]): Record<string, number> => {
  return transactions.reduce((acc, { customer, amount }) => {
    if (!acc[customer]) {
      acc[customer] = 0;
    }
    acc[customer] += amount;
    return acc;
  }, {} as Record<string, number>);
};

export const getTopCustomer = (spending: Record<string, number>): string | null => {
  const customers = Object.keys(spending);
  if (customers.length === 0) {
    return null;
  }
  return customers.reduce((a, b) => (spending[a] > spending[b] ? a : b));
};
