<template>
  <v-app id="app">
    <Toolbar />
    <Drawer />
    <v-content>
      <router-view />
    </v-content>
    <Footer />
  </v-app>
</template>

<script>
export default {
  name: "App",
  components: {
    Toolbar: () => import("@/components/Toolbar.vue"),
    Drawer: () => import("@/components/Drawer.vue"),
    Footer: () => import("@/components/Footer.vue")
  },
  data: () => ({
    //
  })
};
</script>
<style lang="scss">
#app {
  font-family: "Monda", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
}
v-navigation-drawer {
  min-height: 200px;
}
</style>
