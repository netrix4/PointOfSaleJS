import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  // history: createWebHistory(import.meta.env.BASE_URL),
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "Home",
      component: () => import("../components/Home.vue"),
    },
    {
      path: "/reports/:id",
      name: "Reports",
      component: () => import("../components/Reports.vue"),
    },
    {
      path: "/neworder",
      name: "Order",
      component: () => import("../components/NewOrder.vue"),
    },
    {
      path: "/qwerrty",
      name: "qwerty",
      component: () => import("../components/Home.vue"),
    },
  ],
});

// router.beforeEach(async (to, from, next) => {
//   const {
//     data: { user },
//   } = await supabase.auth.getUser();

//   if (to.meta.requiresAuth && !user) {
//     next("/login");
//   } else if (to.path === "/login" && user) {
//     next("/dashboard");
//   } else {
//     next();
//   }
// });

export default router;
