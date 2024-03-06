<template>
  <v-app class="appClass">
    <v-locale-provider rtl>
      <div class="desktopInstagramContainer">
        <div class="desktopInstagramContent">
          <div class="desktopInstagramDescription">
            <h2>کاربر گرامی این نسخه مخصوص رایانه است</h2>
            <h2>لطفا با رایانه وارد شوید</h2>
          </div>
        </div>
      </div>
      <div class="mainPart">
        <!-- desktop contents -->
        <div class="bodyContainer flex_column_class">
          <!-- text part -->
          <div class="textPart">
            <h3>
              دانشجوی گرامی، پرسشنامه رغبت‌سنج استرانگ به شما در فهم رغبت‌های
              شغلی‌تان کمک نموده و انواع مشاغلی که احتمالاً در آن‌ها احساس راحتی
              می‌کنید را به شما نشان می‌دهد.
            </h3>
            <h3>
              لطفاً به همه پرسش‌ها پاسخ دهید. وقت زیادی را به فکر کردن در مورد
              آن‌ها اختصاص ندهید و اولین چیزی که به ذهنتان می‌رسد را منظور
              نمایید.
            </h3>
          </div>
          <!-- button part -->
          <div class="btnContainer flex_class">
            <v-btn
              :disabled="notShow"
              :loading="phoneBtnLoading"
              append-icon="mdi-arrow-left-thin"
              color="#A1834E"
              class="text-none examBtn"
              size="large"
              min-width="200"
              variant="outlined"
              @click="registerQuiz()"
            >
              ورود به آزمون استرانگ
            </v-btn>
          </div>
          <h3 v-if="notShow" class="mt-3" style="color: #a1834e">
            شما یک بار در این آزمون شرکت کرده‌اید
          </h3>
        </div>
      </div>
    </v-locale-provider>
  </v-app>
</template>
<script>
import axios from "./../axios.js";

export default {
  data() {
    return {
      phoneBtnLoading: false,
      notShow: false,
      examId: "",
      quizQuestions: [],
    };
  },
  created() {
    this.getExams();
  },
  methods: {
    getExams() {
      axios({
        method: "GET",
        url: `exam/list/?session=${this.$cookies.get("sessionId")}`,
        header: "application/json",
        headers: {
          Authorization: `Bearer ${this.$cookies.get("userToken")}`,
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          console.log(response);
          this.examId = response.data[0].id;
          this.$cookies.set("examId", this.examId);
          this.$cookies.set(
            "currentUserName",
            response.data[0].first_name.first_name
          );
          this.$emit("reset-app");
          if (response.data[0].user_registered_exams[0] != undefined) {
            this.checkAccess(response.data[0].user_registered_exams[0].exam, response.data[0].user_registered_exams[0].is_active);
          }
        })
        .catch((err) => {
          this.$swal("مشکلی پیش آمد!", err.message, "error");
          if (err.status == 401) {
            this.$cookies.set("userEntered", false);
            this.$cookies.set("adminEntered", false);
            this.$router.push({ name: "SignupLogin" });
          }
        });
    },
    registerQuiz() {
      axios({
        method: "GET",
        url: `exam/register/${this.examId}/?session=${this.$cookies.get(
          "sessionId"
        )}`,
        header: "application/json",
        headers: {
          Authorization: `Bearer ${this.$cookies.get("userToken")}`,
          "Content-Type": "application/json",
        },
      })
        .then(() => {
          this.goToQuiz();
        })
        .catch((err) => {
          if (err.response.status == 401) {
            this.$cookies.set("userEntered", false);
            this.$cookies.set("adminEntered", false);
            this.$router.push({ name: "SignupLogin" });
          } else if (err.response.status == 403) {
            this.goToQuiz();
          }
        });
    },
    checkAccess(exam, is_active) {
      if (exam == this.examId && (is_active == 'true' || is_active == false)) {
        this.notShow = true;
      }
    },
    goToQuiz() {
      this.$router.push({ name: "quizPage" });
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
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  height: 100%;
}
.fontClass {
  font-family: danaRegular !important;
}
.appClass {
  font-family: danaRegular !important;
  width: 100%;
  height: 60%;
}
.mainPart {
  font-family: danaRegular !important;
  width: 80%;
  height: 91.4vh;
  margin-top: 3.85%;
  margin-left: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #00aaa41c;
  border-top-right-radius: 60px;
}
.bodyContainer {
  width: 100%;
  height: 91.8%;
  padding: 3%;
}
.textPart h3 {
  color: #a1834e;
}
.btnContainer {
  width: 90%;
}
.examBtn {
  font-weight: bold;
  color: white !important;
  background-color: #00aaa3;
  width: 60%;
  height: 3rem;
  margin-top: 6%;
  align-self: center;
  border-radius: 12px;
}
.desktopInstagramContainer {
  display: none;
}
@media screen and (max-width: 1209px) {
  .mainPart {
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