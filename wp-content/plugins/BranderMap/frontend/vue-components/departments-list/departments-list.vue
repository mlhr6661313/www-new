<template>
    <div class="map-departments">
        <div class="map-departments__wrapper">
            <div class="map-departments__list">
                <div class="map-departments__thead">
                    <div class="map-departments__thead__group">
                      <div class="img"></div>
                      <div class="map-departments__thead__group__info">
                        <div class="address">{{ lang.address }}</div>
                        <div class="what_get">{{ lang.services }}</div>
                        <div class="phone">{{ lang.phone }}</div>
                      </div>
                    </div>
                    <div class="when_work">{{ lang.when_work }}</div>
                </div>
                <department v-for="dep in getDepartments"
                            :key="dep.id"
                            :info="dep"
                            :lang="lang"
                            :filtersData="filtersData">
                </department>
            </div>
        </div>
    </div>
</template>

<script>
  import './departments-list.scss';
  import department from './components/department.vue';

  export default {
    props: ['departments', 'correctDepartments', 'lang', 'filtersData'],
    computed: {
      getDepartments() {
        return this.correctDepartments.length ? this.correctDepartments : this.departments;
      },
    },
    components: {
      department,
    },
  };
</script>