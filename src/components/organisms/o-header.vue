<template>
  <Popover class="relative bg-white">
    <div class="mx-auto px-4 sm:px-12">
      <div
        class="flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10"
      >
        <router-link :to="'/'">
          <span class="sr-only">Workflow</span>
          <img
            class="h-8 w-auto sm:h-10 icon-desktop"
            src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
            alt=""
          />
        </router-link>
        <div class="flex lg:w-0 lg:flex-1 items-center icon-container-mobile">
          <router-link :to="'/'">
            <span class="sr-only">Workflow</span>
            <img
              class="h-8 w-auto sm:h-10"
              src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
              alt=""
            />
          </router-link>
          <router-link :to="'/cart'">
            <ShoppingCartIcon class="w-10 h-10 ml-4 lg:hidden" />
          </router-link>
          <router-link :to="'/favorites'">
            <HeartIcon class="w-10 h-10 ml-2 lg:hidden" />
          </router-link>
        </div>
        <div class="my-2 md:hidden ml-auto">
          <PopoverButton
            class="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
          >
            <span class="sr-only">Open menu</span>
            <MenuIcon class="h-6 w-6" aria-hidden="true" />
          </PopoverButton>
        </div>
        <PopoverGroup as="nav" class="hidden md:flex space-x-10">
          <Popover class="relative" v-slot="{ open }">
            <PopoverButton
              :class="[
                open ? 'text-gray-900' : 'text-gray-500',
                'group bg-white rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500',
              ]"
            >
              <span>Categories</span>
              <ChevronDownIcon
                :class="[
                  open ? 'text-gray-600' : 'text-gray-400',
                  'ml-2 h-5 w-5 group-hover:text-gray-500',
                ]"
                aria-hidden="true"
              />
            </PopoverButton>

            <transition
              enter-active-class="transition ease-out duration-200"
              enter-from-class="opacity-0 translate-y-1"
              enter-to-class="opacity-100 translate-y-0"
              leave-active-class="transition ease-in duration-150"
              leave-from-class="opacity-100 translate-y-0"
              leave-to-class="opacity-0 translate-y-1"
            >
              <PopoverPanel
                class="absolute z-10 left-1/2 transform -translate-x-1/2 mt-3 px-2 max-w-md sm:px-0"
              >
                <div class="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                  <div class="px-5 py-5 bg-gray-50 sm:px-8 sm:py-8">
                    <div>
                      <h3 class="text-sm tracking-wide font-medium text-gray-500 uppercase">
                        Categories
                      </h3>
                      <ul role="list" class="mt-4 space-y-4">
                        <li
                          v-for="category in categories"
                          :key="category.id"
                          class="text-base truncate"
                        >
                          <router-link
                            :to="`/category/${category.id}`"
                            class="font-medium text-gray-900 hover:text-gray-700 w-full"
                          >
                            <span class="w-full">
                              {{ category.name }}
                            </span>
                          </router-link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </PopoverPanel>
            </transition>
          </Popover>
        </PopoverGroup>
        <div class="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
          <router-link :to="'/cart'">
            <ShoppingCartIcon class="w-10 h-10 mr-5" />
          </router-link>
          <router-link :to="'/favorites'">
            <HeartIcon class="w-10 h-10 mr-5" />
          </router-link>
          <router-link
            :to="'/signin'"
            class="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900"
          >
            Sign in
          </router-link>
          <router-link
            :to="'/signup'"
            class="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Sign up
          </router-link>
        </div>
      </div>
    </div>

    <transition
      enter-active-class="duration-200 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="duration-100 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <PopoverPanel
        focus
        class="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden lg:z-0 z-10"
      >
        <div
          class="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50"
        >
          <div class="pt-5 pb-6 px-5">
            <div class="flex items-center justify-between">
              <div>
                <!-- mobile navigation content here -->
                <h3 class="text-sm tracking-wide font-medium text-gray-500 uppercase">
                  Categories
                </h3>
                <ul role="list" class="mt-4 space-y-4">
                  <li v-for="category in categories" :key="category.id" class="text-base truncate">
                    <router-link
                      :to="`/category/${category.id}`"
                      class="font-medium text-gray-900 hover:text-gray-700 w-full"
                    >
                      <span class="w-full">
                        {{ category.name }}
                      </span>
                    </router-link>
                  </li>
                </ul>
              </div>
              <div class="-mr-2">
                <PopoverButton
                  class="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                >
                  <span class="sr-only">Close menu</span>
                  <XIcon class="h-6 w-6" aria-hidden="true" />
                </PopoverButton>
              </div>
            </div>
          </div>
          <div class="py-6 px-5 space-y-6">
            <div>
              <router-link
                :to="'/signup'"
                class="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Sign up
              </router-link>
              <p class="mt-6 text-center text-base font-medium text-gray-500">
                Existing customer?
                {{ ' ' }}
                <router-link :to="'/signin'" class="text-indigo-600 hover:text-indigo-500">
                  Sign in
                </router-link>
              </p>
            </div>
          </div>
        </div>
      </PopoverPanel>
    </transition>
  </Popover>
</template>

<script>
import { Popover, PopoverButton, PopoverGroup, PopoverPanel } from '@headlessui/vue'
import { MenuIcon, XIcon, ShoppingCartIcon, HeartIcon } from '@heroicons/vue/outline'
import { ChevronDownIcon } from '@heroicons/vue/solid'
import { FETCH_CATEGORIES } from '@/store/modules/categories/types'
import { mapGetters } from 'vuex'

export default {
  components: {
    MenuIcon,
    XIcon,
    ShoppingCartIcon,
    HeartIcon,
    ChevronDownIcon,
    Popover,
    PopoverButton,
    PopoverGroup,
    PopoverPanel,
  },
  mounted() {
    this.$store.dispatch(`${FETCH_CATEGORIES}`)
  },
  computed: {
    ...mapGetters({
      categories: 'getCategoryResponse',
    }),
  },
}
</script>

<style scoped>
@media (min-width: 768px) {
  .icon-container-mobile {
    display: none !important;
  }
}

@media (max-width: 768px) {
  .icon-desktop {
    display: none !important;
  }
}
</style>
