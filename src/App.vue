<template>
  <v-app class="mainApp">
    <div :key="resetKey">
      <!-- user nav bars -->
      <AppBar
        :key="userComponentKeyBar"
        @user-rerender-drawer="userForceRender"
        v-if="!$route.meta.hideNavbar && show == true"
      />
      <Drawer
        :key="userComponentKeyDrawer"
        :renderToken="renderToken"
        v-if="!$route.meta.hideNavbar && show == true"
      />
    </div>
    <router-view
    @reset-app="forceReset"
    @user-rerender-drawer="userForceRender"
    @reset-page="forceResetPage"
    :key="resetForce"
    />
  </v-app>
</template>

<script>
import AppBar from "./components/AppBar.vue";
import Drawer from "./components/NavigationDrawer.vue";

export default {
  components: {
    AppBar,
    Drawer,
  },
  data: () => {
    return {
      show: false,
      userComponentKeyBar: 0,
      userComponentKeyDrawer: 0,
      resetKey: 0,
      renderToken: 0,
      resetForce: 0,
    };
  },
  created() {
    this.showBars();
  },
  methods: {
    userForceRender(n) {
      this.renderToken = n;
      this.userComponentKeyBar += 1;
      this.userComponentKeyDrawer += 1;
      this.show = true;
    },
    forceReset() {
      this.resetKey += 1;
      this.showBars();
    },
    forceResetPage() {
      this.$router.push({ name: "Home" });
      this.resetForce = + 1;
    },
    showBars() {
      setTimeout(() => {
        if (
          this.$route.name === "SignupLogin" ||
          this.$route.name === "quizPage"
        ) {
          this.show = false;
        } else {
          this.show = true;
        }
      }, 300);
    },
  },
}
</script>
<style scoped>
@font-face {
  font-family: danaRegular;
  src: url("./assets/fonts/Dana-Regular.ttf");
}
.mainApp {
  display: flex;
  flex-flow: column;
  font-family: danaRegular !important;
}
</style>
<style>
.mainApp > .v-application__wrap {
  position: unset !important;
  min-height: 0 !important;
  max-height: 0 !important;
}
</style>
