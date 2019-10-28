<template>
   <div class="work-day">
      <label class="work-day__label">
         <input
               type="checkbox"
               class="work-day__input"
               :name="'days_group[days][' + loopIndex + ']'"
               :value="loopIndex"
               :checked="dayState"
         >
         <span class="work-day__name"><slot></slot></span>
      </label>
   </div>
</template>

<script>
  export default {
    props: ['dayState', 'loopIndex'],
    data() {
      return {};
    },

    components: {},
  };
</script>