<template>
  <div class="a-button">
    <component
      :is="type"
      :href="href"
      class="py-2 px-4 text-white font-semibold shadow-md focus:outline-none rounded"
      :class="classValue"
    >
      <slot />
    </component>
  </div>
</template>

<script>
export default {
  name: 'AButton',
  props: {
    href: {
      type: String,
      require: false,
    },
    to: {
      type: String,
      require: false,
    },
    classValue: {
      type: String,
      default: '',
    },
  },
  computed: {
    type() {
      if (this.href) {
        return 'a'
      } else {
        return 'button'
      }
    },
  },
}
</script>
