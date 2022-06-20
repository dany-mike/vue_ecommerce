<template>
  <main class="h-screen w-full flex flex-col justify-center items-center">
    <figure class="md:flex bg-slate-100 rounded-xl p-8 md:p-0 dark:bg-slate-800">
      <div class="pt-6 md:p-8 text-center md:text-left space-y-4">
        <blockquote>
          <p class="text-lg font-medium">
            “This site is a mock e-commerce website. He has been made in order to show my
            programming skills on a modern stack”
          </p>
        </blockquote>
        <figcaption class="font-medium">
          <div
            href="http://danymike.com"
            target="blank"
            class="text-sky-500 dark:text-sky-400 text-2xl mb-2"
          >
            Dany-Mike Joseph
          </div>
          <div class="text-slate-700 dark:text-slate-500">Software developer</div>
          <div class="text-slate-700 dark:text-slate-500">Based in paris</div>
          <div>
            <a
              href="https://github.com/dany-mike/vue_ecommerce"
              target="blank"
              class="text-slate-700 dark:text-slate-500 underline"
            >
              Front-end source code (Vue.js)
            </a>
          </div>
          <div>
            <a
              href="https://github.com/dany-mike/nest_ecommerce_api"
              target="blank"
              class="text-slate-700 dark:text-slate-500 underline"
              >API source code (NestJS)</a
            >
          </div>
          <div>
            <a
              href="http://danymike.com"
              target="blank"
              class="text-slate-700 dark:text-slate-500 underline"
              >danymike.com</a
            >
          </div>
        </figcaption>
      </div>
    </figure>
  </main>
</template>

<script>
export default {
  name: 'ImprintPage',
}
</script>
