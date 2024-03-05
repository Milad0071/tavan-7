/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory } from "vue-router";
import { useCookies } from "vue3-cookies";

const routes = [
  {
    path: "/",
    name: "SignupLogin",
    component: () => import("@/views/SignupLogin.vue"),
    meta: {
      login: false,
      hideNavbar: true,
    },
  },
  {
    path: "/home",
    name: "Home",
    component: () => import("@/views/UserHome.vue"),
    meta: {
      login: true,
      hideNavbar: false,
    },
  },
  {
    path: "/users-details",
    name: "usersDetails",
    component: () => import("@/views/UsersDetails.vue"),
    meta: {
      login: true,
      hideNavbar: true,
    },
  },
  {
    path: "/quiz-page",
    name: "quizPage",
    component: () => import("@/views/QuizPage.vue"),
    meta: {
      login: true,
      hideNavbar: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

const { cookies } = useCookies();

router.beforeEach((to, from, next) => {
  if (to.meta.login == true) {
    if (
      cookies.get("userEntered") == true ||
      cookies.get("userEntered") == "true"
    ) {
      if (to.name == "Home") {
        cookies.remove("examStarted");
        cookies.set("homeActive", true);
      }
      return next();
    } else if (to.name == "usersDetails") {
      cookies.remove("examStarted");
      if (cookies.get("firstTimeUsersDetails")) {
        cookies.remove("firstTimeUsersDetails");
        return next();
      } else {
        alert("توکن شما منقضی شده است، مجددا وارد شوید!");
        return next({ path: "/" });
      }
    } else {
      alert("توکن شما منقضی شده است، مجددا وارد شوید!");
      return next({ path: "/" });
    }
  } else {
    if (to.name == "SignupLogin") {
      if ((cookies.get('userEntered') == 'false')) {
        return next();
      } else if (cookies.get('userEntered') == 'true') {
        if (
          cookies.get("userToken") == undefined ||
          cookies.get("userToken") == null ||
          cookies.get("userToken") == ""
        ) {
          cookies.set("userEntered", false);
          return next();
        } else {
          cookies.set("userEntered", true);
          return next({ name: "Home" });
        }
      }
    }
  }
})

export default router
