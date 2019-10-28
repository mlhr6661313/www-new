import Vue from 'vue';
import whenWorks from 'vueComponents/when-works/when-works.vue';
import timeFilter from 'vueComponents/time-filter/time-filter.vue';
import filtersContainer from 'vueComponents/filters-container/filters-container.vue';
import advancedMap from 'vueComponents/maps/advanced/advanced-map.vue';
import advancedNewMap from 'vueComponents/maps/advanced-new/advanced-new-map.vue';
import simpleMap from 'vueComponents/maps/simple/simple-map.vue';
import singleMap from 'vueComponents/maps/single/single-map.vue';

const Map = new Vue({
  data: {
    defaultMapOptions: {
      styles: [
        {
          featureType: 'administrative',
          elementType: 'labels.text.fill',
          stylers: [
            {
              color: '#444444',
            },
          ],
        },
        {
          featureType: 'landscape.man_made',
          elementType: 'geometry.stroke',
          stylers: [
            {
              visibility: 'on',
            },
          ],
        },
        {
          featureType: 'landscape.natural',
          stylers: [
            {
              visibility: 'off',
            },
          ],
        },
        {
          featureType: 'poi',
          elementType: 'geometry.fill',
          stylers: [
            {
              visibility: 'off',
            },
          ],
        },
        {
          featureType: 'poi',
          elementType: 'labels.text',
          stylers: [
            {
              color: '#444444',
            },
            {
              visibility: 'off',
            },
          ],
        },
        {
          featureType: 'poi',
          elementType: 'labels.text.fill',
          stylers: [
            {
              visibility: 'on',
            },
          ],
        },
        {
          featureType: 'poi.park',
          elementType: 'geometry.fill',
          stylers: [
            {
              visibility: 'off',
            },
          ],
        },
        {
          featureType: 'road',
          stylers: [
            {
              saturation: -100,
            },
            {
              lightness: 45,
            },
          ],
        },
        {
          featureType: 'road.arterial',
          elementType: 'labels.icon',
          stylers: [
            {
              visibility: 'off',
            },
          ],
        },
        {
          featureType: 'road.highway',
          stylers: [
            {
              visibility: 'simplified',
            },
          ],
        },
        {
          featureType: 'transit',
          stylers: [
            {
              visibility: 'off',
            },
          ],
        },
        {
          featureType: 'water',
          stylers: [
            {
              color: '#b4d4e1',
            },
            {
              visibility: 'on',
            },
          ],
        },
      ],
      clusterStyles: [
        {
          textSize: 18,
          textColor: '#fff',
          url: '../../wp-content/plugins/BranderMap/frontend/images/clusterImages/m1.png',
          height: 40,
          width: 40,
        },
      ],
    },
  },

  computed: {
    getMapData() {
      const mapsConfig = document.getElementById('brander_map-extra_data');
      return mapsConfig ? mapsConfig.dataset : {};
    },
  },

  components: {
    filtersContainer,
    timeFilter,
    whenWorks,
    advancedMap,
    advancedNewMap,
    simpleMap,
    singleMap,
  },
});

const initBranderMap = () => {
  const branderMaps = document.querySelectorAll('.brander-map');

  if (branderMaps) {
    branderMaps.forEach((BranderMap) => {
      const mapId = BranderMap.getAttribute('id');
      if (mapId) {
        Map.$mount(`#${mapId}`);
      }
    });
  }
};

document.addEventListener('DOMContentLoaded', initBranderMap);
