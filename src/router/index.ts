import { createRouter, createWebHistory } from "vue-router";
import { supabase } from "@/supabase";
// import { useAuthStore } from "@/stores/auth";
import { useAuth } from "@/composables/useAuth";

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
      path: "/login",
      name: "Login",
      component: () => import("../components/Login.vue"),
    },
    {
      path: "/neworder",
      name: "Order",
      component: () => import("../components/NewOrder.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/profile",
      name: "Profile",
      component: () => import("../components/Profile.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/reports/:id",
      name: "ReportsWithId",
      component: () => import("../components/Reports.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/reports",
      name: "Reports",
      component: () => import("../components/Reports.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/qwerty",
      name: "qwerty",
      component: () => import("../components/Home.vue"),
    },
    {
      path: "/:pathMatch(.*)*", // Matches any path
      name: "NotFound",
      component: () => import("../components/NotFound.vue"), // Your 404 component
    },
  ],
});

// Navigation Guard
router.beforeEach(async (to, from, next) => {
  const { getSession } = useAuth();
  const session = await getSession();

  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

  if (requiresAuth && !session) {
    // Guardar la ruta a la que intentaba acceder
    next({
      name: "Login",
      query: { redirect: to.fullPath },
    });
  }
  if (to.name === "Login" && session) {
    // Si ya está autenticado y va a login, redirigir a neworder
    next({ name: "Order" });
  } else {
    next();
  }
});

export default router;
