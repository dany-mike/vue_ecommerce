<template>
  <div
    class="w-full flex justify-center items-center"
    :key="index"
    v-for="(item, index) in items"
    ref="adminListContainer"
  >
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
      @click="deleteItem(item)"
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
  props: {
    items: {
      type: [Array, Object, String],
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
  },
  methods: {
    async deleteItem(item) {
      const result = confirm(`Are you sure to delete this ${this.type}`)
      if (result) {
        let loader = this.$loading.show()

        if (this.type === 'category') {
          await this.$store.dispatch(`${DELETE_CATEGORY}`, item.id)
        }

        if (this.type === 'product') {
          console.log('delete product')
        }

        this.$router.go(this.$router.currentRoute)
        loader.hide()
      }
    },
  },
}
</script>
