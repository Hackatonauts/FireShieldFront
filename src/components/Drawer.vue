<template>
  <v-navigation-drawer
    v-model="drawer"
    app
    dark
    temporary
    color="grey darken-4"
  >
    <v-container>
      <v-flex xs12 class="text-xs-center my-4">
        <h1 class="absolute-logo white--text">
          <span class="red--text text--darken-4">FIRE</span>SHIELD
        </h1>
      </v-flex>
    </v-container>

    <v-divider></v-divider>
    <v-list>
      <v-list-item
        v-for="(route, i) in routes"
        :key="i"
        :to="route.to"
        :href="route.to"
        @click="onClick($event, route)"
      >
        <v-list-item-title v-text="route.text" />
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="js">
import { mapGetters, mapMutations } from 'vuex';

export default {
  name: 'Drawer',
  computed: {
    ...mapGetters(['routes']),
    drawer: {
      get() {
        return this.$store.state.drawer;
      },
      set(val) {
        this.setDrawer(val);
      }
    }
  },
  methods: {
    ...mapMutations(['setDrawer']),
    onClick(e, item) {
      e.stopPropagation();
      if (item.to === '/') {
        this.$vuetify.goTo(0);
        this.setDrawer(false);
        return;
      }
      if (item.to || !item.href) { return; }
      this.$vuetify.goTo(item.href);
      this.setDrawer(false);
    }
  }
};
</script>

<style lang="scss">
.center {
  text-align: center;
}
a {
  color: white;
}
</style>
