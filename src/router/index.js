import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/alphashop/checkout",
    name: "checkout",
    redirect: "/alphashop/checkout/1",
    component: () => import("@/views/Checkout.vue"),
    children: [
      {
        path: "1",
        name: "form-address",
        component: () => import("@/components/Form_Address"),
      },
      {
        path: "2",
        name: "form-shipment",
        component: () => import("@/components/Form_Shipment"),
      },
      {
        path: "3",
        name: "form-payment",
        component: () => import("@/components/Form_Payment"),
      },
    ],
  },
  {
    path: "/alphashop",
    name: "alphashop",
    redirect: "/alphashop/checkout",
  },
  {
    path: "/",
    name: "root",
    redirect: "/alphashop/checkout",
  },
  {
    path: "*",
    name: "not-found",
    component: () => import("../views/NotFound.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
