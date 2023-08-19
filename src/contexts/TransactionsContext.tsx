import { createContext, useEffect, useState } from "react";

export interface Transactions {
  id: number;
  description: string;
  type: "income" | "outcome"
  price: number;
  category: string;
  createdAt: string;
}

interface TransactionsContextType {
  transactions: Transactions[]
}
export const TransactionsContext = createContext({} as TransactionsContextType);

interface TransactionsProviderProps {
  children: React.ReactNode;
}

export function TransactionsProvider( { children }: TransactionsProviderProps) {

  const [transactions, setTransactions] = useState<Transactions[]>([])

  async function loadTransactions() {
    const response = await fetch('http://localhost:3000/transactions');
    const data = await response.json();
    setTransactions(data);

    console.log(data)
    return data;
  }

  useEffect(() => {
    loadTransactions()
  }, [])

  return (
    <TransactionsContext.Provider value={{transactions}}>
      {children}
    </TransactionsContext.Provider>
  )
}