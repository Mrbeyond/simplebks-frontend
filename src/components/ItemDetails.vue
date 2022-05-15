<template>
  <div class="w-full flexcent px-2 py-10 " v-if="currentOrder">
    <div class="w-full max-w-mx5h rounded p-3 py-10 shadow-simp-card">
      <div class="header">Order Details</div>
      <div class="section">
        <div>Order ID</div>
        <div class="">{{currentOrder.id}}</div>
      </div>
      <div class="section">
        <div>Product ID</div>
        <div  class="break-words">{{currentOrder.product_id}}</div>
      </div>
      <div class="section">
        <div>Price</div>
        <div>{{currentOrder.price}}</div>
      </div>
      <div class="section">
        <div>Date</div>
        <div>{{currentOrder.date}}</div>
      </div>
      <div class="section">
        <div>Category</div>
        <div class="capitalize">{{currentOrder.product_category}}</div>
      </div>
      <div class="flex justify-center my-2">
        <div  v-if="deleting">
          Deleting...
        </div>
        <div v-if="errorResponse" class="text-red-400">
          {{ errorResponse }}
        </div>
        <div v-if="successful">
          Order successfuly deleted
        </div>
      </div>

      <div class="flex mt-5 justify-center gap-10">
        <delete_icon @click="deleteOrder(currentOrder.order_id)" />
        <edit_icon @click="show_update=true" />
      </div>
    </div>


    <order-update  :hideModal="hideModal" 
      :show="show_update" :order="currentOrder" 
    />

  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import delete_icon from './delete_icon.vue';
import edit_icon from "./edit_icon.vue";
import OrderUpdate from './OrderUpdate.vue';

export default {
  components: {
    delete_icon,
    edit_icon,
    OrderUpdate
  },
  name: "ItemDetails",

  data: ()=>({
    show_update:false,
    succussful:false,
  }),

  watch:{
    processing(current, prev){
      console.log({prev, current});
      if(prev.dispatcher == "delete_order" && 
          prev.dispatcher == current.dispatcher && 
          !current.state && prev.state && !this.errorResponse
        ){
          
          this.successful = true;
          setTimeout(()=>{
              this.$router.push("/order_items");
          }, 1200)
        }
    },
  },
  computed:{
    ...mapGetters([
      "currentOrder",
      "processing",
      "errorResponse",
    ]),

    deleting(){
      return this.processing.state &&
        this.processing.dispatcher == "delete_order"
    },

    deleteError(){
      return !this.processing.state &&
        this.errResponse
    }
  },

  methods:{
    hideModal(){
      if(this.deleting) return;
      this.show_update = false
    },

    deleteOrder(id){
      this.$store.dispatch("deleteOrder", id);
    }
  },
}
</script>

<style>
  .section{
    @apply block xxe:grid xxe:grid-cols-3 break-words
      mb-4 pl-2 border-b pb-2;
  }
  div.section > :first-child {
    @apply text-neutral-900 pb-1 xxe:pb-0 
      uppercase xxe:capitalize
  }

  div.section > :last-child {
    @apply xxe:col-span-2
  }



</style>