import { createRouter, createWebHistory } from "vue-router";
import HomeView from "./../views/Home.vue"
import OrderItemsView from "./../views/Orders.vue";
import OrderDetailsView from "./../views/OrderDetailsView.vue";

const routes = [
  {path: "/", name:"home", component: HomeView},
  {path: "/order_items", name:"orders_items", component: OrderItemsView},
  {path: "/order_items/:id", name:"order_details", component: OrderDetailsView},
  {
    path: "/:catchAll(.*)",
    name: 'NotFound',
    component: () => import(/* webpackChunkName: "dashboard" */ './../views/NotFound.vue'),
  }

]


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})


export default router;
