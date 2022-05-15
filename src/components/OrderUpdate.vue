<template>
  <div v-if="show" class="modal">

    <div class="form-wrapper">
      <div class="w-full flex justify-end">
        <span @click="hideModal()" class="close-icon">X</span>
      </div>
      <div class="header">
        Update Order
      </div>
      <form class="w-full" @submit.prevent="submit($event)" >
        <div class="field-container">
          <div class="form-control">
            <label for="id">
              ID *
            </label>
            <input :class="{'valid':!invalid.id, 'invalid':invalid.id}" 
              id="id" v-model="ORDER.id" type="text"
              name="id"
            >
          </div>
          <div class="form-control">
            <label for="product_id">
              Product ID *
            </label>
            <input :class="{'valid':!invalid.product_id, 
                      'invalid':invalid.product_id}" 
              id="product_id" v-model="ORDER.product_id" type="text"
              name="product_id"
            >
          </div>
          <div class="form-control">
            <label for="price">
              Price *
            </label>
            <input :class="{'valid':!invalid.price, 'invalid':invalid.price}" 
              id="price" v-model="ORDER.price" type="text"
              name="price"
            >
          </div>

          <div class="form-control">
            <label for="category">
              Category *
            </label>
            <input :class="{'valid':!invalid.product_category, 
                      'invalid':invalid.product_category}" 
              id="category" v-model="ORDER.product_category" type="text"
              name="product_category"
            >
          </div>
          
          <div class="form-control">
            <label for="date">
              Date *
            </label>
            <input :class="{'valid':!invalid.date, 
                      'invalid':invalid.date}" 
              id="date" v-model="ORDER.date" type="datetime-local"
              name="date"
            >
          </div>
        </div>
        
        <div class="flexcent my-5 mb-2">
          <button class="submit-btn" type="submit">            
            <span v-if="submitting">Processing...</span>
            <span v-else>Update Order</span>
          </button>
        </div>

        <div v-if="invalidForm" class="text-red-400 flexcent">
          All fields are required.
        </div>
         <div v-if="authResponse" class="flexcent my-2">
            {{authResponse}}
        </div>
        
      </form>
    </div>
    
  </div>
</template>

<script>
import { errorParser } from "./../utilities/error_parser";
import { mapGetters } from 'vuex';

export default {
  name: "OrderUpdate",
  props: {
    order: Object,
    show: Boolean,
    hideModal: Function,
  },
  data: ()=>({
    ORDER:{},
    invalid:{
      "id": false,
      "product_id": false,
      "price": false,
      "product_category": false,
      "date": false
    },
    authResponse:null,
    submitting: false,
  }),

  computed:{
    ...mapGetters([
      "order_items"
    ]),
    invalidForm(){
      return Object.values(this.invalid).some(Number)
    }
  },

  methods:{

    async submit(e){
      try {
        if (this.submitting) return;
        this.submitting = true;
        let {target} = e
        this.authResponse = null;
        const formItems = ["id", "product_id", "price", "product_category", "date"];
        const payload = {};
        formItems.forEach(item=>{
          const currentFieldValue = target[item].value.trim();
          if(!currentFieldValue){
            this.invalid[item] = true;
          }else{
            this.invalid[item] = false;
            payload[item] = currentFieldValue;
          }
        })
        
        if(this.invalidForm) return;
        
        const orderIndex = this.order_items.findIndex((item)=>
            item.order_id == this.order.order_id
          )

        if(orderIndex < 0){
          this.$store.commit({
            type: "setOrderItems",
            data: [payload]
          })
        }else{
          payload['order_id'] = this.order.order_id
          const order_items_copy = [...this.order_items];
          order_items_copy[orderIndex] = payload;
          this.$store.commit({
            type: "setOrderItems",
            data: order_items_copy
          })
        }
        this.authResponse = "Order successfuly updated";
      } catch (error) {
        this.authResponse = errorParser(error, {user:true, status:true})
      }finally{
        this.submitting = false
      }
    }
  },

  mounted(){
    this.ORDER = this.order;
    this.ORDER['date'] = this.order.date.trim().replace(" ", "T").slice(0,-3)
  }

}
</script>

<style scoped>
  .modal{
    background: rgba(0, 0, 0, 0.4);
    @apply absolute-page p-2 bit:p-4 
       flexcent overflow-y-auto
    }

  .form-wrapper{
    @apply w-full rounded max-w-lg shadow-lint p-1 pb-3 xx:p-5
      bg-white
  }

  .form-control{
    @apply mb-5 xxe:mb-2
  }


  .close-icon{
    @apply flex justify-center items-center rounded-full hover:shadow
      border text-sm h-6 w-6 xxe:h-8 xxe:w-8 cursor-pointer
  }

  .field-container{
    @apply sm:grid sm:grid-cols-2 sm:gap-4
  }

</style>