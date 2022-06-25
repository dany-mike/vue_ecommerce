<template>
  <section class="o-footer bg-gray-100 overflow-x-hidden mt-8">
    <div class="border-t py-8">
      <div class="container mx-auto px-4">
        <div class="flex flex-wrap justify-between items-center">
          <p class="mb-8 md:mb-0 text-gray-500 mx-8">
            All rights reserved
            <a href="http://danymike.com" target="blank" class="text-indigo-500 ml-2"
              >Dany-Mike Joseph</a
            >
          </p>
          <router-link :to="'/'">
            <p class="mb-8 md:mb-0 text-indigo-500 mx-8">Home</p>
          </router-link>
          <router-link :to="'/signin'">
            <p class="mb-8 md:mb-0 text-indigo-500 mx-8">Login</p>
          </router-link>
          <router-link :to="'/signup'">
            <p class="mb-8 md:mb-0 text-indigo-500 mx-8">Register</p>
          </router-link>
          <router-link :to="'/imprint'">
            <p class="mb-8 md:mb-0 text-indigo-500 mx-8">Imprint</p>
          </router-link>
          <a href="http://danymike.com" target="blank" class="mb-8 md:mb-0 text-indigo-500 mx-8"
            >About me</a
          >
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'OFooter',
}
</script>
