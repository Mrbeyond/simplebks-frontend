<template>
  <div class="flex items-center gap-2 xx:gap-4 px-2p mt-4">

  <span class="inline-block tracking-tighter">SORT BY</span>
    <button 
      @click="setSorter('shipping_limit_date')" 
      :class="{'active': (active_sort != 'price')}"
    >
      Date
    </button>

    <button 
       @click="setSorter('price')" 
      :class="{'active': (active_sort == 'price')}"
    >
      Price
    </button>

    <select v-model="dir" class="w-min">
      <option value="DESC">DESC</option>
      <option value="ASC">ASC</option>
    </select>
    
    <button class=" text-prm font-medium" @click="sort">
      Sort
    </button>
  </div>
</template>
<script>
import { extractPaginationQuery } from '@/utilities/common'
import { mapGetters } from 'vuex';

export default {
  name: "OrserSort",
  data: () => ({
    dir: "",
    active_sort: "",

  }),

  computed: {
    ...mapGetters([
      "paginationParams"
    ])
  },


  methods: {
    setSorter(val){
      this.active_sort = val;
    },
    
    sort() {  
      
      const {limit=20, offset=0 } = this.$route.query;

      this.$store.commit({
        type: "setPaginationParams",
        params: {...this.paginationParams, sort:this.active_sort, dir:this.dir}
      })

      const query = extractPaginationQuery({sort:this.active_sort, dir:this.dir,limit, offset})
      this.$store.dispatch({
          type: "getOrderItems",
          query
        }
      )

    }
  },
  created() {
    this.active_sort = this.paginationParams.sort;
    this.dir = this.paginationParams.dir;
  }
}
</script>

<style scoped>
  button{
    @apply border rounded shadow-lint py-0.5 px-2
  }
  select{
    @apply p-1.5
  }

  .active{
    @apply bg-prm2 text-white 
  }
</style>