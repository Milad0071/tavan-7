<template>
  <v-app>
    <v-locale-provider rtl>
      <div class="desktopInstagramContainer">
        <div class="desktopInstagramContent">
          <div class="desktopInstagramDescription">
            <h2>کاربر گرامی این نسخه مخصوص رایانه است</h2>
            <h2>لطفا با رایانه وارد شوید</h2>
          </div>
        </div>
      </div>
      <div class="mainContainer">
        <!-- title part -->
        <div class="titlePart">
          <div class="titleShape"></div>
          <h3>دانشجوی عزیز، لطفا فرم زیر را تکمیل نمایید</h3>
        </div>
        <div class="inputContainer row">
          <div class="input_part">
            <!-- parent name -->
            <h4 class="loginText">نام</h4>
            <v-text-field
              class="input_1"
              placeholder="نام خود را وارد کنید"
              variant="plain"
              v-on:keydown="stopEnglishChars($event)"
              v-model="userName"
            >
            </v-text-field>
            <p
              v-if="userNameError == true"
              style="color: red; font-weight: fold"
            >
              فیلد نام نباید خالی باشد!
            </p>
          </div>
          <div class="input_part">
            <!-- parent last name -->
            <h4 class="loginText">نام خانوادگی</h4>
            <v-text-field
              class="input_1"
              variant="plain"
              placeholder="نام خانوادگی خود را وارد کنید"
              v-on:keydown="stopEnglishChars($event)"
              v-model="userLastName"
            >
            </v-text-field>
            <p
              v-if="userLastNameError == true"
              style="color: red; font-weight: fold"
            >
              فیلد نام خانوادگی نباید خالی باشد!
            </p>
          </div>
          <div class="input_part">
            <h4 class="loginText">نام پدر</h4>
            <v-text-field
              class="input_1"
              variant="plain"
              placeholder="نام پدر خود را وارد کنید"
              v-on:keydown="stopEnglishChars($event)"
              v-model="userFatherName"
            >
            </v-text-field>
            <p
              v-if="userFatherNameError == true"
              style="color: red; font-weight: fold"
            >
              فیلد نام پدر نباید خالی باشد!
            </p>
          </div>
          <div class="input_part">
            <!-- national code input -->
            <h4 class="loginText">کد ملی</h4>
            <v-text-field
              class="ltrClass input_1"
              reverse
              variant="plain"
              v-on:keydown="stopAllChars($event)"
              placeholder="کد ملی خود را وارد کنید"
              v-model="userNationalCode"
            >
            </v-text-field>
            <p
              v-if="userNationalCodeError == true"
              style="color: red; font-weight: fold"
            >
              فیلد کد ملی نباید خالی باشد!
            </p>
          </div>
          <div class="input_part">
            <!-- Birth day field -->
            <h4 class="loginText">تاریخ تولد</h4>
            <DatePicker
              format="jYYYY/jMM/jDD"
              simple
              class="datePickerClass"
              placeholder="1370/01/01"
              v-model="userBirthDay"
            />
            <p
              v-if="userBirthDayError == true"
              style="color: red; font-weight: fold"
            >
              فیلد تاریخ تولد نباید خالی باشد!
            </p>
          </div>
          <div class="input_part">
            <!-- Edjucation field -->
            <h4 class="loginText">تحصیلات</h4>
            <v-text-field
              class="input_1"
              variant="plain"
              placeholder="عنوان تحصیلات خود را وارد کنید"
              v-model="userEdjucation"
            >
            </v-text-field>
          </div>
          <div class="input_part">
            <!-- phone number field -->
            <h4 class="loginText">تلفن همراه</h4>
            <v-text-field
              class="ltrClass input_1"
              variant="plain"
              reverse
              placeholder="شماره تلفن همراه خود را وارد کنید"
              v-on:keydown="stopAllChars($event)"
              v-model="userPhoneNumber"
            >
            </v-text-field>
            <p
              v-if="userPhoneNumberError == true"
              style="color: red; font-weight: fold"
            >
              فیلد تلفن همراه نباید خالی باشد!
            </p>
          </div>
          <div class="input_part">
            <!-- Telephone field -->
            <h4 class="loginText">تلفن ثابت</h4>
            <v-text-field
              class="ltrClass input_1"
              variant="plain"
              reverse
              placeholder="شماره تلفن ثابت خود را وارد کنید"
              v-on:keydown="stopAllChars($event)"
              v-model="userTelephone"
            >
            </v-text-field>
            <p
              v-if="userTelephoneError == true"
              style="color: red; font-weight: fold"
            >
              فیلد تلفن ثابت نباید خالی باشد!
            </p>
          </div>
        </div>
        <div class="btnContainer flex_class">
          <v-btn
            :loading="phoneBtnLoading"
            color="#A1834E"
            class="text-none submitBtn"
            size="large"
            min-width="200"
            variant="outlined"
            @click="
              signupFunc(
                userName,
                userLastName,
                userFatherName,
                userNationalCode,
                userBirthDay,
                userEdjucation,
                userPhoneNumber,
                userTelephone,
              )
            "
          >
            ثبت
          </v-btn>
          <v-btn
            color="#A1834E"
            class="text-none closeBtn"
            size="large"
            min-width="200"
            variant="outlined"
            @click="backToHome()"
          >
            انصراف
          </v-btn>
        </div>
      </div>
    </v-locale-provider>
  </v-app>
