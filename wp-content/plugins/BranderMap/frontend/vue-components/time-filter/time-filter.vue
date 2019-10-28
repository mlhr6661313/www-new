<template>
   <div class="time-filter">
      <div class="time-filter__data-input" hidden>
         <input type="text"
               :name="setInputData('from').name"
               :id="setInputData('from').id"
               v-model="startValue"
         />
         <input type="text"
               :name="setInputData('to').name"
               :id="setInputData('to').id"
               v-model="endValue"
         />
      </div>
      <div class="time-filter__wrapper">
         <vue-slider
               ref="slider"
               v-model="value"
               :real-time="true"
               :max="1440"
               :width="'100%'"
               @callback="changeTimeline"
               tooltip="hover"
               :interval="30"
               lazy
         >
            <template slot="tooltip" slot-scope="tooltip">
               <div class="diy-tooltip">
                  {{ tooltip.index === 0 ? convertedTime[0] : convertedTime[1] }}
               </div>
            </template>
         </vue-slider>
         <div class="time-filter__time-line">
            <span>00:00</span>
            <span>06:00</span>
            <span>12:00</span>
            <span>18:00</span>
            <span>24:00</span>
         </div>
      </div>
   </div>
</template>

<script>
  import vueSlider from 'vue-slider-component';

  /**
   *  component params
   *
   *  @params
   *     :input-data="{
   *       from: {name: '',id: '', value: ''},
   *       to:{name: '',id: '', value: ''}
   *     }"
   */
  export default {
    props: ['inputData', 'refreshState', 'filtersChanged'],
    data() {
      return {
        convertedTime: ['', ''],
        tooltipState: false,
        isChanged: false,
        defaultTimeline: [0, 1440],
        value: [0, 1440],
        defaultInputData: {
          from: { name: 'work_from', id: 'from' },
          to: { name: 'work_to', id: 'to' },
        },
      };
    },
    watch: {
      filtersChanged(state) {
        if (!state) {
          this.$refs.slider.setValue(this.defaultTimeline);
        }
      },
      value(value) {
        this.convertedTime[0] = this.convertTime(value[0]);
        this.convertedTime[1] = this.convertTime(value[1]);
      },
      refreshState() {
        this.$refs.slider.refresh();
      },
    },
    created() {
      if (this.inputData) {
        this.hasValue('from', () => {
          this.isChanged = true;
          this.value = [+this.inputData.from.value, this.value[1]];
        });
        this.hasValue('to', () => {
          this.isChanged = true;
          this.value = [this.value[0], +this.inputData.to.value];
        });
      }
    },
    computed: {
      startValue: {
        get() {
          return this.isChanged ? this.value[0] : '';
        },
        set(val) {
          if (this.isChanged) {
            this.value = [+this.inputData.from.value, this.value[1]];
          } else {
            this.value = [+val, this.value[1]];
          }
        },
      },
      endValue: {
        get() {
          return this.isChanged ? this.value[1] : '';
        },
        set(val) {
          this.value = [this.value[0], +val];
          if (this.isChanged) {
            this.value = [this.value[0], +this.inputData.to.value];
          } else {
            this.value = [this.value[0], +val];
          }
        },
      },
    },
    methods: {
      hasValue(state, fn) {
        if (this.inputData[state].value !== '') {
          fn();
        }
      },
      setInputData(state) {
        return !this.inputData ? this.defaultInputData[state] : this.inputData[state];
      },
      // timeline change event
      changeTimeline() {
        const sliderValue = this.$refs.slider.getValue();
        this.isChanged = this.defaultTimeline[0] !== sliderValue[0] ||
            this.defaultTimeline[1] !== sliderValue[1];

        this.$emit('change:filter:timeline', this.isChanged
            ? [this.isChanged, sliderValue]
            : this.isChanged);
      },
      // convert time range in hour:minutes
      convertTime(value) {
        function firstNull(num) {
          return +num < 10 ? `0${num}` : num;
        }

        function getDecimal(num) {
          return num > 0 ? num - Math.floor(num) : Math.ceil(num) - num;
        }

        const dirtyTime = value / 60;
        const hours = Math.floor(dirtyTime);
        const minutes = Math.round(getDecimal(dirtyTime) * 60);

        return `${firstNull(hours)}:${firstNull(minutes)}`;
      },
    },
    components: {
      vueSlider,
    },
  };
</script>

<style src="./time-filter.scss" lang="scss"></style>
