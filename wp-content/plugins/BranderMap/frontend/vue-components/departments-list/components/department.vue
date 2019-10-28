<template>
    <div class="map-department-outer">
        <div class="map-department">
            <div class="map-department__group">
                <a class="map-department__image" :href="info.link" :title="info.name">
                    <img v-if="info.image" :src="info.image" :title="info.name" :alt="info.name"/>
                </a>
                <div class="map-department__group__info">
                    <a class="map-department__address" :href="info.link" :title="info.name">
                        <span>{{ info.address }}</span>
                    </a>

                    <a class="map-department__reception" :href="info.link" :title="info.name">
                        <ul>
                            <li v-for="rec in info.reception"><span>{{ filtersData.reception[rec] }}</span></li>
                        </ul>
                    </a>

                    <div class="map-department__phone">
                        <a :href="'tel:'+info.phone.clear" v-if="info.phone">{{ info.phone.original }}</a>
                    </div>
                </div>
            </div>
            <div class="map-department__days">
                <div class="one-department__day" v-for="(num, day) in info.days">
                    <span class="days-info__name">{{ lang.days[num-1] }}</span>

                    <span class="days-info__time" v-if="info.work_from[num] !=='' && info.work_to[num] !==''">
                        <span class="days-info__from">{{ convertTime(info.work_from[num]) }}</span>
                        <span class="days-info__delimiter"> - </span>
                        <span class="days-info__to">{{ convertTime(info.work_to[num]) }}</span>
                    </span>

                    <span class="days-info__time" v-else>
                        {{ lang.round_the_clock_text }}
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import './department.scss';

  export default {
    props: ['info', 'lang', 'filtersData'],
    mounted() {
      // console.log(this.info.reception);
      // console.log(this.filtersData);
    },
    methods: {
      firstNull(num) {
        return +num < 10 ? `0${num}` : num;
      },
      getDecimal(num) {
        return num > 0 ? num - Math.floor(num) : Math.ceil(num) - num;
      },
      convertTime(value) {
        const dirtyTime = value / 60;
        const hours = Math.floor(dirtyTime);
        const minutes = Math.round(this.getDecimal(dirtyTime) * 60);
        return `${this.firstNull(hours)}:${this.firstNull(minutes)}`;
      },
    },
  };
</script>

