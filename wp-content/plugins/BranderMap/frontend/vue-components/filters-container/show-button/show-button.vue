<template>
   <div :class="['filters-button', {'open': isOpenFilters}]" @click="$emit('is-open:filters')">
      <div :class="['filters-button__burger', {'changed': filtersChanged}]">
         <div class="filters-button__burger-line" v-for="n in 3"></div>
      </div>
      <div class="filters-button__name"><slot></slot></div>
   </div>
</template>

<script>
   import './show-button.scss';

   export default {
     props: ['filtersChanged', 'isOpenFilters'],
   };
</script>