<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
<script  setup>
  console.log(  await $fetch('/api/hello'))
</script>