<template>
  <OHeader />
  <router-view :key="$route.path" />
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
