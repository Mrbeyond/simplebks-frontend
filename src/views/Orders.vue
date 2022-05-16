<template>
  <div>
    <order-component />
  </div>
</template>

<script>
import OrderComponent from "./../components/Orders.vue";

export default {
  name: "OrdersItemsView",
  components:{
    OrderComponent
  },

  created(){
    if(!('AU' in localStorage)){
      alert();
     this.$router.replace("/");
    }else{
      this.$store.dispatch({
          type: "getOrderItems"
        }
      )
    }


  }


  
}
</script>