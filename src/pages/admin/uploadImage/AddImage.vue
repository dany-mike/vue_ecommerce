<template>
  <div class="add-image">
    <!-- TODO: Create a warning component -->
    <div class="rounded-md bg-yellow-50 p-4">
      <div class="flex">
        <div class="flex-shrink-0">
          <svg
            class="h-5 w-5 text-yellow-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <div class="ml-3">
          <h3 class="text-sm font-medium text-yellow-800">Attention needed</h3>
          <div class="mt-2 text-sm text-yellow-700">
            <p>Check the README before upload an image</p>
          </div>
        </div>
      </div>
    </div>
    <div class="flex justify-center">
      <p class="text-2xl mt-10">Upload a new image</p>
    </div>
    <div class="mt-10">
      <div class="mt-1 sm:mt-0 sm:col-span-2 flex justify-center">
        <div
          class="max-w-lg flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md"
        >
          <div class="space-y-1 text-center">
            <svg
              class="mx-auto h-12 w-12 text-gray-400"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <div class="flex text-sm text-gray-600">
              <label
                for="file-upload"
                class="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
              >
                <span>Upload a file</span>
                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  class="sr-only"
                  @change="onFileChange"
                />
              </label>
              <p class="pl-1">or drag and drop</p>
            </div>
            <p class="text-xs text-gray-500">PNG, JPG up to 10MB</p>
          </div>
        </div>
      </div>
    </div>
    <div class="flex justify-center w-full">
      <p class="text-base font-semibold px-24" v-if="files.length > 0">
        Image selected: {{ files[0].name }}
      </p>
      <p class="text-base font-semibold px-24 text-red-600" v-if="validationMessage">
        {{ validationMessage }}
      </p>
    </div>
    <div class="lg:px-96 px-16 mt-10">
      <AButton :classValue="'bg-indigo-500 w-full'" @click="onSubmit">
        {{ 'Submit' }}
      </AButton>
    </div>
    <div class="lg:px-96 px-16">
      <router-link :to="'/admin/image-list'" class="w-full lg:px-96 px-16">
        <AButton :classValue="'bg-red-500 w-full'">
          {{ 'Back' }}
        </AButton>
      </router-link>
    </div>
  </div>
</template>

<script>
import AButton from '@/components/atoms/a-button.vue'
import { UPLOAD_IMAGE } from '@/store/modules/cloudinary/types'
export default {
  name: 'AddImage',
  components: {
    AButton,
  },
  data() {
    return {
      files: [],
      validationMessage: '',
    }
  },
  methods: {
    onFileChange(e) {
      this.validationMessage = ''
      const files = e.target.files || e.dataTransfer.files
      this.files = files
      if (!files.length) return
    },
    async onSubmit() {
      if (this.files.length > 0) {
        const body = {
          // Check the right path on the readme
          file: `${process.env.VUE_APP_IMAGE_TO_UPLOAD_PATH}/${this.files[0]?.name}`,
          publicId: this.files[0]?.name,
        }
        await this.$store.dispatch(`${UPLOAD_IMAGE}`, body)
      } else {
        this.validationMessage = 'Please upload a file'
      }
    },
  },
}
</script>
