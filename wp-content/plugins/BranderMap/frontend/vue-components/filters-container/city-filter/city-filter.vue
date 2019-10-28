<template>
    <div class="city-filters">
        <div class="city-filters__filter">
            <v-select
                    :on-change="regionSelect"
                    :options="regionsOptions"
                    :placeholder="lang.region"
                    :reset-on-options-change="true"
                    :searchable="false">
            </v-select>
        </div>
        <div class="city-filters__filter">
            <v-select
                    :on-change="citySelect"
                    :options="cityOptions"
                    :placeholder="lang.city"
                    :reset-on-options-change="true"
                    :searchable="false">
                <template slot="no-options">
                    {{ lang.select_region }}
                </template>
            </v-select>
        </div>
    </div>
</template>

<script>
  import vSelect from './select/select.vue';
  import './city-filter.scss';

  export default {
    props: ['lang', 'regionsData', 'filtersChanged'],
    data() {
      return {
        regionsOptions: [],
        regionsOptionsSave: [],
        cityOptions: [],
        selectedCity: '',
      };
    },
    mounted() {
      this.fillRegionsSelect();
    },
    watch: {
      filtersChanged(state) {
        if (!state) {
          // this.regionsOptions = [];
          // this.cityOptions = [];
          // this.fillRegionsSelect();
        }
      },
    },
    methods: {
      fillRegionsSelect() {
        this.regionsOptions = this.toArray(this.regionsData).map(this.mapRegions);
        this.regionsOptions.sort((a, b) => {
          const x = a.label.toLowerCase();
          const y = b.label.toLowerCase();
          if (x < y) { return -1; }
          if (x > y) { return 1; }
          return 0;
        });
      },
      citySelect(value) {
        this.$emit('change-filter-city', value);
      },
      regionSelect(value) {
        if (value) {
          this.cityOptions = this.toArray(value.info).map(this.mapCities);
          this.cityOptions.sort((a, b) => {
            const x = a.label.toLowerCase();
            const y = b.label.toLowerCase();
            if (x < y) { return -1; }
            if (x > y) { return 1; }
            return 0;
          });
        } else {
          this.cityOptions = [];
        }
        this.$emit('change-filter-region', value);
      },
      mapRegions(dat) {
        return {
          label: dat.label,
          info: dat.cities,
          value: dat.value,
        };
      },
      mapCities(dat) {
        return {
          label: dat.label,
          value: dat.value,
        };
      },
      toArray(obj = {}) {
        const objKeys = Object.keys(obj);
        return objKeys.map(key => obj[key]);
      },
    },
    components: {
      vSelect,
    },
  };
</script>