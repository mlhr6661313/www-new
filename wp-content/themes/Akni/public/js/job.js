webpackJsonp([3],{

/***/ 43:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__modules_pollyfills__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__modules_pollyfills___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__modules_pollyfills__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vue_select__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vue_select___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_vue_select__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modules_helper_function__ = __webpack_require__(1);





function createJobScript() {
  var d = document.getElementById('vacancy-widget-wrapper');
  var lang = d.getAttribute('data-lang');
  var firstScriptTag = document.getElementsByTagName('script')[0];
  var script = document.createElement('script');
  script.src = "https://www.work.ua/export/company/company_jobs.php?id=" + d.getAttribute('data-id') + "&callback=vacancyConstruct" + (lang ? "&lang=" + lang : "");
  //script.src = "http://pershii.web/test.php?id=" + d.getAttribute('data-id') + "&callback=vacancyConstruct" + (lang ? "&lang=" + lang : "");
  firstScriptTag.parentNode.insertBefore(script, firstScriptTag);
}
document.addEventListener('DOMContentLoaded', createJobScript);

window.vacancyConstruct = function (jobsInfo) {
  var vacancy = new __WEBPACK_IMPORTED_MODULE_1_vue___default.a({
    el: '#vacancy-widget-wrapper',
    data: {
      jobsInfo: jobsInfo,
      selectCity: [],
      selectJobs: [],
      enableJobs: false,
      cityValue: '',
      jobsValue: '',
      jobsList: []
    },
    mounted: function mounted() {
      var jobsList = jobsInfo.jobs;
      var cities = new Object();

      if (jobsList) {
        jobsList.forEach(function (job) {
          if (!cities[job.region]) {
            cities[job.region] = new Object();
            cities[job.region]['label'] = job.region;
            cities[job.region]['value'] = job.region;
            cities[job.region]['jobs'] = new Object();
          }
          if (!cities[job.region]['jobs'][job.name]) {
            cities[job.region]['jobs'][job.name] = new Object();
            cities[job.region]['jobs'][job.name]['label'] = job.name;
            cities[job.region]['jobs'][job.name]['value'] = job.name;
            cities[job.region]['jobs'][job.name]['jobs'] = [];
          }
          cities[job.region]['jobs'][job.name]['jobs'].push(job);
        });
        this.selectCity = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__modules_helper_function__["a" /* toArray */])(cities);
      }
    },

    watch: {
      cityValue: function cityValue(value) {
        this.selectJobs = [];
        this.enableJobs = false;
        if (value) {
          this.selectJobs = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__modules_helper_function__["a" /* toArray */])(value.jobs);
          this.fillJobs(this.selectJobs);
          this.enableJobs = true;
        } else {
          this.fillJobs(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__modules_helper_function__["a" /* toArray */])(this.selectCity[0].jobs));
        }
      },
      jobsValue: function jobsValue(value) {
        if (value) {
          this.jobsList = value.jobs;
        } else if (this.cityValue) {
          this.fillJobs(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__modules_helper_function__["a" /* toArray */])(this.cityValue.jobs));
        }
      }
    },
    methods: {
      fillJobs: function fillJobs(jobs) {
        var tmp = [];
        jobs.forEach(function (item) {
          item.jobs.forEach(function (i) {
            tmp.push(i);
          });
        });
        this.jobsList = tmp;
      }
    },
    components: {
      vSelect: __WEBPACK_IMPORTED_MODULE_2_vue_select___default.a
    },
    delimiters: ['${', '}']
  });
};

/***/ })

},[43]);
//# sourceMappingURL=../job.js.map