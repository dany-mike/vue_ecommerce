<template>
  <div class="a-input">
    <label for="password" class="block text-sm font-medium text-gray-700"> {{ label }} </label>
    <div class="mt-1">
      <input
        :class="classValue"
        :type="type"
        required
        @input="onChanged"
        :value="modelValue"
        :autocomplete="autocomplete"
        min="0"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AInput',

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
    classValue: {
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
