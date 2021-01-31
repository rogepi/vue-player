import Vue from "vue";
import Router from "vue-router";

import Login from "../views/Login";
import Home from "../views/Home";
import Demo from "../views/Demo";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      props: true,
      component: Login,
    },
    {
      path: "/Home/:uid",
      props: true,
      component: Home,
    },
    {
      path: "/Demo",
      component: Demo,
    },
  ],
});
