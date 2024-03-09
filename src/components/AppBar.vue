<template>
  <v-locale-provider style="font-family: danaRegular !important" rtl>
    <v-app-bar class="mainBar" block :elevation="0" scroll-threshold="0">
      <div class="contentBar">
        <div class="welcomePart">
          <div v-if="this.currentUserName" class="welcomeNote">
            <h3>{{ this.currentUserName }} عزیز، خوش اومدی!</h3>
          </div>
          <div v-else class="welcomeNote">
            <h3>دانشجوی عزیز، خوش اومدی!</h3>
          </div>
          <div class="datePart" dir="auto">
            <p>{{ this.todayDate }}</p>
          </div>
        </div>
        <div class="userProfilePart">
          <v-menu>
            <template v-slot:activator="{ props }">
              <!-- icons part -->
              <div class="flex_class" v-bind="props">
                <div class="iconPart">
                  <span class="iconNum"> 0 </span>
                  <NotificationBellIcon style="width: 35px" />
                </div>
              </div>
            </template>
            <v-list style="width: 200px">
              <v-list-item
                v-for="(item, index) in items_2"
                :key="index"
                :value="index"
              >
                <v-list-item-title>
                  <p style="font-family: danaRegular !important">
                    {{ item.title }}
                  </p>
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
          <!-- divider -->
          <div class="dividerContainer">
            <v-divider
              class="dividerClass"
              length="60"
              color="#525355"
              :thickness="2"
              vertical
            ></v-divider>
          </div>
          <!-- user profile -->
          <v-menu>
            <template v-slot:activator="{ props }">
              <div class="userPart" v-bind="props">
                <v-avatar class="mr-1">
                  <v-img src="./../assets/newUser.png" alt="newUser"></v-img>
                </v-avatar>
                <div
                  v-if="currentUserName == null"
                  style="width: 100% !important"
                  class="ml-2 mr-5 space-y-0.5 text-right"
                >
                  <p class="topText">دانشجو</p>
                  <p class="bottomText">دانشجوی مهمان</p>
                </div>
                <div
                  v-else
                  style="width: 150px !important"
                  class="ml-2 mr-5 space-y-0.5 text-right"
                >
                  <p class="topText">{{ this.currentUserName }}</p>
                  <p class="bottomText">کاربر</p>
                </div>
                <v-icon
                  size="x-large"
                  color="#A1834E"
                  icon="mdi-chevron-down"
                ></v-icon>
              </div>
            </template>
            <v-list>
              <v-list-item
                class="profileItems"
                v-for="(item, index) in items"
                :key="index"
                :value="index"
                @click="goToItem(item.id)"
              >
                <template v-slot:prepend>
                  <v-icon :icon="item.icon"></v-icon>
                </template>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
      </div>
    </v-app-bar>
  </v-locale-provider>
</template>

<script>
import axios from "./../axios.js";
import NotificationBellIcon from "./../assets/svgIcons/NotificationBellIcon.vue";

