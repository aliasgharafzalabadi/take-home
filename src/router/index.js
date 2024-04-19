import { createWebHistory, createRouter } from "vue-router";
import HomePage from "../views/home";
import LoginPage from "../views/login";
import SingUp from "../views/singup";



const routes = [
  {
    path: "/home",
    /* --- Home --- */
    name: "home",
    component: HomePage,
    meta: { title: "خانه" },
  }
  ,
  {
    path: "/login",
    /* --- login --- */
    name: "login",
    component: LoginPage,
    meta: { title: "ورود" },
  },
  {
    path: "/singup",
    /* --- login --- */
    name: "singup",
    component: SingUp,
    meta: { title: "ثبت نام" },
  }
]


const router = createRouter({
  history: createWebHistory("/#"),
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
  routes,
});

router.beforeEach((to, from, next) => {
  //const userToken = store.getters.userToken;

  // if (!userToken && to.path != "/login" && to.path != "/singup") {
  //   next("/login");
  //   return;
  // }

  // if (userToken && to.path == "/login") {
  //   next(from.path);
  //   return;
  // }

  next();
});

export default router;