</template>
<script>
import axios from "../axios.js";
import DatePicker from "vue3-persian-datetime-picker";

export default {
  components: { DatePicker },
  props: {
    numPage: {
      type: Number,
    },
  },
  emits: ["reset-app"],
  data() {
    return {
      phoneBtnLoading: false,
      userNameError: false,
      userLastNameError: false,
      userFatherNameError: false,
      userNationalCodeError: false,
      userEdjucationError: false,
      userPhoneNumberError: false,
      userTelephoneError: false,
      userBirthDayError: false,
      userName: "",
      userLastName: "",
      userFatherName: "",
      userNationalCode: "",
      userBirthDay: "",
      userEdjucation: "",
      userPhoneNumber: "",
      userTelephone: "",
    };
  },
  watch: {
    userName(newVal) {
      if (newVal.length > 0) {
        this.userNameError = false;
      }
    },
    userLastName(newVal) {
      if (newVal.length > 0) {
        this.userLastNameError = false;
      }
    },
    userFatherName(newVal) {
      if (newVal.length > 0) {
        this.userFatherNameError = false;
      }
    },
    userNationalCode(newVal) {
      this.userNationalCode = this.toFarsiNumber(newVal);
      if (newVal.length > 0) {
        this.userNationalCodeError = false;
        this.userCitizenCodeError == false;
      }
    },
    userBirthDay(newVal) {
      if (newVal.length > 0) {
        this.userBirthDayError = false;
      }
    },
    userEdjucation(newVal) {
      if (newVal.length > 0) {
        this.userEdjucationError = false;
      }
    },
    userPhoneNumber(newVal) {
      this.userPhoneNumber = this.toFarsiNumber(newVal);
      if (newVal.length > 0) {
        this.userPhoneNumberError = false;
      }
    },
    userTelephone(newVal) {
      this.userTelephone = this.toFarsiNumber(newVal);
      if (newVal.length > 0) {
        this.userTelephoneError = false;
      }
    }
  },
  methods: {
    stopAllChars(e) {
      if (
        e.key.match(/^[a-zA-Zا-ی]*$/) &&
        !(e.key == "Backspace") &&
        !(e.key == "Tab")
      ) {
        e.preventDefault();
      }
    },
    stopEnglishChars(e) {
      if (
        e.key.match(/^[a-zA-Z0-9۰-۹]*$/) &&
        !(e.key == "Backspace") &&
        !(e.key == "Tab")
      ) {
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
    toEnglishNumber(n) {
      // n = parseInt(n);
      if (n.length == 0) {
        return;
      }
      n = n.toString();
      var englishNumbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
        persianNumbers = ["۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹", "۰"];

      for (var i = 0, numbersLen = persianNumbers.length; i < numbersLen; i++) {
        n = n.replace(new RegExp(persianNumbers[i], "g"), englishNumbers[i]);
      }
      return n;
    },
    jalaliToGregorian(j_y, j_m, j_d, JalaliDate) {
      j_y = parseInt(j_y);
      j_m = parseInt(j_m);
      j_d = parseInt(j_d);
      var jy = j_y - 979;
      var jm = j_m - 1;
      var jd = j_d - 1;

      var j_day_no =
        365 * jy + parseInt(jy / 33) * 8 + parseInt(((jy % 33) + 3) / 4);
      for (var i = 0; i < jm; ++i) j_day_no += JalaliDate.j_days_in_month[i];

      j_day_no += jd;

      var g_day_no = j_day_no + 79;

      var gy =
        1600 +
        400 *
          parseInt(
            g_day_no / 146097
          ); /* 146097 = 365*400 + 400/4 - 400/100 + 400/400 */
      g_day_no = g_day_no % 146097;

      var leap = true;
      if (g_day_no >= 36525) {
        /* 36525 = 365*100 + 100/4 */
        g_day_no--;
        gy +=
          100 *
          parseInt(g_day_no / 36524); /* 36524 = 365*100 + 100/4 - 100/100 */
        g_day_no = g_day_no % 36524;

        if (g_day_no >= 365) g_day_no++;
        else leap = false;
      }

      gy += 4 * parseInt(g_day_no / 1461); /* 1461 = 365*4 + 4/4 */
      g_day_no %= 1461;

      if (g_day_no >= 366) {
        leap = false;

        g_day_no--;
        gy += parseInt(g_day_no / 365);
        g_day_no = g_day_no % 365;
      }

      for (
        var j = 0;
        g_day_no >= JalaliDate.g_days_in_month[j] + (j == 1 && leap);
        j++
      )
        g_day_no -= JalaliDate.g_days_in_month[j] + (j == 1 && leap);
      var gm = j + 1;
      var gd = g_day_no + 1;

      gm = gm < 10 ? "0" + gm : gm;
      gd = gd < 10 ? "0" + gd : gd;

      return [gy, gm, gd];
    },
    convertToGerigorian(date) {
      var JalaliDate = {
        g_days_in_month: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
        j_days_in_month: [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29],
      };
      let dateSplitted = date.split("/"),
        jD = this.jalaliToGregorian(
          dateSplitted[0],
          dateSplitted[1],
          dateSplitted[2],
          JalaliDate
        );
      let result = jD[0] + "/" + jD[1] + "/" + jD[2];
      return result;
    },
    backToHome() {
      this.$emit("reset-app");
      this.$emit("user-rerender-drawer", 0);
      if (this.$cookies.get("firstTimeUserDetails")) {
        this.$cookies.remove("firstTimeUserDetails");
      }
      this.$router.push({ name: "Home" });
    },
    emptyCheck(itemArray) {
      let emptyCheck = false;
      for (let i = 0; i < itemArray.length; i++) {
        if (itemArray[i] == "" || itemArray[i] == null) {
          emptyCheck = true;
          if (i == 0) {
            this.userNameError = true;
          } else if (i == 1) {
            this.userLastNameError = true;
          } else if (i == 2) {
            this.userFatherNameError = true;
          } else if (i == 4) {
            this.userNationalCodeError = true;
          } else if (i == 5) {
            this.userBirthDayError = true;
          } else if (i == 7) {
            this.userEdjucationError = true;
          } else if (i == 3) {
            this.userPhoneNumberError = true;
          } else if (i == 6) {
            this.userTelephoneError = true;
          }
        }
      }
      if (emptyCheck == true) {
        this.$swal("لطفا فیلدهای خالی رو پر کنید!", "", "warning");
        return false;
      } else {
        return true;
      }
    },
    closeFunc() {
      this.dialog = false;
      this.userName = "";
      this.userLastName = "";
      this.userNationalCode = "";
      this.userBirthDay = "";
      this.userEdjucation = "";
      this.userSchoolStudy = "";
      this.whichChild = "";
      this.userNameError = false;
      this.userLastNameError = false;
      this.userNationalCodeError = false;
      this.userEdjucationError = false;
      this.userSchoolStudyError = false;
      this.whichChildError = false;
    },
    signupFunc(
      userName,
      userLastName,
      userFatherName,
      userNationalCode,
      userBirthDay,
      userEdjucation,
      userPhoneNumber,
      userTelephone,
    ) {
      this.phoneBtnLoading = true;
      let itemArray = [
        userName,
        userLastName,
        userFatherName,
        userNationalCode,
        userBirthDay,
        userEdjucation,
        userPhoneNumber,
        userTelephone
      ];
      if (this.emptyCheck(itemArray) == true) {
        userNationalCode = this.toEnglishNumber(userNationalCode);
        var data = {
          first_name: userName,
          last_name: userLastName,
          national_code: userNationalCode,
          phone_number: userPhoneNumber,
          user_profile: {
            father_name: userFatherName,
            education: userEdjucation,
            telephone: userTelephone,
            // birth_date: birthDay
          },
        };
        axios({
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          url: `account/user-register/?session=${this.$cookies.get(
            "sessionId"
          )}`,
          data: JSON.stringify(data),
        })
          .then((response) => {
            if (response.status == 201) {
              this.phoneBtnLoading = false;
              this.$cookies.set("userToken", response.data.access);
              this.$cookies.set("userEntered", true);
              if (this.$cookies.get("firstTimeUserDetails")) {
                this.$cookies.remove("firstTimeUserDetails");
              }
              this.$emit("reset-app");
              this.$router.push({ path: "/home" });
            } else {
              this.phoneBtnLoading = false;
              this.$swal("مشکلی پیش آمد، لطفا مجددا تلاش نمایید!", "error");
              if (response.status == 401) {
                this.$cookies.set("userEntered", false);
                this.$router.push({ name: "SignupLogin" });
              }
            }
          })
          .catch((err) => {
            this.phoneBtnLoading = false;
            this.$swal("مشکلی پیش آمد!", err.message, "error");
            if (err.response.status == 401) {
              this.$cookies.set("userEntered", false);
              this.$router.push({ name: "SignupLogin" });
            }
          });
      }
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
.mainContainer {
  position: relative;
  margin: 5%;
}
.titlePart {
  display: flex;
  margin-top: 10px;
  margin-bottom: 20px;
  padding-right: 3%;
}
.titlePart h3 {
  margin-right: 10px;
  color: #1b1c1c;
  font-size: 22px;
  font-weight: bold;
}
.titleShape {
  border: 3px solid #00AAA3;
  border-radius: 7px;
}
.inputContainer {
  display: grid;
  grid-gap: 2%;
  grid-template-columns: repeat(3, minmax(350px, 10fr));
  justify-items: center;
  padding: 0%;
}
.input_part {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0% 10%;
  margin-top: 0%;
}
.input_1 {
  max-height: 50px;
  padding-right: 10px;
  padding-left: 10px;
  border-radius: 8px;
  background-color: #f4f5f6;
  font-family: danaRegular !important;
}
.loginText {
  text-align: right;
  font-size: 20px;
  color: #A1834E;
  font-weight: 700;
  margin-bottom: 10px;
}
.childText {
  color: #8a8b8d;
  font-weight: 500;
}
.input_children {
  width: 70px;
  min-height: 50px;
  padding-right: 20px;
  margin-right: 20px;
  border-radius: 7px;
  background-color: #f4f5f6;
}
.textareaClass {
  width: 100%;
  border-radius: 7px;
  background-color: #f4f5f6;
}
.datePickerClass {
  min-height: 50px;
  border-radius: 7px;
  color: #A1834E;
}
.btnContainer {
  width: 100%;
  margin-top: 5%;
}
.submitBtn {
  font-weight: bold;
  color: white !important;
  background-color: #00AAA3;
  width: 44%;
  border-radius: 12px;
}
.closeBtn {
  font-weight: bold;
  color: #A1834E !important;
  width: 44%;
  margin-right: 5%;
  border-radius: 12px;
}
.desktopInstagramContainer {
  display: none;
}
@media screen and (max-width:1209px) {
  .mainContainer {
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
  src: url("./assets/fonts/Dana-Regular.ttf");
}
.vpd-input-group {
  min-height: 50px;
}
.vpd-input-group label {
  border-radius: 0px 7px 7px 0px;
  background-color: #00AAA3 !important;
}
.vpd-input-group input:not(.vpd-is-editable) {
  border-radius: 7px 0px 0px 7px;
  width: 100% !important;
}
.vpd-icon-btn {
  padding: 0 15px;
}
.v-field--variant-underlined .v-label.v-field-label,
.v-field--variant-plain .v-label.v-field-label {
  top: 20% !important;
}
.ltrClass > .v-field--variant-underlined .v-label.v-field-label,
.v-field--variant-plain .v-label.v-field-label {
  right: 0 !important;
  margin-top: 2% !important;
}
.textareaClass > .v-field--variant-underlined .v-label.v-field-label,
.v-field--variant-plain .v-label.v-field-label {
  right: 0 !important;
  margin-top: 2% !important;
}
.ltrClass {
  position: relative;
}
.ltrClass input::placeholder {
  position: absolute;
}
.v-input__details {
  min-height: 0 !important;
}
.vpd-input-group label {
  border-radius: 0px 8px 8px 0px;
  background-color: #f4f5f6 !important;
}
.vpd-input-group input:not(.vpd-is-editable) {
  border-radius: 8px 0px 0px 8px;
  background-color: #f4f5f6;
  border: none !important;
}
.datePickerClass svg {
  fill: #A1834E !important;
}
.vpd-content {
  border-radius: 12px;
}
.vpd-main *,
.vpd-wrapper * {
  color: #00AAA3 !important;
}
</style>