export default {
  emits: ["user-rerender-drawer", "dialog"],
  components: { NotificationBellIcon },
  data: () => ({
    currentUserName: null,
    currentUserRole: null,
    todayDate: "",
    items: [
      {
        id: 1,
        title: "خروج از حساب",
        icon: "mdi-logout-variant",
      },
    ],
    items_2: [{ title: "موردی یافت نشد" }],
  }),
  created() {
    this.currentUserName = this.$cookies.get("currentUserName");
    console.log(this.$cookies.get("currentUserName"));
    // this.getData();
    this.setJalaliDate();
  },
  methods: {
    goToItem(id) {
      if (id == 1) {
        this.$cookies.remove("usersDetailsActive");
        this.$cookies.remove("userToken");
        this.$cookies.set("userEntered", false);
        this.$cookies.remove("userToken");
        this.$cookies.remove("userRefreshToken");
        this.$cookies.remove("currentUserName");
        this.$router.push({ name: "signupLogin" });
      }
    },
    getData(perm) {
      if (perm == 1) {
        axios({
          method: "GET",
          url: `dashboard/?session=${this.$cookies.get("sessionId")}`,
          headers: {
            Authorization: `Bearer ${this.$cookies.get("userToken")}`,
            "Content-Type": "application/json",
          },
        })
          .then((response) => {
            if (response.status == 200) {
              this.$cookies.set("currentUserName", response.data.first_name);
              this.$cookies.set("currentUserRole", "والد");
              this.$emit("user-rerender-drawer", 3);
              this.$cookies.remove("addChildActive");
              this.$cookies.remove("parentsDetailsActive");
              this.$cookies.remove("coursesShopActive");
              // this.$emit("reset-app");
              this.$router.push({ name: "courseShop" });
            } else {
              this.$swal("مشکلی پیش آمد!", response.message, "error");
            }
          })
          .catch((err) => {
            this.$swal("مشکلی پیش آمد!", err.message, "error");
          });
      } else {
        axios({
          method: "GET",
          url: `dashboard/?session=${this.$cookies.get("sessionId")}`,
          header: "application/json",
          headers: {
            Authorization: `Bearer ${this.$cookies.get("userToken")}`,
            "Content-Type": "application/json",
          },
        })
          .then((response) => {
            if (response.status == 200) {
              this.$cookies.set("currentUserName", response.data.first_name);
              this.$cookies.set("currentUserRole", "والد");
              this.children = response.data.children;
              for (let i = 0; i < this.children.length; i++) {
                if (this.children[i].type == 1) {
                  this.children[i].type = "۴-۷ سال";
                } else if (this.children[i].type == 2) {
                  this.children[i].type = "۸-۱۱ سال";
                } else {
                  this.children[i].type = "۱۲-۱۵ سال";
                }
              }
            } else {
              if (response.status == 401) {
                this.$cookies.set("userEntered", false);
                this.$cookies.set("adminEntered", false);
                this.$router.push({ name: "signupLogin" });
                this.$swal(
                  "توکن شما منقضی شده است!",
                  response.message,
                  "error"
                );
              } else {
                this.$swal("مشکلی پیش آمد!", response.message, "error");
              }
            }
          })
          .catch((err) => {
            if (err.response.status == 401) {
              this.$cookies.set("userEntered", false);
              this.$cookies.set("adminEntered", false);
              this.$router.push({ name: "signupLogin" });
              this.$swal("توکن شما منقضی شده است!", err.message, "error");
            } else {
              this.$swal("مشکلی پیش آمد!", err.message, "error");
            }
          });
      }
    },
    setJalaliDate() {
      const options = {
        weekday: "long",
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      };
      this.todayDate = new Date().toLocaleDateString("fa-IR", options);
    },
  },
};
</script>
<style scoped>
.flex_class {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.mainBar {
  width: 80% !important;
  height: 8%;
}
.contentBar {
  width: 100% !important;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.welcomePart {
  margin-right: 5%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.welcomeNote h3 {
  font-weight: 700;
  color: #a1834e;
}
.datePart p {
  direction: ltr !important;
  writing-mode: horizontal-tb;
  margin-right: 10px;
  font-weight: 400;
  color: #a1834e;
}
.userProfilePart {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 40px !important;
  height: 100%;
}
.iconPart {
  position: relative;
  cursor: pointer;
}
.iconNum {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 13px;
  height: 13px;
  border-radius: 50%;
  background-color: #ff9635;
  color: white;
  font-size: 10px;
  text-align: center;
  left: 0px;
  top: 0px !important;
}
.dividerContainer {
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.dividerClass {
  align-self: center;
  margin-right: 10px;
  margin-left: 10px;
}
.userPart {
  width: 100% !important;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.topText {
  font-size: 18px;
  color: #a1834e;
}
.bottomText {
  font-size: 15px;
  opacity: 0.5;
  color: #a1834e;
}
@media screen and (max-width: 1209px) {
  .mainBar {
    display: none;
  }
}
</style>
<style>
@font-face {
  font-family: danaRegular;
  src: url("./assets/fonts/Dana-Regular.ttf");
}
.v-menu > .v-overlay__content > .v-card,
.v-menu > .v-overlay__content > .v-sheet,
.v-menu > .v-overlay__content > .v-list {
  font-family: danaRegular !important;
}
.v-list-item-title {
  font-size: 14px !important;
}
</style>
