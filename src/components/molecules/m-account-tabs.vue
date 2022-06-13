<template>
  <div
    class="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700"
  >
    <ul class="flex overflow-scroll lg:overflow-hidden -mb-px">
      <li class="mr-2 cursor-pointer" v-for="tab in tabs" :key="tab.name">
        <span
          @click="activeTab(tab)"
          class="inline-block p-4 rounded-t-lg border-b-2 border-transparent"
          :class="{
            'text-blue-600 rounded-t-lg border-b-2 border-blue-600 active dark:text-blue-500 dark:border-blue-500':
              tab.isActive,
            'hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300': !tab.isActive,
          }"
          >{{ tab.name }}</span
        >
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'MAccountTabs',
  data() {
    return {
      tabs: [
        {
          name: 'My profile',
          isActive: true,
        },
        {
          name: 'My password',
          isActive: false,
        },
        {
          name: 'My orders',
          isActive: false,
        },
        {
          name: 'My wishlist',
          isActive: false,
        },
        {
          name: 'My addresses',
          isActive: false,
        },
      ],
    }
  },
  emits: ['active-tab'],
  methods: {
    activeTab(tab) {
      this.clearTabs()
      tab.isActive = true
      this.$emit('active-tab', tab)
    },
    clearTabs() {
      this.tabs.forEach((tab) => (tab.isActive = false))
    },
  },
}
</script>
