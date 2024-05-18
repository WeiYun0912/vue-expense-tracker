<template>
  <PageHeader />
  <div class="container">
    <AppBalance :total="+total" />
    <IncomeExpenses :income="+income" :expense="+expense" />
    <TransactionList @transactionDeleted="handleTransactionDeleted" :transactions="transactions" />
    <AddTransaction @transactionSubmitted="handleTransactionSubmitted" />
  </div>
</template>

<script setup>
import PageHeader from '@/components/PageHeader.vue'
import AppBalance from '@/components/AppBalance.vue'
import IncomeExpenses from '@/components/IncomeExpenses.vue'
import TransactionList from '@/components/TransactionList.vue'
import AddTransaction from './components/AddTransaction.vue'
import { useToast } from 'vue-toastification'
import { ref, computed, onMounted } from 'vue'

const toast = useToast()

const transactions = ref([])

onMounted(() => {
  const savedTransactions = JSON.parse(localStorage.getItem('transactions'))

  if (savedTransactions) {
    transactions.value = savedTransactions
  }
})

// Get total
const total = computed(() => {
  return transactions.value.reduce((acc, transaction) => (acc += transaction.amount), 0)
})

// Get income
const income = computed(() => {
  return transactions.value
    .filter((transaction) => transaction.amount > 0)
    .reduce((acc, transaction) => (acc += transaction.amount), 0)
    .toFixed(2)
})

// Get expense

const expense = computed(() => {
  return transactions.value
    .filter((transaction) => transaction.amount < 0)
    .reduce((acc, transaction) => (acc += transaction.amount), 0)
    .toFixed(2)
})

// Add transaction

const handleTransactionSubmitted = ({ text, amount }) => {
  transactions.value.push({
    id: crypto.randomUUID(),
    text,
    amount
  })
  saveTransactionsToLS()
  toast.success('Transaction added.')
}

// Delete transaction
const handleTransactionDeleted = (id) => {
  transactions.value = transactions.value.filter((transaction) => transaction.id !== id)
  saveTransactionsToLS()
  toast.success('Transaction deleted.')
}

//Save to ls
const saveTransactionsToLS = () => {
  localStorage.setItem('transactions', JSON.stringify(transactions.value))
}
</script>
