<template>
  <div class="a-textarea w-1/4 my-2">
    <div class="flex justify-center items-center mb-1">
      <p class="text-lg font-medium">{{ label }}</p>
    </div>
    <textarea
      :name="name"
      :id="id"
      cols="30"
      rows="10"
      @input="onChanged"
      :value="modelValue"
      class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-red-500"
    ></textarea>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ATextArea',

  emits: ['update:modelValue'],

  props: {
    modelValue: String,
    label: {
      type: String,
      default: '',
    },
    id: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: 'name',
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
