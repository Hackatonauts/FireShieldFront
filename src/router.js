import Vue from "vue";
import Router from "vue-router";
import FireMap from "./views/FireMap.vue";
import ReportFire from "./views/ReportFire.vue";
import Fire from "./views/Fire.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "Fire Map",
      component: FireMap
    },
    {
      path: "/report_fire",
      name: "Report Fire",
      component: ReportFire
    },
    {
      path: "/fire/:id",
      component: Fire,
      props: true,
      name: "Fire"
    },
    {
      path: "/about",
      name: "About",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    }
  ]
});
