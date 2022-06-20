<template>
  <OHeader />
  <router-view :key="$route.path" />
  <OFooter />
</template>

<script>
import OHeader from '@/components/organisms/o-header.vue'
import OFooter from '@/components/organisms/o-footer.vue'
export default {
  name: 'App',
  components: {
    OHeader,
    OFooter,
  },
}
</script>
