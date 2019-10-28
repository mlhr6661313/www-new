<style src="./contact-map.scss" lang="scss"></style>

<template>
   <div class="contacts-map">
      <div class="contacts-map__map"
            data-js-contactPage="map"
      ></div>
   </div>
</template>

<script>
  export default {
    props: ['jsonOffices'],
    data() {
      return {
        mapSelector: '[data-js-contactPage="map"]',
        map: {},
        mapOption: {
          zoom: 14,
          streetViewControl: false,
          scrollwheel: false,
          styles: [
            {
              featureType: 'administrative',
              elementType: 'labels.text.fill',
              stylers: [
                { color: '#444444' },
              ],
            }, {
              featureType: 'landscape',
              elementType: 'all',
              stylers: [
                { color: '#f2f2f2' },
              ],
            }, {
              featureType: 'poi',
              elementType: 'all',
              stylers: [
                { visibility: 'off' },
              ],
            }, {
              featureType: 'poi.business',
              elementType: 'geometry.fill',
              stylers: [
                { visibility: 'on' },
              ],
            }, {
              featureType: 'road',
              elementType: 'all',
              stylers: [
                { saturation: -100 }, { lightness: 45 },
              ],
            }, {
              featureType: 'road.highway',
              elementType: 'all',
              stylers: [
                { visibility: 'simplified' },
              ],
            }, {
              featureType: 'road.arterial',
              elementType: 'labels.icon',
              stylers: [
                { visibility: 'off' },
              ],
            }, {
              featureType: 'transit',
              elementType: 'all',
              stylers: [
                { visibility: 'off' },
              ],
            }, {
              featureType: 'water',
              elementType: 'all',
              stylers: [
                { color: '#b4d4e1' }, { visibility: 'on' },
              ],
            },
          ],
        },
        markerIcon: {
          normal: '../../wp-content/plugins/BranderMap/frontend/images/map-marker.png',
          active: '../../wp-content/plugins/BranderMap/frontend/images/map-marker-active.png',
        },
      };
    },

    mounted() {
      google.maps.event.addDomListener(window, 'load', this.initMap);
    },

    computed: {
      offices() {
        const offices = JSON.parse(this.jsonOffices);
        return Object.values(offices);
      }
    },

    methods: {
      initMap() {
        const mapElement = document.querySelector(this.mapSelector);
        const currentWidth = document.body.clientWidth;

        if (mapElement) {
          this.map = new google.maps.Map(mapElement, this.mapOption);
          const mainDepartmentPosition = {
            lat: +this.offices[0].lat,
            lng: +this.offices[0].lng,
          };
          const marker = this.markerConstructor(mainDepartmentPosition);

          marker.setMap(this.map);
          this.map.setCenter(mainDepartmentPosition);
          if (currentWidth <= 896) {
            this.map.panBy(0, 0);
          } else {
            this.map.panBy(-200, 0);
          }
          this.$emit('init:contact-map');
        }
      },

      markerConstructor(position) {
        return new google.maps.Marker({
          position,
          icon: this.markerIcon.normal,
        });
      },
    },
  };
</script>
