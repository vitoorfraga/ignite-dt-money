import { ArrowCircleDown, ArrowCircleUp, CurrencyCircleDollar } from "phosphor-react";
import { SummaryCard, SummaryContainer } from "./styles";
import { useContext } from "react";
import { TransactionsContext } from "../../contexts/TransactionsContext";

export function Summary() {
  const { transactions } = useContext(TransactionsContext)

  const summary = transactions.reduce(
    (acc, transaction ) => {
      if(transaction.type === "income") {
        acc.income += transaction.price
        acc.total += transaction.price
      }
      else {
        acc.outcome += transaction.price
        acc.total -= transaction.price
      }

      return acc
    },
      { 
        // acc é exatamente isso aqui
        income: 0, outcome: 0, total: 0
      }
    )

  return (
    <SummaryContainer>
      <SummaryCard>
        <header>
          <span>Entrada</span> 
          <ArrowCircleUp size={32} color="#00b37e"/>
        </header>

        <strong>{summary.income}</strong>
      </SummaryCard>

      <SummaryCard>
        <header>
          <span>Saídas</span> 
          <ArrowCircleDown size={32} color="#f75a68"/>
        </header>

        <strong>{summary.outcome}</strong>
      </SummaryCard>

      <SummaryCard variant="green">
        <header>
          <span>Total</span> 
          <CurrencyCircleDollar size={32} color="#fff"/>
        </header>

        <strong>{summary.total}</strong>
      </SummaryCard>
    </SummaryContainer>
  )
}