<template>
  <OHeader />
  <router-view />
</template>

<script>
import OHeader from '@/components/organisms/o-header.vue'
export default {
  name: 'App',
  components: {
    OHeader,
  },
}
</script>
