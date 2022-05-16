<template>
  <div class="absolute-page wrapper p-2 bit:p-4 bg-gradient flexcent">

    <div class="form-container">
      <form class="w-full" @submit.prevent="submit($event)" >
          <div class="header">
            Provide your credentials as a seller to proceed
          </div>
        <div>
          <label for="seller">
            Seller ID *
          </label>
          <input :class="{'valid':!invalid.seller_id, 'invalid':invalid.seller_id}" 
            id="seller" v-model="formLoad.seller_id" type="text"
            name="seller_id"
          >
        </div>
        <div class="my-5">
          <label for="zip_code">
            Zip Code Prefix *
          </label>
          <input :class="{'valid':!invalid.seller_zip_code_prefix, 
                    'invalid':invalid.seller_zip_code_prefix}" 
            id="zip_code" v-model="formLoad.seller_zip_code_prefix" type="text"
            name="seller_zip_code_prefix"
          >
        </div>
        <div class="flexcent my-5 mb-2">
          <button class="submit-btn" type="submit">            
            <span v-if="submitting">Processing...</span>
            <span v-else>Proceed</span>
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
import axio from "axios";
import { errorParser } from "./../utilities/error_parser";
import { saveTK } from "./../utilities/local_storage"

export default {
  name: "AuthLogin",
  data: ()=>({
    formLoad:{
      seller_id:"",
      seller_zip_code_prefix:""
    },
    invalid:{
      seller_id: false,
      seller_zip_code_prefix:false,
    },
    authResponse:null,
    submitting: false,
  }),

  computed:{
    invalidForm(){
      return Object.values(this.invalid).some(Number)
    }
  },

  methods:{
    async submit(e){
      try {
        if (this.submitting) return;
        let {target} = e
        this.authResponse = null;
        const formItems = ["seller_id", "seller_zip_code_prefix"];
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
        // console.log(payload);
        this.submitting = true;
        const uri = "http://localhost:5000/authenticate";
        let { data } = await axio.post(uri, payload);
        // console.log(data);
        localStorage.AU = window.btoa(JSON.stringify(data.data));
        saveTK(data.token);
        this.$router.push("/order_items");
      } catch (error) {
        this.authResponse = errorParser(error, {user:true, status:true})
      }finally{
        this.submitting = false
      }
    }
  }

}
</script>

