<style src="./contact-info.scss" lang="scss"></style>

<template>
   <div class="contact-info">
      <div class="contact-info__offices">
         <div class="contact-info__office"
               v-for="office in offices"
         >
            <div class="contact-info__name"
                  v-if="office.name"
            >{{ office.name }}
            </div>

            <div class="contact-info__content"
                  v-if="content"
                  v-html="content"
            ></div>

            <ul class="contact-info__phones">
               <li class="contact-info__phone"
                     v-for="phoneData in office.phones"
               >
                  <a :href="'tel:' + phoneData.phone.clear" class="contact-info__phone-number">
                     {{ phoneData.phone.original }}
                  </a>
                  <span class="contact-info__phone-comment"
                        v-if="phoneData.comment"
                  >
                     {{ phoneData.comment }}
                  </span>
               </li>
            </ul>

            <div class="contact-info__address">{{ office.address }}</div>

            <div class="contact-info__email">{{ office.email }}</div>

            <div class="contact-info__social">
               <slot></slot>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
  export default {
    props: ['content', 'jsonOffices'],
    computed: {
      offices() {
        return JSON.parse(this.jsonOffices);
      }
    },
  };
</script>