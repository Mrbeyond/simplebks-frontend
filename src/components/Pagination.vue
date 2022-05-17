<template>
<div class=" py-4 xxe:flex xxe:justify-between xxe:items-center px-2p">
  <div class="flex text-fs-15 tracking-wide">
    Page {{ meta.current_page}} of  {{meta.total_pages}}, 
      &nbsp; &nbsp;
    {{ meta.from }} - {{ meta.to }} of {{meta.total}}
  </div>
  <div class="flex justify-end gap-2" >
    <a v-if="meta.show_first" :href="meta.first_link" 
      class="text-center" 
    >
     &lt;&lt;
    </a>
    <a class=" text-center" 
      v-for="link in pagination" 
      :key="link.id" 
      :href="link.link"
      :class="{'active': (meta.current_page == link.text)}"
    >
      {{ link.text }}
    </a>
    <a v-if="meta.show_last" :href="meta.last_link" 
      class="text-center" 
    >
     &gt;&gt;
    </a>
  </div>
</div>
</template>
<script>
export default {
  name: "OrderPagination",
  props: {
    pagination_meta: Object
  },


  computed: {
    pagination(){
     return this.pagination_meta.pagination      
    },

    meta(){
      return this.pagination_meta.meta;
    }
  },

  methods: {}
}
</script>
<style scoped>
  a{
    @apply inline-block py-1 px-3 shadow-lint  border rounded
  }
  .active{
    @apply bg-prm2 text-white pointer-events-none
  }
</style>