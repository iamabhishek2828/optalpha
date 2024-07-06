
export interface Transaction {
    id: string;
    customer: string;
    amount: number;
  }
  
  export const transactions: Transaction[] = [
    { id: 't_01', customer: 'Rose Roberts', amount: 84 },
    { id: 't_02', customer: 'Chris Cook', amount: 30 },
    { id: 't_03', customer: 'Mary Martin', amount: 42 },
    { id: 't_04', customer: 'Susan Smith', amount: 26 },
    { id: 't_05', customer: 'Rose Roberts', amount: -84 },
    { id: 't_06', customer: 'Rose Roberts', amount: 48 },
    { id: 't_07', customer: 'Susan Smith', amount: 104 },
    { id: 't_08', customer: 'Larry Lewis', amount: 140 },
    { id: 't_09', customer: 'Mary Martin', amount: 10 },
    { id: 't_10', customer: 'Chris Cook', amount: 60 },
    { id: 't_11', customer: 'Susan Smith', amount: -26 },
    { id: 't_12', customer: 'Larry Lewis', amount: -140 },
    { id: 't_13', customer: 'Rose Roberts', amount: 26 },
    { id: 't_14', customer: 'Ryan Roberts', amount: 44 }
  ];
  