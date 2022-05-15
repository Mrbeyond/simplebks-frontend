<template>
  <router-view />
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
  }
}
</script>

<style>

  *{
    outline: none;
    box-sizing: border-box !important;
  }

  body{
    @apply bg-ash text-neut
  }

  .bg-gradient{
    background-image:  linear-gradient(180deg, rgba(23, 61, 140, 0.6) 30%, rgba(34,145,227, 0)),
    linear-gradient(120deg, rgba(50,123,220, 0.8), rgba(40, 94, 149, 0.7) 40%),
    linear-gradient(230deg, rgba(19, 80, 140, 0.4) 35%, rgba(255,255,255,0.1) 30%),
    linear-gradient(140deg, rgba(19, 80, 140, 0.4) 15%, rgba(255,255,255,0) 60%),
    linear-gradient(-35deg, rgba(23, 61, 140, 0.5) 40%, rgba(255,255,255,0) 31%),
    linear-gradient(45deg, rgba(23, 61, 180, 0.5) 15%, rgba(255,255,255,0) 11%);
  }

   .form-container{
    @apply w-full rounded max-w-md shadow-lint p-3 xx:p-5
      bg-white
  }

  .header{
    @apply pt-2 mb-4 text-prm text-lg font-bold text-center
      xxe:text-hd3
  }

  input{
    @apply border active:text-neut text-neut block 
      w-full my-2 py-1.5 px-2 rounded
  }

  .valid{
    @apply border-neutral-300
  }

  .invalid {
    @apply border-red-300
  }

  .submit-btn{
    @apply rounded border bg-prm text-sec w-full max-w-mx3h
      font-bold py-2
  }
  label{
    @apply flex items-center
  }

</style>
