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
          </div>
        </div>
        <div v-if="answerdQuestions" class="flex_class ss03">
          <h3>
            سوالات پاسخ داده شده در رسته {{ examName }}:
            {{ questionsArray.length }} / {{ answersCount }}
          </h3>
        </div>
        <div v-else class="flex_class ss03">
          <h3>
            سوالات پاسخ داده شده در رسته {{ examName }}:
            {{ questionsArray.length }} / {{ answersCount }}
          </h3>
        </div>
        <div class="flex_class paginateClass ss03">
          <v-pagination
            v-model="current"
            :length="totalPages"
            :total-visible="totalPages"
          ></v-pagination>
        </div>
        <div
          v-if="showRedirect == true && answeredExist == false"
          class="endExamBtnContainer flex_class"
        >
          <v-btn id="prevBtn" class="endExamBtn mr-2 mb-3" @click="endExam()">
            ذخیره پاسخ‌ها و هدایت به صفحه اصلی
          </v-btn>
        </div>
        <div
          v-if="showNextModule == true && answeredExist == false"
          class="endExamBtnContainer flex_class"
        >
          <v-btn id="prevBtn" class="endExamBtn mr-2 mb-3" @click="endExam()">
            ذخیره پاسخ‌ها و هدایت به سوالات رسته بعدی
          </v-btn>
        </div>
        <div
          v-else-if="showEndExam == true && answeredExist == false"
          class="endExamBtnContainer flex_class"
        >
          <v-btn id="prevBtn" class="endExamBtn mr-2 mb-3" @click="endExam()">
            پایان آزمون
          </v-btn>
        </div>
        <div
          v-if="showRedirect == true && answeredExist == true"
          class="endExamBtnContainer flex_class"
        >
          <v-btn id="prevBtn" class="endExamBtn mr-2 mb-3" @click="endExam()">
            ذخیره پاسخ‌ها و هدایت به صفحه اصلی
          </v-btn>
        </div>
        <div
          v-if="showNextModule == true && answeredExist == true"
          class="endExamBtnContainer flex_class"
        >
          <v-btn id="prevBtn" class="endExamBtn mr-2 mb-3" @click="endExam()">
            ذخیره پاسخ‌ها و هدایت به سوالات رسته بعدی
          </v-btn>
        </div>
        <div
          v-else-if="showEndExam == true && answeredExist == true"
          class="endExamBtnContainer flex_class"
        >
          <v-btn id="prevBtn" class="endExamBtn mr-2 mb-3" @click="endExam()">
            پایان آزمون
          </v-btn>
        </div>
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
              <v-radio-group
                v-if="question.disableStatus == true"
                :disabled="true"
                v-model="chosenAnswer[question.id]"
              >
                <div class="toggleBtn">
                  <v-btn-toggle
                    style="border-radius: 0 !important"
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
              <v-radio-group
                v-else
                :disabled="false"
                v-model="chosenAnswer[question.id]"
              >
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
            :total-visible="totalPages"
          ></v-pagination>
        </div>
        <div
          v-if="showRedirect == true && answeredExist == false"
          class="endExamBtnContainer flex_class"
        >
          <v-btn id="prevBtn" class="endExamBtn mr-2 mb-3" @click="endExam()">
            ذخیره پاسخ‌ها و هدایت به صفحه اصلی
          </v-btn>
        </div>
        <div
          v-if="showNextModule == true && answeredExist == false"
          class="endExamBtnContainer flex_class"
        >
          <v-btn id="prevBtn" class="endExamBtn mr-2 mb-3" @click="endExam()">
            ذخیره پاسخ‌ها و هدایت به سوالات رسته بعدی
          </v-btn>
        </div>
        <div
          v-else-if="showEndExam == true && answeredExist == false"
          class="endExamBtnContainer flex_class"
        >
          <v-btn id="prevBtn" class="endExamBtn mr-2 mb-3" @click="endExam()">
            پایان آزمون
          </v-btn>
        </div>
        <div
          v-if="showRedirect == true && answeredExist == true"
          class="endExamBtnContainer flex_class"
        >
          <v-btn id="prevBtn" class="endExamBtn mr-2 mb-3" @click="endExam()">
            ذخیره پاسخ‌ها و هدایت به صفحه اصلی
          </v-btn>
        </div>
        <div
          v-if="showNextModule == true && answeredExist == true"
          class="endExamBtnContainer flex_class"
        >
          <v-btn id="prevBtn" class="endExamBtn mr-2 mb-3" @click="endExam()">
            ذخیره پاسخ‌ها و هدایت به سوالات رسته بعدی
          </v-btn>
        </div>
        <div
          v-else-if="showEndExam == true && answeredExist == true"
          class="endExamBtnContainer flex_class"
        >
          <v-btn id="prevBtn" class="endExamBtn mr-2 mb-3" @click="endExam()">
            پایان آزمون
          </v-btn>
        </div>
      </div>
      <!-- loading dialog -->
      <v-dialog v-model="dialog" class="loadingDialog" persistent opacity="1">
        <v-list class="py-2" color="primary" elevation="12" rounded="lg">
          <v-list-item class="dialogList" title="در حال ثبت سوالات">
            <template v-slot:append>
              <v-progress-circular
                color="primary"
                indeterminate="disable-shrink"
                size="26"
                width="2"
              ></v-progress-circular>
            </template>
          </v-list-item>
        </v-list>
      </v-dialog>
    </v-locale-provider>
  </v-app>
