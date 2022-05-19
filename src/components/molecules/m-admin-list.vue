<template>
  <div class="w-full flex justify-center items-center" :key="item.id" v-for="item in items">
    <router-link :to="`/admin/${type}/${item.id}`">
      <div
        class="border-solid border-2 border-slate-900 w-96 rounded-md max-w-xs mb-2 flex justify-center items-center"
      >
        <p class="text-xl">
          {{ item.name }}
        </p>
      </div>
    </router-link>
    <router-link :to="`/admin/${type}/update/${item.id}`">
      <div
        class="border-solid border-2 border-indigo-600 w-16 rounded-md max-w-xs mb-2 flex justify-center items-center mx-2"
      >
        <font-awesome-icon icon="edit" class="py-1.5" />
      </div>
    </router-link>
    <div
      @click="deleteItem(item.id)"
      class="border-solid border-2 border-red-600 w-16 rounded-md max-w-xs mb-2 flex justify-center items-center hover:cursor-pointer"
    >
      <font-awesome-icon icon="trash" class="py-1.5" />
    </div>
  </div>
</template>

<script>
import { DELETE_CATEGORY } from '@/store/modules/categories/types'

export default {
  name: 'MAdminList',
  components: {},
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    type: {
      type: String,
      required: true,
    },
  },
  methods: {
    deleteItem(id) {
      const result = confirm(`Are you sure to delete this ${this.type}`)
      if (result) {
        this.type === 'category'
          ? this.$store.dispatch(`${DELETE_CATEGORY}`, id)
          : console.log('delete product')
      }
    },
  },
}
</script>
