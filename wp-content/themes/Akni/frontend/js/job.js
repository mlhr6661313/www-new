import './modules/pollyfills';
import Vue from 'vue';
import vSelect from 'vue-select';
import {toArray} from './modules/helper-function';

function createJobScript() {
  const d = document.getElementById('vacancy-widget-wrapper');
  const lang = d.getAttribute('data-lang');
  const firstScriptTag = document.getElementsByTagName('script')[0];
  const script = document.createElement('script');
  script.src = "https://www.work.ua/export/company/company_jobs.php?id=" + d.getAttribute('data-id') + "&callback=vacancyConstruct" + (lang ? "&lang=" + lang : "");
  //script.src = "http://pershii.web/test.php?id=" + d.getAttribute('data-id') + "&callback=vacancyConstruct" + (lang ? "&lang=" + lang : "");
  firstScriptTag.parentNode.insertBefore(script, firstScriptTag);
}
document.addEventListener('DOMContentLoaded', createJobScript);

window.vacancyConstruct = function (jobsInfo) {
  const vacancy = new Vue({
    el: '#vacancy-widget-wrapper',
    data: {
      jobsInfo,
      selectCity: [],
      selectJobs: [],
      enableJobs: false,
      cityValue: '',
      jobsValue: '',
      jobsList: [],
    },
    mounted() {
      const jobsList = jobsInfo.jobs;
      let cities = new Object();

      if (jobsList) {
        jobsList.forEach((job) => {
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
        this.selectCity = toArray(cities);
      }
    },
    watch: {
      cityValue(value) {
        this.selectJobs = [];
        this.enableJobs = false;
        if(value) {
          this.selectJobs = toArray(value.jobs);
          this.fillJobs(this.selectJobs);
          this.enableJobs = true;
        } else {
          this.fillJobs(toArray(this.selectCity[0].jobs));
        }
      },
      jobsValue(value) {
        if(value) {
          this.jobsList = value.jobs;
        } else if(this.cityValue) {
          this.fillJobs(toArray(this.cityValue.jobs));
        }
      },
    },
    methods: {
      fillJobs(jobs) {
        let tmp = [];
        jobs.forEach((item)=>{
          item.jobs.forEach((i)=>{
            tmp.push(i);
          });
        });
        this.jobsList = tmp;
      },
    },
    components: {
      vSelect,
    },
    delimiters: ['${', '}'],
  });
};
