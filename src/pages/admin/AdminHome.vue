<template>
  <!-- Todo: Make style of the button component dynamic -->
  <div class="pt-8">
    <div class="pl-4">
      <p v-if="user" class="text-3xl">Hello {{ user.firstname }}</p>
    </div>
    <div class="flex justify-center">
      <p class="text-4xl mb-6 pt-6">Admin Homepage</p>
    </div>
    <div class="flex justify-center mb-4 w-full">
      <router-link :to="'/admin/products'" class="w-full lg:px-96 px-16">
        <AButton :classValue="'bg-indigo-500 w-full'">
          {{ 'Manage products' }}
        </AButton>
      </router-link>
    </div>
    <div class="flex justify-center mb-4 w-full">
      <router-link :to="'/admin/category'" class="w-full lg:px-96 px-16">
        <AButton :classValue="'bg-indigo-500 w-full'">
          {{ 'Manage category' }}
        </AButton>
      </router-link>
    </div>
    <div class="flex justify-center mb-4">
      <router-link :to="'/admin/image-list'" class="w-full lg:px-96 px-16">
        <AButton :classValue="'bg-indigo-500 w-full'">
          {{ 'Manage images' }}
        </AButton>
      </router-link>
    </div>
  </div>
</template>

<script>
import AButton from '@/components/atoms/a-button.vue'
import { mapGetters } from 'vuex'
import { GET_CURRENT_USER } from '@/store/modules/auth/types'
export default {
  name: 'AdminHome',
  components: {
    AButton,
  },
  mounted() {
    this.$store.dispatch(`${GET_CURRENT_USER}`)
  },
  computed: {
    ...mapGetters({
      user: 'getCurrentUser',
    }),
  },
}
</script>
