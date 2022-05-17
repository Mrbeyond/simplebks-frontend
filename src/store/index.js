import { errorParser } from "@/utilities/error_parser";
import { hToken } from "@/utilities/local_storage";
import axios from "axios";
import { createStore } from "vuex";
const base_uri = "http://localhost:5000";


const store = createStore({
  state: ()=>({
    order_items:[],
    paginationParams: {
      limit: 20,
      sort: "shipping_limit_date",
      offset: 0,
      dir:"DESC",
      total: 0,
    },
    processing: {
      state: false,
      dispatcher: "",
    },
    currentOrder: null,
    errorResponse: null
  }),

  getters:{
    order_items: state => state.order_items,

    paginationParams: state => state.paginationParams, 

    processing: state => state.processing, 

    errorResponse: state => state.errorResponse, 

    currentOrder: state => state.currentOrder,
  },

  mutations:{
    setOrderItems(state, payload){
      state.order_items = payload.data
    },

    setPaginationParams(state, payload){
      state.paginationParams = payload.params
    },

    setProcessing(state, payload){
      state.processing = payload.data
    },

    setErrorResponse(state, payload){
      state.errorResponse = payload.error
    },

    setCurrentOrder(state, payload){
      state.currentOrder = payload.data
    }

  },

  actions:{

    /** Fetch order items, commit into order_items */
    async getOrderItems({commit, state}, payload){
      try {
        commit({
          type: "setProcessing",
          data: {state:true, dispatcher:"order_items"}
        })
        commit({
          type:"setErrorResponse",
          error:null
        })

        const uri = base_uri+"/order_items"+payload.query;
        let {data:{data, limit, total, offset}} = 
                  await axios.get(uri, {headers:hToken()});

        const  {dir, sort} = state.paginationParams;

        console.log({limit, total, offset, dir, sort});

        commit({
          type: "setOrderItems",
          data
        })
        commit({
          type: "setPaginationParams",
          params: {limit, total, offset, dir, sort}
        })        
      } catch (error) {
        commit({
          type:"setErrorResponse",
          error:errorParser(error, {status:true})
        })
      }finally{
        commit({
          type: "setProcessing",
          data: {state:false, dispatcher:"order_items"}
        })
      }
    },

     /** Fetch selected order to display details */
     async getCurrentOrder({commit}, id){
      try {
        commit({
          type: "setProcessing",
          data: {state:true, dispatcher:"current_order"}
        })

        commit({
          type:"setErrorResponse",
          error:null
        })

        const uri = base_uri+"/order_items/"+id;
        let {data:{data}} = await axios.get(uri, {headers:hToken()});

        commit({
          type: "setCurrentOrder",
          data
        }) 

      } catch (error) {
        commit({
          type:"setErrorResponse",
          error:errorParser(error, {status:true})
        })
      }finally{
        commit({
          type: "setProcessing",
          data: {state:false, dispatcher:"current_order"}
        })
      }      
    },

    /** Delete an order from order_items_list */
    async deleteOrder({commit, state}, id){
      try {
        commit({
          type: "setProcessing",
          data: {state:true, dispatcher:"delete_order"}
        })

        commit({
          type:"setErrorResponse",
          error:null
        })

        const uri = base_uri+"/order_items/"+id;
        await axios.delete(uri, {headers:hToken()});

        commit({
          type: "setOrderItems",
          data : state.order_items.filter((item)=>item.id != id)
        }) 
        
        const total = state.paginationParams.total -1
        commit({
          type: "setPaginationParams",
          params: {...state.paginationParams, total}
        })  
      } catch (error) {
        commit({
          type:"setErrorResponse",
          error:errorParser(error, {status:true})
        })
      }finally{
        commit({
          type: "setProcessing",
          data: {state:false, dispatcher:"delete_order"}
        })
      }      
    }

  }
})

export default store;