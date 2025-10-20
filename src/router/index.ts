import { createRouter, createWebHistory } from "vue-router";
import { supabase } from "@/supabase";
import { useAuthStore } from "@/stores/auth";

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
  // const authStore = useAuthStore();
  const authStore = useAuthStore();

  // Verificar autenticación al iniciar
  if (!authStore.isAuthenticated) {
    await authStore.checkAuth();
  }

  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const requiresRole = to.meta.requiresRole;

  if (requiresAuth && !authStore.isAuthenticated) {
    // Guardar la ruta a la que intentaba acceder
    next({
      name: "Login",
      query: { redirect: to.fullPath },
    });
  }
  // else if (requiresRole && !requiresRole.includes(authStore.userRole)) {
  //   // Usuario no tiene el rol necesario
  //   next({ name: 'Home' })
  // }
  else if (to.name === "Login" && authStore.isAuthenticated) {
    // Si ya está autenticado y va a login, redirigir a home
    next({ name: "Order" });
  } else {
    next();
  }
});

export default router;
