<template>
  <div class=" absolute-page flexcent">
    <div class=" w-full">
      <div class=" text-xl xxe:text-3xl text-center font-bold tracking-widest text-red-500">
       Oops! Something went wrong
      </div>
      <div class="text-lg text-center pt-4">
        {{error}}
      </div>
    </div>    
  </div>
</template>

<script>
export default {
  name: "ErrorInfo",
  props:{
    error: String
  }
}
</script>