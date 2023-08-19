import { createContext, useEffect, useState } from "react";
import { api } from "../lib/axios";

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
  fetchTransactions: (query?: string) => Promise<void>
}
export const TransactionsContext = createContext({} as TransactionsContextType);

interface TransactionsProviderProps {
  children: React.ReactNode;
}

export function TransactionsProvider( { children }: TransactionsProviderProps) {

  const [transactions, setTransactions] = useState<Transactions[]>([])

  async function fetchTransactions(query?: string) {

    const response = await api.get('/transactions', {
      params: {
        q: query
      }
    })

    setTransactions(response.data);
  }

  useEffect(() => {
    fetchTransactions()
  }, [])

  return (
    <TransactionsContext.Provider value={{
      transactions,
      fetchTransactions
    }}>
      {children}
    </TransactionsContext.Provider>
  )
}