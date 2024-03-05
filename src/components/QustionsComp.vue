<template>
  <v-app @click.right.prevent @copy.prevent @paste.prevent>
    <v-locale-provider rtl>
      <div class="desktopInstagramContainer">
        <div class="desktopInstagramContent">
          <div class="desktopInstagramDescription">
            <h2>کاربر گرامی این نسخه مخصوص رایانه است</h2>
            <h2>لطفا با رایانه وارد شوید</h2>
          </div>
        </div>
      </div>
      <div class="mainContainer flex_column_class">
        <div class="pointsDiscription">
          <h3>{{ examName }}</h3>
          <div class="pointsClass">
            <p>{{ quizDescription }}</p>
          </div>
          <div class="warnings">
            <p>
              توجه: جهت پایان یافتن آزمون نیاز است به همه سوالات پاسخ داده
              باشید.
            </p>
            <p>
              توجه: در صورت بارگذاری مجدد صفحه، سوالات پاسخ داده شده حذف می‌شوند
              و مجدد باید به سوالات پاسخ دهید.
            </p>
          </div>
        </div>
        <h2>{{ quizTitle }}:</h2>
        <div
          v-for="(question, index) in paginated"
          :key="index"
          class="questionMold flex_column_class ss03"
        >
          <div class="titlePart flex_class mr-2">
            <h3>{{ question.quizNum }} -</h3>
            <h3 class="mr-2">{{ question.question }}</h3>
          </div>
          <div class="answersPart">
            <div
              class="flex_class topPart"
              style="border-bottom: 1px solid black"
            >
              <v-radio-group v-model="chosenAnswer[question.id]">
                <div class="toggleBtn">
                  <v-btn-toggle
                    color="#00AAA3"
                    density="compact"
                    divided
                    v-model="chosenAnswer[question.id]"
                  >
                    <v-btn><h3>بسیار علاقه‌مندم</h3></v-btn>
                    <v-btn><h3>علاقه‌مندم</h3></v-btn>
                    <v-btn><h3>بی‌تفاوت</h3></v-btn>
                    <v-btn><h3>علاقه‌مند نیستم</h3></v-btn>
                    <v-btn><h3>اصلا علاقه‌مند نیستم</h3></v-btn>
                  </v-btn-toggle>
                </div>
              </v-radio-group>
            </div>
          </div>
        </div>
        <div class="flex_class paginateClass ss03">
          <v-pagination
            v-model="current"
            :length="totalPages"
            total-visible="3"
          ></v-pagination>
        </div>
        <div v-if="this.showNext" class="endExamBtnContainer flex_class">
          <v-btn id="prevBtn" class="endExamBtn mr-2 mb-3" @click="endExam()">
            پایان آزمون
          </v-btn>
        </div>
      </div>
    </v-locale-provider>
  </v-app>
</template>
<script>
import axios from "./../axios.js";
// import questions from "./../assets/temp_files/questions.json";

