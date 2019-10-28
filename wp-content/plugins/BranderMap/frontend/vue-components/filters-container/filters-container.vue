<template>
    <div class="filters">
        <div class="filters__head">
            <h1 class="filters__title">{{ getTitle }}</h1>
            <show-button
                    @is-open:filters="$emit('is-open:filters')"
                    :filters-changed="filtersChangeState"
                    :is-open-filters="isOpenFilters"
            >{{ labels.lombard_filters }}
            </show-button>
        </div>

        <transition name="filters-slide">
            <div class="filters__dropdown" v-show="isOpenFilters">
                <div class="filters__dropdown-wrapper">
                    <div class="filters__group">
                        <work-filter
                                v-if="filters.work"
                                :labels="labels"
                                :refresh-state="isOpenFilters"
                                :filters-changed="filtersChangeState"
                                :lang="lang"
                                @clear-filters="clearFilters"
                                @change-filter-timeline="isTimelineChange"
                                @change-filter-day-week="isRadioChange">
                        </work-filter>
                        <reception-filter
                                :labels="labels"
                                :filtersData="filtersData"
                                :filters-changed="filtersChangeState"
                                @change-filter-reception="isCheckboxChange">
                        </reception-filter>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
  import './filters-container.scss';
  import workFilter from './work-filter/work-filter.vue';
  import receptionFilter from './reception-filter/reception-filter.vue';
  import showButton from './show-button/show-button.vue';

  export default {
    props: [
      'jsonLabels', 'jsonFilters', 'jsonFiltersData', 'containerSize',
      'departments', 'isOpenFilters', 'lang',
    ],
    data() {
      return {
        pageTitle: '',
        clearState: false,
        filtersChangeState: false,
        timelineChanged: false,
        checkboxesChanged: false,
        daysFilters: ['now', 'weekend', 'round-the-clock', 'every-day'],
        checkboxesState: {},
        filterConfig: {
          timeline: [],
          days: '',
          reception: [],
        },
        filteredData: {
          departments: [],
        },
      };
    },
    computed: {
      // get page title from outside
      getTitle() {
        const el = document.querySelector('[data-departments-title]');
        return el ? el.getAttribute('data-title') : '';
      },
      // parse json object
      labels() {
        return JSON.parse(this.jsonLabels);
      },
      // parse json object
      filters() {
        return JSON.parse(this.jsonFilters);
      },
      // parse json object
      filtersData() {
        return JSON.parse(this.jsonFiltersData).reception;
      },
    },
    methods: {
      // has item in array (indexOf)
      hasItem(array, item) {
        return array.indexOf(item) !== -1;
      },
      setArrayItem(array = [], value, state = true) {
        const item = array.indexOf(value);
        if (state) {
          array.push(value);
        } else {
          array.splice(item, 1);
        }
      },

      clearFilters() {
        this.updateFiltersState(true);
      },
      updateFiltersState(clear) {
        if (!clear) {
          this.filtersChangeState = this.timelineChanged ||
            this.filterConfig.days.length > 0 ||
            this.filterConfig.reception.length > 0;
        } else {
          this.filtersChangeState = false;
        }
      },
      // timeline change event
      isTimelineChange(state) {
        if (state) {
          const [timeState, value] = state;
          this.timelineChanged = timeState;
          this.filterConfig.timeline = value;
          this.filtration();
        } else {
          this.timelineChanged = state;
          this.filterConfig.timeline = [];
          this.filtration();
          this.updateFiltersState(true);
        }
      },
      // checkbox change event
      isCheckboxChange(checkbox) {
        const [id, state] = checkbox;
        this.checkboxesState[id] = state;
        this.setArrayItem(this.filterConfig.reception, id, state);
        this.filtration();
      },
      // radio button change event
      isRadioChange(filterDay) {
        this.filterConfig.days = filterDay !== 'every-day' ? filterDay : '';
        this.filtration();
      },
      // main filter function, init in all change events
      filtration() {
        const { days, reception, timeline } = this.filterConfig;
        this.filteredData.departments = [];
        this.departments.forEach((department) => {
          const isPassTest = {
            days: true,
            timeline: true,
            reception: true,
          };

          this.filtrationWeekDay(department.days, isPassTest, days);
          this.filtrationReception(department.reception, isPassTest, reception);
          this.filtrationTimeline(department, isPassTest, timeline);

          const testFilters = Object.values(isPassTest);

          if (!this.hasItem(testFilters, false) &&
            !this.hasItem(this.filteredData.departments, department)) {
            this.filteredData.departments.push(department);
          }
        });
        this.updateFiltersState();
        this.$emit('filter:departments', this.filteredData.departments);
      },
      // filter category weekday
      filtrationWeekDay(days = [], statesObject = {}, filterVal = '') {
        const states = statesObject;
        const currentDay = new Date().getDay();
        const [now, weekend, everyDay] = this.daysFilters;

        function filterDay() {
          const keyDays = Object.keys(days);
          switch (filterVal) {
            case weekend:
              return keyDays.indexOf('6') !== -1 || keyDays.indexOf('7') !== -1;
            case everyDay:
              return keyDays.length >= 7;
            case now:
              return keyDays.indexOf(currentDay.toString()) !== -1;
            default:
              return true;
          }
        }

        states.days = days ? filterDay() : false;
      },
      // filter category reception
      filtrationReception(reception = [], statesObject = {}, filterVal = []) {
        const states = statesObject;

        const checkReception = () => {
          const resultArray = [];
          filterVal.forEach((val) => {
            resultArray.push(reception.indexOf(+val) !== -1);
          });
          return resultArray;
        };

        if (reception.length) {
          states.reception = filterVal.length
            ? checkReception().indexOf(false) === -1 : true;
        } else {
          states.reception = false;
        }
      },
      // filter category timeline
      filtrationTimeline(department = {}, statesObject = {}, filterVal = []) {
        const states = statesObject;
        const { work_from: workFrom, work_to: workTo } = department;
        const [filterFrom, filterTo] = filterVal;

        function concatArrays(from = [], to = []) {
          return from.map((item, index) => [
            parseInt(item, 10) || '',
            parseInt(to[index], 10) || '',
          ]);
        }

        const timeFrom = Object.values(workFrom);
        const timeTo = Object.values(workTo);
        const timeRange = concatArrays(timeFrom, timeTo);

        timeRange.forEach((range) => {
          const [from, to] = range;

          if (from && to) {
            states.timeline = from && to
              ? !((to <= parseInt(filterFrom, 10) && +filterTo >= to) ||
                (from >= parseInt(filterTo, 10) && +filterFrom <= from))
              : true;
          }
        });
      },
    },
    components: {
      workFilter,
      receptionFilter,
      showButton,
    },
  };
</script>