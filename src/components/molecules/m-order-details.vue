<template>
  <div class="m-order-details">
    <AButton :classValue="'bg-indigo-500 mt-2 w-full'" @click="emitOrderList">
      Back to orders list
    </AButton>
  </div>
</template>

<script>
import AButton from '@/components/atoms/a-button.vue'
export default {
  name: 'MOrderDetails',
  components: {
    AButton,
  },
  emits: ['m-order-details'],
  methods: {
    emitOrderList() {
      this.$emit('m-order-details')
    },
  },
}
</script>
