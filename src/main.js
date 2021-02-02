import Vue from "vue";
import App from "./App";
import router from "./router";
import Element from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

Vue.use(router);
Vue.use(Element);

Vue.config.productionTip = false;

new Vue({
  el: "#app",
  router,
  render: (h) => h(App),
}).$mount("#app");
