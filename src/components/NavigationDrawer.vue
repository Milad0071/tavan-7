<template>
  <v-locale-provider rtl>
    <v-navigation-drawer
      permanent
      location="right"
      :elevation="0"
      class="navigationClass"
    >
      <div class="logoPart">
        <tavanHaftLogo style="width: 150%" />
      </div>

      <!-- <v-list class="drawerList flex_column_class" density="compact" nav>
        <div class="linksClass">
          <v-list-item
            class="homeItem"
            :active="homeActive"
            value="home"
            @click="goTo(1)"
          >
            <Home id="homeIconTag" style="width: 30px" />
            <p
              id="homeText"
              style="color: #a1834e; font-weight: bold"
              class="mr-3"
            >
              میز کار
            </p>
          </v-list-item>
          <v-list-item
            :active="usersDetailsActive"
            class="usersDetailsItem"
            value="usersDetails"
            @click="goTo(2)"
          >
            <UsersDetailsIcon id="usersDetailsIconTag" style="width: 30px" />
            <p
              id="usersDetailsText"
              style="color: #a1834e; font-weight: bold"
              class="mr-3"
            >
              تکمیل اطلاعات
            </p>
          </v-list-item>
        </div>
        <div class="linksClass">
          <v-list-item class="exitItem" value="exit" @click="goTo(3)">
            <GrayExitAccountNavigationDrawer
              id="exitIconTag"
              style="width: 30px"
            />
            <p
              id="exitText"
              style="color: #a1834e; font-weight: bold"
              class="mr-3"
            >
              خروج از حساب
            </p>
          </v-list-item>
        </div>
      </v-list> -->
    </v-navigation-drawer>
  </v-locale-provider>
</template>

<script>
// import axios from "./../axios.js";
import tavanHaftLogo from "./../assets/svgIcons/loginLogo.vue";
// import Home from "./../assets/svgIcons/homeIcon.vue";
// import UsersDetailsIcon from "./../assets/svgIcons/UsersDetailsIcon.vue";
// import GrayExitAccountNavigationDrawer from "../assets/svgIcons/GrayExitAccountNavigationDrawer.vue";

export default {
  props: { renderToken: Number },
  components: {
    tavanHaftLogo,
    // Home,
    // UsersDetailsIcon,
    // GrayExitAccountNavigationDrawer,
  },
  data: () => ({
    homeActive: false,
    usersDetailsActive: false,
  }),
  mounted() {
    // this.showChosenPage();
  },
  methods: {
    showChosenPage() {
      //highligh the chosen page name
      if (this.renderToken == 2) {
        this.$cookies.set("usersDetailsActive", true);
      }
      if (
        this.renderToken == 0 ||
        this.$cookies.get("homeActive") == "true" ||
        this.$cookies.get("homeActive") == true
      ) {
        this.homeActive = true;
        this.usersDetailsActive = false;
        document.getElementById("homeText").classList.add("chosenLink");
        document.getElementById("homeIconTag").children[0].style.fill =
          "#00AAA3";
        document
          .getElementById("usersDetailsText")
          .classList.remove("chosenLink");
        document
          .getElementById("usersDetailsIconTag")
          .classList.remove("chosenIcon");
      } else if (
        this.renderToken == 2 ||
        this.$cookies.get("usersDetailsActive") == "true" ||
        this.$cookies.get("usersDetailsActive") == true
      ) {
        this.homeActive = false;
        this.usersDetailsActive = true;
        document.getElementById("homeText").classList.remove("chosenLink");
        document.getElementById("homeIconTag").classList.remove("chosenIcon");
        document.getElementById("usersDetailsText").classList.add("chosenLink");
        document.getElementById("usersDetailsIconTag").children[0].style.fill =
          "#00AAA3";
        document.getElementById("usersDetailsIconTag").children[1].style.fill =
          "#00AAA3";
      }
    },
    changeDecoration(num) {
      this.homeActive = null;
      this.usersDetailsActive = null;
      if (num == 1) {
        this.$cookies.remove("usersDetailsActive");
        document.getElementById("homeText").classList.add("chosenLink");
        document.getElementById("homeIconTag").classList.add("chosenIcon");
        document
          .getElementById("usersDetailsText")
          .classList.remove("chosenLink");
        document
          .getElementById("usersDetailsIconTag")
          .classList.remove("chosenIcon");
      } else if (num == 3) {
        this.$cookies.remove("usersDetailsActive");
        document.getElementById("homeText").classList.remove("chosenLink");
        document.getElementById("homeIconTag").classList.remove("chosenIcon");
        document
          .getElementById("usersDetailsText")
          .classList.remove("chosenLink");
        document
          .getElementById("usersDetailsIconTag")
          .classList.remove("chosenIcon");
      } else if (num == 2) {
        this.$cookies.set("usersDetailsActive", true);
        document.getElementById("homeText").classList.remove("chosenLink");
        document.getElementById("homeIconTag").classList.remove("chosenIcon");
        document.getElementById("usersDetailsText").classList.add("chosenLink");
        document
          .getElementById("usersDetailsIconTag")
          .classList.add("chosenIcon");
      }
    },
    goTo(numPage) {
      this.changeDecoration(numPage);
      if (numPage == 1) {
        this.$router.push({ name: "Home" });
      } else if (numPage == 2) {
        this.$router.push({ name: "usersDetails" });
      } else if (numPage == 3) {
        this.$cookies.remove("usersDetailsActive");
        this.$cookies.remove("userToken");
        this.$cookies.set("userEntered", false);
        this.$cookies.remove("userToken");
        this.$cookies.remove("userRefreshToken");
        this.$cookies.remove("currentUserName");
        this.$cookies.remove("currentUserRole");
        this.$router.push({ name: "signupLogin" });
      }
    },
  },
};
</script>
<style scoped>
.flex_column_class {
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  align-items: flex-start;
  height: 70%;
  width: 100%;
}
.chosenLink {
  color: #00aaa3 !important;
}
.chosenIcon {
  fill: #00aaa3 !important;
}
.logoPart {
  width: 100%;
  height: 30%;
  margin-right: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.drawerList {
  font-size: 15px !important;
  font-weight: bold;
}
.linksClass {
  width: 100%;
}
.homeItem:hover p {
  color: #00aaa3 !important;
}
.homeItem:hover #homeIconTag {
  stroke: #00aaa3 !important;
}
.usersDetailsItem:hover p {
  color: #00aaa3 !important;
}
.usersDetailsItem:hover #usersDetailsIconTag {
  stroke: #00aaa3 !important;
}
.navigationClass {
  top: 0 !important;
  width: 20%;
  height: 100% !important;
  border-style: none !important;
}
@media screen and (max-width: 1209px) {
  .navigationClass {
    display: none;
  }
}
</style>
<style>
@font-face {
  font-family: danaRegular;
  src: url("./assets/fonts/Dana-Regular.ttf");
}
.homeItem > .v-list-item-title {
  font-size: 18px !important;
}
.v-list-item__content {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.v-list-item--active > .v-list-item__overlay,
.v-list-item[aria-haspopup="menu"][aria-expanded="true"]
  > .v-list-item__overlay {
  opacity: 0.1;
}
.v-list-item--variant-text .v-list-item__overlay {
  background: #00aaa3;
}
.navigationClass > .v-navigation-drawer__content {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
