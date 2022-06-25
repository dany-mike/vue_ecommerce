<template>
  <OHeader />
  <div class="min-h-screen">
    <router-view :key="$route.path" />
  </div>
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
