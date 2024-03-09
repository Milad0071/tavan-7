<template>
  <v-app style="height: 100% !important; font-family: danaRegular !important">
    <v-locale-provider rtl>
      <div class="desktopInstagramContainer">
        <div class="desktopInstagramContent">
          <div class="desktopInstagramDescription">
            <h2>کاربر گرامی این نسخه مخصوص رایانه است</h2>
            <h2>لطفا با رایانه وارد شوید</h2>
          </div>
        </div>
      </div>
      <div class="mainBody">
        <div class="mainLogSignBody">
          <!-- login/signup part -->
          <div class="loginPartContainer flex_class">
            <div class="mainBox flex_class">
              <div class="flex_column_class">
                <!-- sanjab logo -->
                <tavanHaftLogo style="width: 50%; margin-top: -10%" />
                <!-- title part -->
                <div class="text_part flex_column_class">
                  <h2 style="color: #a1834e">ورود/ ثبت‌ نام توان ۷</h2>
                  <h3 class="mt-2" style="color: #a1834e">
                    به توان ۷ خوش اومدی! جهت ورود یا ثبت‌ نام، شماره همراهتو
                    وارد کن
                  </h3>
                </div>
                <!-- phone input -->
                <div v-if="showVerificationPart == false" class="input_part">
                  <h4 class="loginText">تلفن همراه</h4>
                  <v-text-field
                    class="ltrClass input_1"
                    ref="focusPhone"
                    reverse
                    v-on:keydown="stopChars($event), sendRequest($event)"
                    variant="plain"
                    placeholder="شماره تلفن همراه خود را وارد کنید"
                    v-model="userPhoneNum"
                  >
                    <template v-slot:prepend>
                      <loginPhoneIcon style="width: 100%; margin-top: -40%" />
                    </template>
                  </v-text-field>
                  <p
                    v-if="userPhoneNumError == true"
                    style="color: red; font-weight: fold"
                  >
                    لطفا شماره تلفن را درست وارد کنید!
                  </p>
                </div>
                <!-- otp code -->
                <div v-else class="input_part">
                  <div class="belowInputItems flex_class">
                    <h4 class="loginText">
                      کد ارسالی به شماره {{ userPhoneNum }}
                    </h4>
                    <p class="mr-1 changePhoneText" @click="changeNumFunc()">
                      (تغییر شماره تلفن)
                    </p>
                  </div>
                  <v-locale-provider ltr>
                    <v-otp-input
                      v-model="otp"
                      class="ss03"
                      ref="focusOtp"
                      autofocus
                      reverse
                      variant="plain"
                      color="#F4F5F6"
                      length="4"
                    ></v-otp-input>
                  </v-locale-provider>
                  <div
                    v-if="startCountDown == true"
                    class="belowInputItems flex_class ss03"
                  >
                    <div v-if="shortTimer > 9" class="flex_class">
                      02:{{ shortTimer }}
                    </div>
                    <div
                      v-else-if="shortTimer <= 9 && shortTimer >= 0"
                      class="flex_class"
                    >
                      02:0{{ shortTimer }}
                    </div>
                    <div
                      v-else-if="timer > 9 && oneMin == false"
                      class="flex_class"
                    >
                      01:{{ timer }}
                    </div>
                    <div
                      v-else-if="timer >= 0 && timer <= 9 && oneMin == false"
                      class="flex_class"
                    >
                      01:0{{ timer }}
                    </div>
                    <div
                      v-else-if="timer > 9 && oneMin == true"
                      class="flex_class"
                    >
                      00:{{ timer }}
                    </div>
                    <div
                      v-else-if="timer >= 0 && timer <= 9 && oneMin == true"
                      class="flex_class"
                    >
                      00:0{{ timer }}
                    </div>
                    <p class="mr-1">تا ارسال مجدد پیامک</p>
                  </div>
                  <div v-else>
                    <p
                      class="mr-1 sendAgainClass"
                      @click="logninFunc(userPhoneNum)"
                    >
                      ارسال مجدد پیامک
                    </p>
                  </div>
                </div>
                <div
                  v-if="showVerificationPart == false"
                  class="btnContainer flex_class"
                >
                  <v-btn
                    :loading="phoneBtnLoading"
                    append-icon="mdi-arrow-left-thin"
                    color="#A1834E"
                    class="text-none childBtn"
                    size="large"
                    min-width="200"
                    variant="outlined"
                    @click="logninFunc(userPhoneNum)"
                  >
                    ادامه
                  </v-btn>
                </div>
                <div v-else class="btnContainer flex_class">
                  <v-btn
                    v-if="sendAgain == false"
                    :loading="verificationBtnLoading"
                    color="#00AAA3"
                    class="text-none childBtn"
                    size="large"
                    min-width="200"
                    variant="outlined"
                    @click="validateCode(otp)"
                  >
                    تایید شماره
                  </v-btn>
                </div>
              </div>
            </div>
          </div>
          <!-- login pic part -->
          <div v-if="showVerificationPart == false" class="picPart"></div>
          <div v-else class="verificationPicPart"></div>
        </div>
      </div>
    </v-locale-provider>
  </v-app>
