<template>
  <div v-if="showLoadingOrError">
    <div v-if="errorResponse">
      <error-info :error="errorResponse" />
    </div>
    <div v-else> 
      <loading-template />
    </div>
  </div>
  <div v-else>
    <item-details  />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import ItemDetails from "./../components/ItemDetails.vue";
import ErrorInfo from './ErrorInfo.vue';
import LoadingTemplate from './LoadingTemplate.vue';

export default {
  name: "OrdersDetailsView",
  components:{
    ItemDetails,
    LoadingTemplate,
    ErrorInfo
  },
  computed:{
    ...mapGetters([
      "currentOrder",
      "processing",
      "errorResponse"
    ]),

    showLoadingOrError(){
      return ((this.processing.state && 
        this.processing.dispatcher == "current_order") ||
        this.errorResponse != null
      )
    }
  },

  beforeMount(){
    if(!this.currentOrder){
      this.$store.dispatch("getCurrentOrder", this.$route.params.id)
    }
  }
}
</script>