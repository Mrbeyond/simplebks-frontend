<template>
  <div class="pt-5" v-if="seller">
  <div class="px-2p w-full flexcent ">
    <div class="detail-wrapper">
      <div class="text-center text-xl xx:text-3xl my-4 font-medium text-sec">
        Welcome!
      </div>
      <div class="detail-field break-words"> Your ID: {{seller.seller_id}}</div>
      <div class="detail-field"> State: {{seller.seller_state}}</div>
      <div class="detail-field"> City: {{seller.seller_city}}</div>
      <div class="flex pl-2 xx:justify-end xx:pr-5">
        <button class="show-update-btn" @click="show_update = true">
          Edit Details
        </button>
      </div>
    </div>
  </div>

    <div class="modal" v-if="show_update">

      <div class="form-wrapper">
        <div class="w-full flex justify-end">
          <span @click="hideModal" class="close-icon">X</span>
        </div>
        <div class="header">
          Update Details
        </div>
        <form class="w-full" @submit.prevent="submit($event)" >
          <div class="field-container">
            <div class="form-control">
              <label for="seller_city">
                City *
              </label>
              <input :class="{'valid':!invalid.seller_state, 'invalid':invalid.seller_state}" 
                id="seller_city" v-model="update_load.seller_city" type="text"
                name="seller_city"
              >
            </div>
            <div class="form-control">
              <label for="seller_state">
                State *
              </label>
              <input :class="{'valid':!invalid.seller_state, 
                        'invalid':invalid.seller_state}" 
                id="seller_state" v-model="update_load.seller_state" type="text"
                name="seller_state"
              >
            </div>
          </div>
        <div class="flexcent my-5 mb-2">
          <button class="submit-btn" type="submit">            
            <span v-if="submitting">Processing...</span>
            <span v-else>Update</span>
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

  </div>
</template>
<script>
import axios from 'axios';
import { hToken } from '@/utilities/local_storage';
import { errorParser } from '@/utilities/error_parser';

export default {
  name: "SellerDetails",
  data: () => ({
    seller: null,
    update_load:{
      seller_city:"",
      seller_state:"",
    },
    show_update: false,
    invalid: {},
    authResponse:null,
    submitting: false,
  }),

  methods: {
    hideModal(){
      if(this.submitting) return;
      this.show_update = false
    },

    async submit(e){
      try {
        if (this.submitting) return;
        this.submitting = true;
        let {target} = e
        this.authResponse = null;
        const formItems = ["seller_city", "seller_state"];
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
        
        if(!payload.seller_state && !payload.seller_city) return;
        if(
            this.seller.seller_state == payload.seller_state && 
            this.seller.seller_city == payload.seller_city
          ) return;
        
        
        const uri = "http://localhost:5000/account";
        let { data } = await axios.put(uri, payload, {headers: hToken()});
        console.log(data);
        let {seller_state, seller_city} = data.data;
        console.log({seller_state, seller_city});
        this.seller = { ...this.seller, seller_state, seller_city};
        console.log(this.seller);
        localStorage.AU = window.btoa(JSON.stringify(this.seller));
        this.authResponse = "Details successfuly updated";
      } catch (error) {
        this.authResponse = errorParser(error, {user:true, status:true})
      }finally{
        this.submitting = false
      }
    }
  },

  created(){
    try {
     this.seller =  JSON.parse(window.atob(localStorage.AU));
     const {seller_state, seller_city} = this.seller;
     this.update_load = {seller_state, seller_city};
    } catch (error) {
      this.$router.replace("/");
    }
    
  }
}
</script>

<style scoped>
  .modal{
    background: rgba(0, 0, 0, 0.4);
    @apply absolute-page p-2 bit:p-4 
       flexcent z-50 overflow-y-auto
    }

  .form-wrapper{
    @apply w-full rounded max-w-md shadow-lint p-1 pb-3 xx:p-5
      bg-white
  }

  .form-control{
    @apply mb-5 xxe:mb-2
  }


  .close-icon{
    @apply flex justify-center items-center rounded-full hover:shadow
      border text-sm h-6 w-6 xxe:h-8 xxe:w-8 cursor-pointer
  }

  .detail-field {
    @apply pl-2p mb-2 text-lg text-neutral-200
  }

  .show-update-btn {
    @apply bg-prm2 text-neutral-300 py-1.5
      px-10 rounded border-prm
  }

  .detail-wrapper {
    @apply border w-full pb-4 rounded 
      shadow-lint xxe:rounded-xl bg-prm
  }
</style>