</template>

<script>
import axios from "./../axios.js";
import tavanHaftLogo from "./../assets/svgIcons/loginLogo.vue";
import loginPhoneIcon from "./../assets/svgIcons/loginInputPhoneIcon.vue";

export default {
  emits: ["reset-app"],
  components: { tavanHaftLogo, loginPhoneIcon },
  data() {
    return {
      timer: 59,
      shortTimer: 10,
      userPhoneNum: "",
      otp: "",
      oneMin: false,
      twoMin: false,
      sendAgain: false,
      startCountDown: false,
      phoneBtnLoading: false,
      verificationBtnLoading: false,
      userPhoneNumError: false,
      // userType: true,
      showVerificationPart: false,
    };
  },
  watch: {
    userPhoneNum(newVal) {
      this.userPhoneNum = this.toFarsiNumber(newVal);
      if (newVal.length > 0) {
        this.userPhoneNumError = false;
      }
    },
    otp(newVal) {
      if (newVal.length == 4) {
        this.validateCode(this.otp);
      }
    },
  },
  created() {
    this.$nextTick(() => this.$refs.focusPhone.focus());
  },
  methods: {
    stopChars(e) {
      if (e.key.match(/^[a-zA-Z]*$/) && !(e.key == "Backspace")) {
        e.preventDefault();
      }
    },
    toFarsiNumber(n) {
      if (n.length == 0) {
        return;
      }
      n = n.toString();
      var englishNumbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
        persianNumbers = ["۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹", "۰"];

      for (var i = 0, numbersLen = englishNumbers.length; i < numbersLen; i++) {
        n = n.replace(new RegExp(englishNumbers[i], "g"), persianNumbers[i]);
      }
      return n;
    },
    toEngNumber(n) {
      if (n.length == 0) {
        return;
      }
      n = n.toString();
      var englishNumbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
        persianNumbers = ["۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹", "۰"];

      for (var i = 0, numbersLen = englishNumbers.length; i < numbersLen; i++) {
        n = n.replace(new RegExp(persianNumbers[i], "g"), englishNumbers[i]);
      }
      return n;
    },
    emptyCheck(phoneNum) {
      if (phoneNum == null || phoneNum == "") {
        this.userPhoneNumError = true;
      }
      if (phoneNum == null || phoneNum == "") {
        return false;
      } else {
        return true;
      }
    },
    logninFunc(userPhoneNum) {
      this.otp = "";
      this.shortTimer = 10;
      this.timer = 59;
      this.oneMin = false;
      this.twoMin = false;
      this.phoneBtnLoading = true;
      this.sendAgain = false;
      userPhoneNum = this.toEngNumber(userPhoneNum);
      if (this.emptyCheck(userPhoneNum) === true) {
        // this.$router.push({ name: "Home" });
        var bodyFormData = new FormData();
        JSON.stringify(bodyFormData.append("phone_number", userPhoneNum));
        axios({
          method: "POST",
          url: "account/login-register/",
          headers: {
            "Content-Type": "application/json",
          },
          data: bodyFormData,
        })
          .then((response) => {
            if (response.status == 200) {
              this.startCountDown = true;
              this.countDownTimer();
              this.$cookies.set("sessionId", response.data);
              this.phoneBtnLoading = false;
              this.showVerificationPart = true;
              this.$nextTick(() => this.$refs.focusOtp.focus());
            } else {
              this.$swal("مشکلی پیش آمد!", response.message, "error");
              this.phoneBtnLoading = false;
            }
          })
          .catch((err) => {
            this.phoneBtnLoading = false;
            if (err.request.status == 500) {
              this.$swal(
                "مشکلی پیش آمد!",
                "پس از ۲ دقیقه مجدد تلاش نمایید!",
                "error"
              );
            } else if (err.request.status == 429) {
              this.$swal(
                "ارسال درخواست بیش از حد به سرور!",
                "پس از دو دقیقه مجدد تلاش نمایید!",
                "error"
              );
            } else {
              this.$swal(
                "مشکلی پیش آمد!",
                "پس از دو دقیقه مجدد تلاش نمایید!",
                "error"
              );
            }
          });
      } else {
        this.phoneBtnLoading = false;
      }
    },
    sendRequest(e) {
      console.log(e);
      if (e.code == "Enter" || e.code == "NumpadEnter") {
        this.logninFunc(this.userPhoneNum);
      }
    },
    countDownTimer() {
      if (this.shortTimer >= 0) {
        this.twoMin = true;
        setTimeout(() => {
          this.shortTimer -= 1;
          this.countDownTimer();
        }, 1000);
      } else {
        this.twoMin = false;
        if (this.timer >= 0) {
          setTimeout(() => {
            this.timer -= 1;
            this.countDownTimer();
          }, 1000);
        } else {
          if (this.oneMin == false) {
            this.oneMin = true;
            this.startCountDown = true;
            this.sendAgain = false;
            this.timer = 59;
            this.countDownTimer();
          } else {
            this.oneMin = false;
            this.startCountDown = false;
            this.sendAgain = true;
          }
        }
      }
    },
    validateCode(otpCode) {
      this.verificationBtnLoading = true;
      var bodyFormData = new FormData();
      JSON.stringify(bodyFormData.append("code", otpCode));
      axios({
        method: "POST",
        url: `account/phone-verification/?session=${this.$cookies.get(
          "sessionId"
        )}`,
        headers: {
          "content-type": "application/json",
        },
        data: bodyFormData,
      })
        .then((response) => {
          if (response.status == 200 || response.status == 201) {
            if (response.data.is_registered == false) {
              this.showVerificationPart = false;
              this.verificationBtnLoading = false;
              this.$cookies.set("firstTimeUsersDetails");
              this.$router.push({ name: "usersDetails" });
            } else {
              this.$cookies.set("userToken", response.data.access);
              this.$cookies.set("userRefreshToken", response.data.refresh);
              this.$cookies.set("userEntered", true);
              this.$cookies.set("showBars");
              if (
                this.$cookies.get("userEntered") == true ||
                this.$cookies.get("userEntered") == "true"
              ) {
                this.$emit("reset-app");
                this.$router.push({ name: "Home" });
                this.$cookies.remove("currentUserName");
                this.$cookies.remove("currentUserRole");
                this.showVerificationPart = false;
                this.verificationBtnLoading = false;
              }
            }
          } else {
            this.verificationBtnLoading = false;
            if (response.status == 403) {
              this.$swal("کد اشتباه است!", "مجدد تلاش کنید", "error");
            } else {
              this.$swal("مشکلی پیش آمد!", "مجدد تلاش کنید", "error");
            }
          }
        })
        .catch((err) => {
          this.verificationBtnLoading = false;
          if (err.request.status == 500) {
            this.$swal(
              "مشکلی پیش آمد!",
              "پس از ۲ دقیقه مجدد تلاش نمایید!",
              "error"
            );
          } else if (err.request.status == 429) {
            this.$swal(
              "ارسال درخواست بیش از حد به سرور!",
              "پس از دو دقیقه مجدد تلاش نمایید!",
              "error"
            );
          } else if (err.request.status == 403) {
            this.$swal("کد اشتباه است!", "مجدد تلاش کنید", "error");
          } else {
            this.$swal(
              "مشکلی پیش آمد!",
              "پس از دو دقیقه مجدد تلاش نمایید!",
              "error"
            );
          }
        });
    },
    changeNumFunc() {
      this.showVerificationPart = false;
    },
  },
};
</script>
<style scoped>
.flex_class {
  display: flex;
  justify-content: center;
  align-items: center;
}
.flex_column_class {
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
}
.mainBody {
  background-size: cover;
  height: 100vh !important;
}
.mainLogSignBody {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 98vh;
}
.picPart {
  width: 110vh;
  height: 102vh;
  background-image: url("./../assets/loginPic.png");
  background-size: cover;
}
.verificationPicPart {
  width: 110vh;
  height: 98vh;
  background-image: url("./../assets/loginPic.png");
  background-size: cover;
}
.loginPartContainer {
  font-family: danaRegular;
  width: 50%;
  height: 100%;
  background-color: white;
}
.mainBox {
  width: 100%;
  min-height: 300px !important;
}
.input_part {
  display: flex;
  flex-flow: column;
  justify-content: center;
  width: 75%;
  padding: 0% 10%;
  margin-top: 5%;
}
.text_part {
  margin-top: -10%;
}
.input_1 {
  margin-top: 1%;
  padding-top: 0 !important;
  max-height: 50px;
  padding-right: 10px;
  padding-left: 10px;
  border-radius: 7px;
  border: 2px solid white;
  background-color: #f4f5f6;
}
input:focus {
  border: 2px solid white;
  outline-width: 0;
}
input:-ms-input-placeholder {
  text-align: right;
  color: #a1834e;
  opacity: 0.8;
}
input::-webkit-input-placeholder {
  text-align: right;
  color: #a1834e;
  opacity: 0.8;
}
input::-moz-placeholder {
  text-align: right;
  color: #a1834e;
  opacity: 0.8;
}
.loginText {
  text-align: right;
  font-size: 20px;
  color: #a1834e;
}
.btnContainer {
  width: 90%;
}
.childBtn {
  font-weight: bold;
  color: white !important;
  background-color: #00aaa3;
  width: 60%;
  height: 3rem;
  margin-top: 6%;
  align-self: center;
}
.sendAgainClass {
  cursor: pointer;
  color: #00aaa3;
  font-size: 18px;
  font-weight: 700;
}
.belowInputItems {
  font-family: danaRegular !important;
  font-size: 18px;
  font-weight: 700;
  color: #a1834e;
  align-self: flex-start !important;
}
.changePhoneText {
  color: #00aaa3;
  cursor: pointer;
}
.desktopInstagramContainer {
  display: none;
}
@media screen and (max-width: 1209px) {
  .mainBody {
    display: none;
  }
  .desktopInstagramContainer {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
}
</style>
<style>
@font-face {
  font-family: danaRegular;
  src: url("./../assets/fonts/Dana-Regular.ttf");
}
.ss03 {
  -moz-font-feature-settings: "ss03";
  -webkit-font-feature-settings: "ss03";
  font-feature-settings: "ss03";
}
.v-selection-control--inline .v-label {
  font-size: 28px;
}
.vpd-container {
  left: 80% !important;
}
.v-field--variant-underlined .v-label.v-field-label,
.v-field--variant-plain .v-label.v-field-label {
  top: 0% !important;
}
.ltrClass > .v-field--variant-underlined .v-label.v-field-label,
.v-field--variant-plain .v-label.v-field-label {
  right: 0 !important;
  margin-top: 1.5% !important;
  font-size: 16px;
}
.ltrClass {
  position: relative;
}
.ltrClass input::placeholder {
  position: absolute;
  font-size: 16px;
  color: #8a8b8d;
}
.ltrClass .v-field--reverse .v-field__input,
.v-field--reverse input {
  font-size: 20px;
  margin-top: -10px;
}
.mdi-phone-in-talk::before {
  content: "\F03F6";
  margin-top: -13px;
}
.v-otp-input--divided .v-otp-input__content {
  max-width: 450px !important;
}
.v-otp-input .v-field {
  width: 100% !important;
}
</style>
