<template>
  <div>
    <div v-if="loading">
      <loading-template />
    </div>
    <div v-else-if="errorOccured">
      <error-info />
    </div>
    <div v-else>
      <order-items-table />
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import OrderItemsTable from "./OrderTable.vue";
import LoadingTemplate from "./../views/LoadingTemplate.vue";
import ErrorInfo from '@/views/ErrorInfo.vue';



export default {
  name: "OrderComponent",
  components: {
    OrderItemsTable,
    LoadingTemplate,
    ErrorInfo
  },

  computed:{
    ...mapGetters([
        "processing",
        "errorResponse"
    ]),
    loading(){
      return ((this.processing.state && 
        this.processing.dispatcher == "order_items")
      )
    },
    errorOccured(){
      return !this.processing.state && this.errorResponse
    }
  }

}
</script>
