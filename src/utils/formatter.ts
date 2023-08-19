// => formata Datas.
export const dateFormatter = new Intl.DateTimeFormat('pt-br')

// => Formata valores monetários.
export const priceFormatter = new Intl.NumberFormat('pt-br', {
  style: 'currency',
  currency: 'BRL',
})
