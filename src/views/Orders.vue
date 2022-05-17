<template>
  <div>
    <order-component />
  </div>
</template>

<script>
import { extractPaginationQuery } from '@/utilities/common';
import { mapGetters } from 'vuex';
import OrderComponent from "./../components/Orders.vue";

export default {
  name: "OrdersItemsView",
  components:{
    OrderComponent
  },

  computed:{
    ...mapGetters([
        "paginationParams"
    ]),
  },
  


  created(){
    if(!('AU' in localStorage)){
     this.$router.replace("/");
    }else{
      const {sort, dir}= this.paginationParams;      
      const {limit=2, offset=0 } = this.$route.query;
      const query = extractPaginationQuery({sort, dir,limit, offset})
      this.$store.dispatch({
          type: "getOrderItems",
          query
        }
      )
    }


  }


  
}
</script>