export default {
  props: { quizArray: Array },
  data: () => {
    return {
      showNext: false,
      scrollVal: true,
      current: 1,
      pageSize: 10,
      totalPages: null,
      examName: "",
      quizTitle: "",
      quizDescription: "",
      questionsArray: [],
      chosenAnswer: [],
      pointsArray: [
        {
          id: 1,
          option: "مطمئن نیستم یا نمی‌دانم",
          meaning: "به رفتار فرزند توجه نکرده‌اید!",
        },
        {
          id: 2,
          option: "0",
          meaning: "هرگز!",
        },
        {
          id: 3,
          option: "1",
          meaning: "به ندرت!",
        },
        {
          id: 4,
          option: "2",
          meaning: "تا حدودی!",
        },
        {
          id: 5,
          option: "3",
          meaning: "بعضی اوقات!",
        },
        {
          id: 6,
          option: "4",
          meaning: "به میزان قابل توجه!",
        },
        {
          id: 7,
          option: "5",
          meaning: "تقریبا همیشه!",
        },
        {
          id: 8,
          option: "6",
          meaning: "همیشه!",
        },
      ],
    };
  },
  watch: {
    current(newVal) {
      if (newVal) {
        this.scroll();
      }
      console.log(this.current);
    },
  },
  computed: {
    indexStart() {
      return (this.current - 1) * this.pageSize;
    },
    indexEnd() {
      return this.indexStart + this.pageSize;
    },
    paginated() {
      return this.questionsArray.slice(this.indexStart, this.indexEnd);
    },
  },
  created() {
    this.setQuestions();
    this.examName = this.$cookies.get("examName");
  },
  methods: {
    setQuestions() {
      this.quizTitle = this.quizArray[0].name;
      this.quizDescription = this.quizArray[0].description;
      this.questionsArray = this.quizArray[0].questions;
      for (let i = 0; i < this.questionsArray.length; i++) {
        this.questionsArray[i].quizNum = i + 1;
      }
      this.totalPages = Math.ceil(this.questionsArray.length / this.pageSize);
    },
    scroll() {
      console.log(this.chosenAnswer.length, this.questionsArray.length);
      var count = 0;
      for (let j = 0; j < this.chosenAnswer.length; j++) {
        if (this.chosenAnswer[j] != undefined) {
          count += 1;
        }
      }
      if (this.current == this.totalPages && count == this.questionsArray.length) {
        this.showNext = true;
      } else if (this.current == this.totalPages && count != this.questionsArray.length) {
        this.$swal(
          "توجه!",
          "جهت پایان دادن آزمون باید به همه سوالات پاسخ داده باشید",
          "warning"
        );
      }
      else {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth",
        });
        this.showNext = false;
      }
    },
    endExam() {
      // this.$cookies.remove("examStarted");
      // this.$cookies.set("resetPage");
      // this.$cookies.remove("stay");
      // this.$router.push({ name: "Home" });
      for (let i = 5; i < this.chosenAnswer.length; i++) {
        console.log(i, this.chosenAnswer[i]);
        if (this.chosenAnswer[i] == 0) {
          this.chosenAnswer[i] = 2;
        } else if (this.chosenAnswer[i] == 1) {
          this.chosenAnswer[i] = 1;
        } else if (this.chosenAnswer[i] == 2) {
          this.chosenAnswer[i] = 0;
        } else if (this.chosenAnswer[i] == 3) {
          this.chosenAnswer[i] = -1;
        } else if (this.chosenAnswer[i] == 4) {
          this.chosenAnswer[i] = -2;
        }
      }
      console.log(this.chosenAnswer);
      var result = this.chosenAnswer.reduce((agg, item, index) => {
        console.log(agg, item, index);
        agg[index] = item;
        return agg;
      }, {});
      console.log(result);
      var data = {
        answers: result,
      };
      axios({
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.$cookies.get("userToken")}`,
        },
        url: `exam/qs-post/${this.$cookies.get("examId")}/?session=${this.$cookies.get("sessionId")}`,
        data: JSON.stringify(data),
      })
        .then((response) => {
          console.log(response);
          this.$cookies.remove("examStarted");
          this.$cookies.set("resetPage");
          this.$router.push({ name: "Home" });
        })
        .catch((err) => {
          this.$swal("مشکلی پیش آمد!", err.message, "error");
          if (err.response.status == 401) {
            this.$cookies.set("userEntered", false);
            this.$cookies.set("adminEntered", false);
            this.$router.push({ name: "SignupLogin" });
          }
        });
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
  justify-content: flex-start;
  align-items: center;
}
.mainContainer {
  width: 100%;
  height: 100%;
  padding: 0%;
}
.pointsDiscription {
  width: 100%;
  display: flex;
  flex-flow: column;
  justify-content: space-around;
  align-items: flex-start;
  border: 1px solid black;
  border-radius: 7px;
  padding: 10px;
  margin-bottom: 10px;
}
.pointsClass {
  width: 100%;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  background-color: #00aaa3;
  margin-top: 10px;
  padding: 10px;
  border-radius: 7px;
}
.warnings {
  background-color: #A1834E;
  margin-top: 1%;
  border-radius: 7px;
  padding: 10px;
}
.questionMold {
  font-family: danaRegular;
  width: 100٪;
  border: 1px solid black;
  margin-top: 5%;
  padding: 0%;
}
.titlePart {
  align-self: flex-start;
}
.answersPart {
  border-top: 1px solid black;
  width: 100%;
}
.seperatorClass {
  width: auto;
  border-left: 1px solid black;
  padding-left: 0px;
  margin-left: 0px;
}
.paginateClass {
  margin: 20px 0px;
}
.endExamBtnContainer {
  width: 100%;
}
.endExamBtn {
  font-weight: bold;
  color: #00aaa3 !important;
  border: 1px solid #00aaa3 !important;
  width: 40%;
}
.endExamBtn:hover {
  border: none;
  color: white !important;
  background-color: #00aaa3;
  font-weight: bold;
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
  src: url("./../assets/fonts/Dana-Regular.ttf");
}
.ss03 {
  -moz-font-feature-settings: "ss03";
  -webkit-font-feature-settings: "ss03";
  font-feature-settings: "ss03";
}
.v-selection-control-group {
  flex-flow: row !important;
  flex-direction: row !important;
}
.v-selection-control .v-label {
  white-space: nowrap !important;
}
.answersPart > .v-input__details {
  display: none;
}
.topPart > .v-radio-group .v-input__details {
  display: none;
}
.toggleBtn > .v-btn-group--density-compact.v-btn-group {
  height: 40px !important;
}
.v-selection-control .v-label {
  font-weight: bold !important;
}
</style>