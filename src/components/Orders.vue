<template>
  <div>
    <div v-if="loading">
      <loading-template />
    </div>
    <div v-else-if="errorOccured">
      <error-info />
    </div>
    <div v-else>
      <seller-details />
      <order-pagination :pagination_meta="pagination_meta" />
      <order-items-table />
      <order-pagination :pagination_meta="pagination_meta" />
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import OrderItemsTable from "./OrderTable.vue";
import LoadingTemplate from "./../views/LoadingTemplate.vue";
import ErrorInfo from '@/views/ErrorInfo.vue';
import SellerDetails from './SellerDetails.vue';
import OrderPagination from "./Pagination.vue";
import { offsetPaginator } from '@/utilities/common';


export default {
  name: "OrderComponent",
  components: {
    OrderItemsTable,
    LoadingTemplate,
    ErrorInfo,
    SellerDetails,
    OrderPagination
  },

  data: () => ({
    limit: 20,
    offset: 0,
  }),
  computed:{
    ...mapGetters([
        "processing",
        "errorResponse",
        "paginationParams"
    ]),
    loading(){
      return ((this.processing.state && 
        this.processing.dispatcher == "order_items")
      )
    },
    errorOccured(){
      return !this.processing.state && this.errorResponse
    },

    pagination_meta() {
      if(this.loading || !this.paginationParams || this.errorOccured){
        return [];
      }else{
        // console.log(this.paginationParams);
        const {total =0, sort, dir}= this.paginationParams;      
        const { limit=20, offset=0 } = this.$route.query;
        const uri = this.$route.fullPath.split("?")[0];

        const computedLinkQuery = offsetPaginator({offset, total, limit});
        computedLinkQuery.pagination = computedLinkQuery.pagination.map((data)=>{
          let {id, query, text} = data;
          let link = `${uri}${query}&dir=${dir}&sort=${sort}`;
          return {id,text,link};
        });
        if(computedLinkQuery.meta.show_last){
          computedLinkQuery.meta.last_link = 
          uri + computedLinkQuery.meta.last_link + `&dir=${dir}&sort=${sort}`
        }
        if(computedLinkQuery.meta.show_first){
          computedLinkQuery.meta.first_link = 
          uri + computedLinkQuery.meta.first_link + `&dir=${dir}&sort=${sort}`
        }
        console.log(computedLinkQuery);
        return computedLinkQuery;
      }
    }
  },


}
</script>
