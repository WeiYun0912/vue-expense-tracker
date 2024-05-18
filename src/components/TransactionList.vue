<template>
  <h3>History</h3>
  <ul id="list" class="list" v-if="transactions.length > 0">
    <li
      v-for="transaction in transactions"
      :key="transaction.id"
      :class="transaction.amount < 0 ? 'minus' : 'plus'"
    >
      {{ transaction.text }} <span>${{ transaction.amount }}</span>
      <button class="delete-btn" @click="handleDeleteTransaction(transaction.id)">x</button>
    </li>
  </ul>

  <p v-else>No transactions found.</p>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  transactions: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['transactionDeleted'])

const handleDeleteTransaction = (id) => {
  emit('transactionDeleted', id)
}
</script>
