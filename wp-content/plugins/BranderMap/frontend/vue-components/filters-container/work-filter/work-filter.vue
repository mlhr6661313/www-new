<template>
   <div class="work-time">
      <div class="work-time__title">{{ labels.when_works }}</div>
      <div class="work-time__when">
         <when-works
               v-for="day in daysCollection"
               :id="day.id"
               :value="day.id"
               :key="day.id"
               name="work_filters[]"
               :radio="true"
               :radio-btn-value="filtersDay"
               @change:filter:day-week="setRadio"
         >{{ day.label }}
         </when-works>
      </div>
      <div class="work-time__timeline">
         <time-filter
               :refresh-state="refreshState"
               :filters-changed="filtersChanged"
               @change:filter:timeline="$emit('change-filter-timeline', $event)"
         ></time-filter>
      </div>

      <div class="work-time__button-wrapper">
         <button class="clear-filters" v-if="filtersChanged" @click="clearFilters">{{ lang.clear_filters }}</button>
      </div>
   </div>
</template>

<script>
  import './work-filter.scss';
  import whenWorks from '../../when-works/when-works.vue';
  import timeFilter from '../../time-filter/time-filter.vue';

  export default {
    props: ['labels', 'refreshState', 'filtersChanged', 'lang'],
    data() {
      return {
        filtersDay: 'every-day',
      };
    },
    computed: {
      daysCollection() {
        return [
          {
            id: 'now',
            label: this.labels.now,
          },
          {
            id: 'weekend',
            label: this.labels.weekend,
          },
          {
            id: 'round-the-clock',
            label: this.labels.round_the_clock,
          },
          {
            id: 'every-day',
            label: this.labels.every_day,
          },
        ];
      },
    },
    methods: {
      setRadio(value) {
        this.filtersDay = value;
        this.updateFilters();
      },
      clearFilters() {
        this.filtersDay = 'every-day';
        this.updateFilters();
        this.$emit('clear-filters');
      },
      updateFilters() {
        this.$emit('change-filter-day-week', this.filtersDay);
      },
    },
    components: {
      whenWorks,
      timeFilter,
    },
  };
</script>