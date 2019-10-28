<template>
   <div class="region-filters">
      <div class="region-filters__title">{{ labels.what_gets }}</div>
      <div class="region-filters__filters">
         <when-works
               ref="reciveCheckbox"
               v-for="(filter, name) in filtersData"
               :key="name"
               :id="name"
               name="recive_filters[]"
               :value="name"
               @change:filter:reception="$emit('change-filter-reception', $event)"
         >
            {{ filter }}
         </when-works>
      </div>
   </div>
</template>

<script>
  import whenWorks from '../../when-works/when-works.vue';
  import './reception-filter.scss';

  export default {
    props: ['filtersData', 'labels', 'filtersChanged'],
    watch: {
      filtersChanged(state) {
        if (!state) {
          this.$refs.reciveCheckbox.forEach((ckeckbox) => {
            const checkedBox = ckeckbox;
            checkedBox.isChecked = false;
          });
        }
      },
    },
    components: {
      whenWorks,
    },
  };
</script>