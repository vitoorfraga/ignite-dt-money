import { useEffect, useState } from "react";
import Header from "../../components/Header";
import { Summary } from "../../components/Summary";
import { SearchForm } from "./components/SearchForm";
import { PriceHightlight, TransactionsContainer, TransactionsTable } from "./styles";

interface Transactions {
  id: number;
  description: string;
  type: "income" | "outcome"
  price: number;
  category: string;
  createdAt: string;
}

export default function Transactions() {
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
    <>
      <Header/>
      <Summary />


      <TransactionsContainer>
        <SearchForm />

        <TransactionsTable>
          <tbody>
            {transactions.map((transaction) => {
              return (
                <tr key={transaction.id}>
                  <td>{transaction.description}</td>
                  <td>
                    <PriceHightlight variant={transaction.type === "income" ? "income" : "outcome"}>
                      {transaction.price}
                    </PriceHightlight>
                  </td>
                  <td>{transaction.category}</td>
                  <td>{transaction.createdAt}</td>
                </tr>
              )
            })}
          </tbody>
        </TransactionsTable>
      </TransactionsContainer>
    </>
  )
}