</template>
<script>
import axios from "./../axios.js";

export default {
  emits: ["next-module-id", "close-page"],
  props: { quizArray: Array, currentQuizId: Number },
  data: () => {
    return {
      showRedirect: true,
      showNextModule: false,
      showEndExam: false,
      answeredExist: false,
      scrollVal: true,
      examStatus: false,
      dialog: false,
      pageStart: false,
      answersCount: 0,
      answersLength: 0,
      allAnswersCount: 0,
      current: 1,
      pageSize: 10,
      totalPages: null,
      nextId: null,
      examName: "",
      quizTitle: "",
      quizDescription: "",
      questionsArray: [],
      answerdQuestions: [],
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
    },
    chosenAnswer: {
      handler(newVal) {
        if (this.answerdQuestions) {
          if (this.answerdQuestions.length == this.questionsArray.length) {
            if (this.currentQuizId != 5) {
              this.showNextModule = true;
              this.showRedirect = false;
              this.showEndExam = false;
            } else if (this.currentQuizId == 5) {
              this.showNextModule = false;
              this.showRedirect = false;
              this.showEndExam = true;
            }
          } else {
            if (this.pageStart == true) {
              (this.pageStart = false),
                (this.answersCount =
                  this.answersCount + this.answerdQuestions.length);
            } else {
              if (
                newVal.length != this.answersLength ||
                newVal.length - 1 == this.questionsArray.length
              ) {
                this.answersLength = newVal.length;
                this.answersCount += 1;
                if (
                  this.questionsArray.length == this.answersCount &&
                  this.currentQuizId != 5
                ) {
                  this.showNextModule = true;
                  this.showRedirect = false;
                  this.showEndExam = false;
                } else if (
                  this.currentQuizId == 5 &&
                  this.questionsArray.length == this.answersCount
                ) {
                  this.showNextModule = false;
                  this.showRedirect = false;
                  this.showEndExam = true;
                } else {
                  this.showNextModule = false;
                  this.showRedirect = true;
                  this.showEndExam = false;
                }
              }
            }
          }
        } else {
          if (this.pageStart == true) {
            this.pageStart = false;
          } else {
            if (
              newVal.length != this.answersLength ||
              newVal.length - 1 == this.questionsArray.length
            ) {
              this.answersLength = newVal.length;
              this.answersCount += 1;
              if (
                this.questionsArray.length == this.answersCount &&
                this.currentQuizId != 5
              ) {
                this.showNextModule = true;
                this.showRedirect = false;
                this.showEndExam = false;
              } else if (
                this.currentQuizId == 5 &&
                this.questionsArray.length == this.answersCount
              ) {
                this.showNextModule = false;
                this.showRedirect = false;
                this.showEndExam = true;
              } else {
                this.showNextModule = false;
                this.showRedirect = true;
                this.showEndExam = false;
              }
            }
          }
        }
      },
      deep: true,
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
    this.pageStart = true;
    this.answerdQuestions = this.makeRightPoints();
    this.examName = this.$cookies.get("examName");
  },
  mounted() {
    this.setQuestions();
  },
  methods: {
    makeRightPoints() {
      if (
        this.quizArray[this.quizArray.length - 1].answered_questions != null ||
        this.quizArray[this.quizArray.length - 1].answered_questions !=
          undefined
      ) {
        var tempArray =
          this.quizArray[this.quizArray.length - 1].answered_questions;
        for (let i = 0; i < tempArray.length; i++) {
          if (tempArray[i].answer == 2) {
            tempArray[i].answer = 0;
          } else if (tempArray[i].answer == 1) {
            tempArray[i].answer = 1;
          } else if (tempArray[i].answer == 0) {
            tempArray[i].answer = 2;
          } else if (tempArray[i].answer == -1) {
            tempArray[i].answer = 3;
          } else if (tempArray[i].answer == -2) {
            tempArray[i].answer = 4;
          }
        }
        return tempArray;
      }
    },
    setQuestions() {
      this.quizTitle = this.quizArray[this.quizArray.length - 1].name;
      this.quizDescription =
        this.quizArray[this.quizArray.length - 1].description;
      this.questionsArray = this.quizArray[this.quizArray.length - 1].questions;

      if (this.answerdQuestions) {
        for (let i = 0; i < this.questionsArray.length; i++) {
          for (let j = 0; j < this.answerdQuestions.length; j++) {
            if (
              this.questionsArray[i].id == this.answerdQuestions[j].question
            ) {
              this.questionsArray[i].disableStatus = true;
              this.chosenAnswer[this.answerdQuestions[j].question] = this.answerdQuestions[j].answer;
              break;
            } else {
              this.questionsArray[i].disableStatus = false;
            }
          }
          this.questionsArray[i].quizNum = i + 1;
        }
      } else {
        this.answeredExist = false;
        for (let i = 0; i < this.questionsArray.length; i++) {
          this.questionsArray[i].quizNum = i + 1;
        }
      }
      this.totalPages = Math.ceil(this.questionsArray.length / this.pageSize);
    },
    scroll() {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    },
    endExam() {
      this.dialog = true;
      for (let i = 6; i < this.chosenAnswer.length; i++) {
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
      if (this.answerdQuestions) {
        for (let k = 0; k < this.answerdQuestions.length; k++) {
          for (let j = 6; j < this.chosenAnswer.length; j++) {
            if (j == this.answerdQuestions[k].question) {
              delete this.chosenAnswer[j];
              break;
            }
          }
        }
      }
      var result = this.chosenAnswer.reduce((agg, item, index) => {
        agg[index] = item;
        return agg;
      }, {});
      var count = 0;
      for (let j = 0; j < this.chosenAnswer.length; j++) {
        if (this.chosenAnswer[j] != undefined) {
          count += 1;
        }
      }
      if (this.currentQuizId == 0) {
        if (this.answerdQuestions) {
          count = count + this.answerdQuestions.length;
        }
      } else {
        if (this.answerdQuestions) {
          count = count + this.answerdQuestions.length;
        }
      }
      if (this.currentQuizId == 5 && count == this.questionsArray.length) {
        this.examStatus = true;
      }
      var data = {
        answers: result,
        is_complete: this.examStatus,
      };
      if (this.examStatus == true && count == this.questionsArray.length) {
        axios({
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.$cookies.get("userToken")}`,
          },
          url: `exam/qs-post/${this.$cookies.get(
            "examId"
          )}/?session=${this.$cookies.get("sessionId")}`,
          data: JSON.stringify(data),
        })
          .then(() => {
            this.dialog = false;
            this.$router.push({ name: "Home" });
            this.$swal("آزمون با موفقیت ثبت شد!", "", "success");
          })
          .catch((err) => {
            this.$swal("مشکلی پیش آمد!", err.message, "error");
            if (err.response.status == 401) {
              this.$cookies.set("userEntered", false);
              this.$router.push({ name: "signupLogin" });
            }
          });
      } else {
        axios({
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.$cookies.get("userToken")}`,
          },
          url: `exam/qs-post/${this.$cookies.get(
            "examId"
          )}/?session=${this.$cookies.get("sessionId")}`,
          data: JSON.stringify(data),
        })
          .then(() => {
            this.dialog = false;
            if (count == this.questionsArray.length) {
              this.$swal(`رسته ${this.quizTitle} تکمیل شد`, "", "success");
              this.nextId = this.currentQuizId + 1;
              this.$emit("next-module-id", this.nextId);
              this.dialog = false;
            } else {
              this.$swal("ثبت موفق پاسخ‌ها", "", "success").then(() => {
                this.$router.push({ name: "Home" });
                this.dialog = false;
              });
            }
          })
          .catch((err) => {
            this.$swal("مشکلی پیش آمد!", err.message, "error");
            if (err.response.status == 401) {
              this.$cookies.set("userEntered", false);
              this.$cookies.set("adminEntered", false);
              this.$router.push({ name: "signupLogin" });
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
  width: 90%;
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
  background-color: #a1834e;
  margin-top: 1%;
  border-radius: 7px;
  padding: 10px;
}
.questionMold {
  font-family: danaRegular;
  width: 100%;
  border: 1px solid black;
  margin-top: 5%;
  padding: 0%;
}
.titlePart {
  align-self: flex-start;
}
.toggleBtn {
  width: 100%;
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
  width: 55%;
}
.endExamBtn {
  font-weight: bold;
  color: #00aaa3 !important;
  border: 1px solid #00aaa3 !important;
  width: 100%;
}
.endExamBtn:hover {
  border: none;
  color: white !important;
  background-color: #00aaa3;
  font-weight: bold;
}
.loadingDialog {
  font-family: danaRegular;
  width: 20%;
  height: 100%;
}
.dialogList {
  font-family: danaRegular;
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 100%;
}
.desktopInstagramContainer {
  display: none;
}
@media screen and (max-width: 1209px) {
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
.loadingDialog > .v-overlay__scrim {
  background-color: #00aaa3 !important;
}
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
  width: 100%;
}
.v-btn-group--divided .v-btn:not(:last-child) {
  width: 19.6% !important;
}
.v-selection-control .v-label {
  font-weight: bold !important;
}
</style>