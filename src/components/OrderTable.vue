<template>
  <div class="p-2 px-2p xxe:-p5">
    <div class="w-full min-w-full rounded_top overflow-x-auto">
      <table >
        <thead class="">
          <tr class="">
            <th v-if="isBigScreen"  class="w-10p">Order ID</th>
            <th  v-if="isBigScreen" class="w-10p">Product ID</th>
            <th class="w-10p">Price</th>
            <th class="w-10p">category</th>
            <th v-if="isMediumScreen" class="w-10p">Date</th>
            <th class="w-10p">Details</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in order_items"  :key="item.product_id">
            <td v-if="isBigScreen" class="">{{ item.id }}</td>
            <td v-if="isBigScreen" class="">{{ item.product_id }}</td>
            <td>{{ nairaUnit(item.price) }}</td>
            <td>{{ item.product_category }}</td>
            <td  v-if="isMediumScreen">{{  item.date }}</td>
            <td > 
              <magnify-icon @click="showOrderDetails(item.order_id)" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import MagnifyIcon from "./magnify_icon.vue"
import { mapGetters } from 'vuex'
import { NairaUnit } from '@/utilities/common'

export default {
  name: "OrderItemsTable",
  components:{
    MagnifyIcon
  },

  data: ()=>({
    portSize: 900
  }),

  computed:{
    ...mapGetters([
      "order_items",
    ]),

    isBigScreen(){
      return this.portSize >= 900
    },

    isMediumScreen(){
      return this.portSize >= 500
    }
  },

  methods:{
    nairaUnit(val){
      return NairaUnit(val);
    },

    readScreenSize(){
      this.portSize = window.innerWidth;
    },

    showOrderDetails(id){
      this.$store.commit({
        type: "setCurrentOrder",
        data: this.order_items.find(item=>item.order_id == id)
      })
      this.$router.push({ name: 'order_details', params: {id } })
    }
  },

  mounted() {
    this.readScreenSize();
    window.addEventListener("resize", this.readScreenSize);
  },
  beforeUnmount(){
    window.removeEventListener("resize", this.readScreenSize);
  }


}
</script>

<style scoped>

  table{
    /* border-spacing: 0; overflow-hidden */
    @apply w-full overflow-x-auto text-neut
    rounded-t-3xl 
  }

  thead{
    @apply text-sec w-full bg-prm uppercase
  }

  .rounded_top{
    @apply rounded-t-lg xxe:rounded-t-2xl;
  }

  th{
    @apply py-3 xx:py-5 px-2
  }

  td{
    @apply py-2 xxe:py-4 px-1 text-center
  }

  tbody > tr{
    background: linear-gradient(177.46deg, rgba(255, 255, 255, 0) -56.94%, #FFFFFF 97.88%);
    @apply border-b transform duration-300  hover:shadow-simp-card
  }

</style>