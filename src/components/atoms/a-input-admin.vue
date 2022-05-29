<template>
  <div class="a-input w-1/4 my-2">
    <div class="flex justify-center items-center mb-1">
      <p class="text-lg font-medium">{{ label }}</p>
    </div>
    <input
      class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-red-500"
      :type="type"
      @input="onChanged"
      :value="modelValue"
      :autocomplete="autocomplete"
      min="0"
    />
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AInputAdmin',

  emits: ['update:modelValue'],

  props: {
    modelValue: String,
    label: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'text',
    },
    autocomplete: {
      type: String,
      default: '',
    },
  },

  setup(props, { emit }) {
    function onChanged(e) {
      emit('update:modelValue', e.currentTarget.value)
    }

    return {
      onChanged,
    }
  },
})
</script>
