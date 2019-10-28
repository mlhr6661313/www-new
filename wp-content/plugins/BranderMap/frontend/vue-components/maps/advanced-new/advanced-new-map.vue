<template>
    <div class="advanced-map brander-map__container">
        <h1 class="filters__title">{{ getTitle }}</h1>
        <filters-new-container
                container-size="1200px"
                :is-open-filters="isOpenFilters"
                :departments="departments"
                :json-labels="jsonLabels"
                :json-filters="jsonFilters"
                :json-filters-data="jsonFiltersData"
                :lang="langData"
                :is-open-departments="isOpenDepartments"
                @filter:departments="filterDepartments"
                @is-open:filters="onFiltersOpen"
                @clickMap="clickMap"
                @clickList="clickList">
        </filters-new-container>

        <div class="advanced-map__map-wrapper brander-map__wrapper">
            <transition name="slide">
                <div :id="'brander-map_advanced-' + mapId"
                     class="advanced-map__map brander-map__map"
                     v-show="!isOpenDepartments"
                ></div>
            </transition>

            <transition name="slide">
                <departments-list
                        v-show="isOpenDepartments"
                        :departments="departments"
                        :correctDepartments="correctDepartments"
                        :lang="langData"
                        :filtersData="filtersData">
                </departments-list>
            </transition>

            <transition name="slide">
                <departments-popup
                        v-if="isOpenPopup"
                        :department="clickedDepartment"
                        :labels="labels"
                        @click:close-popup="resetPopup()">
                </departments-popup>
            </transition>
        </div>
    </div>
</template>

<script>
  import departmentsList from 'vueComponents/departments-list/departments-list.vue';
  import filtersNewContainer from 'vueComponents/filters-container/filters-new-container.vue';
  import departmentsPopup from 'vueComponents/departments-popup/departments-popup.vue';
  import './advanced-new-map.scss';

  export default {
    props: [
      'mapId', 'options', 'jsonDepartments', 'jsonLabels',
      'jsonFilters', 'jsonFiltersData', 'jsonLang',
    ],
    data() {
      return {
        defaultMapPosition: {
          lat: 49.9935,
          lng: 36.230383,
        },
        isOpenDepartments: false,
        isOpenFilters: false,
        isOpenPopup: false,
        correctDepartments: [],
        clickedDepartment: {},
        popupDelay: 0,
        markerIcon: {
          normal: '/wp-content/plugins/BranderMap/frontend/images/map-marker.png',
          active: '/wp-content/plugins/BranderMap/frontend/images/map-marker-active.png',
        },
        map: {},
        markers: [],
        markersBounds: {},
        markerCluster: {},
        baseSettings: {
          zoom: 10,
          minZoom: 4,
          maxZoom: 18,
          center: new google.maps.LatLng(0, 0),
          styles: this.options.styles,
          scrollwheel: true,
          streetViewControl: false,
          mapTypeControl: false,
          zoomControlOptions: {
            position: google.maps.ControlPosition.RIGHT_BOTTOM,
          },
        },
      };
    },
    mounted() {
      google.maps.event.addDomListener(window, 'load', this.initMap);
    },
    computed: {
      // get page title from outside
      getTitle() {
        const el = document.querySelector('[data-departments-title]');
        return el ? el.getAttribute('data-title') : '';
      },
      // parse json object
      departments() {
        return JSON.parse(this.jsonDepartments);
      },
      // parse json object
      labels() {
        return JSON.parse(this.jsonLabels);
      },
      // parse json object
      filters() {
        return JSON.parse(this.jsonFilters);
      },
      // parse json object
      filtersData() {
        return JSON.parse(this.jsonFiltersData);
      },
      // parse json object
      langData() {
        return JSON.parse(this.jsonLang);
      },
    },
    watch: {
      markers(markers) {
        if (markers.length > 0) {
          // all markers in center
          this.markersBounds = new google.maps.LatLngBounds();
          markers.forEach((marker) => {
            this.markersBounds.extend(marker.position);
          });
          // all markers in center
          this.map.fitBounds(this.markersBounds);
        } else {
          this.map.setCenter(this.defaultMapPosition);
          this.map.setZoom(10);
        }
      },
    },
    methods: {
      // init google map
      initMap() {
        // get base map container
        const mapElement = document.getElementById(`brander-map_advanced-${this.mapId}`);
        // create google map
        this.map = new google.maps.Map(mapElement, this.baseSettings);
        // set departments collection state
        this.loadDepartments();
        // create cluster
        this.markerCluster = this.createCluster(this.map, this.markers);
        // on click map action
        this.map.addListener('click', this.mapClickAction);
      },
      clickMap() {
        this.isOpenDepartments = false;
        this.isOpenFilters = false;
        this.map.setZoom(6);
      },
      clickList() {
        this.isOpenDepartments = true;
        this.isOpenFilters = false;
        this.resetPopup();
      },
      // load department data
      loadDepartments() {
        // add markers in marker list
        this.markers = this.setMarkersList(this.departments, this.markersBounds);
        // displayed markers on map
        this.markersView(this.markers, this.map);
      },
      // get department collection
      filterDepartments(data) {
        // set filtered departments
        this.correctDepartments = data;
        // remove markers from map
        this.markersView(this.markers, null);
        this.markers = this.setMarkersList(this.correctDepartments);
        // add filtered markers on map
        this.markersView(this.markers, this.map);
        // update cluster after change markers list
        this.updateCluster();
      },
      // filters open action
      onFiltersOpen() {
        this.isOpenFilters = !this.isOpenFilters;
        this.resetPopup();
      },
      // add markers on map
      markersView(markers = [], map) {
        markers.forEach((marker) => {
          marker.setMap(map);
        });
      },
      // on click marker call this function
      markersAction(department, marker) {
        return () => {
          if (department === this.clickedDepartment) {
            return;
          }
          this.isOpenPopup = !this.isOpenPopup;
          this.isOpenFilters = false;
          this.clickedDepartment = department;
          this.setActiveMarker(marker, this.markers);
          this.map.setCenter(marker.position);
          this.map.setZoom(14);
          this.map.panBy(-200, 0);
        };
      },
      // drop all popup states
      resetPopup() {
        this.isOpenPopup = false;
        this.setActiveMarker(null, this.markers);
        this.clickedDepartment = [];
      },
      // drop event on click same marker
      setActiveMarker(active, markers) {
        const hasMarker = () => {
          if (active) {
            active.setIcon(this.markerIcon.active);
            setTimeout(() => {
              this.isOpenPopup = true;
            }, this.popupDelay);
          }
        };

        markers.forEach((marker) => {
          marker.setIcon(this.markerIcon.normal);
        });
        if (this.isOpenPopup) {
          this.isOpenPopup = false;
          this.popupDelay = 0;
          hasMarker();
        } else {
          this.popupDelay = 300;
          hasMarker();
        }
      },
      // marker constructor
      constructorMarker(position, department, bounds) {
        const marker = new google.maps.Marker({
          position,
          icon: this.markerIcon.normal,
        });
        // create marker click event
        marker.addListener('click', this.markersAction(department, marker));
        return marker;
      },
      // set markers list
      setMarkersList(departmens, bounds) {
        return departmens.map((department) => {
          // marker position
          const markerPosition = new google.maps
            .LatLng(department.position.lat, department.position.lng);
          return this.constructorMarker(markerPosition, department);
        });
      },
      // create google map clusters
      createCluster(map, markers) {
        return new MarkerClusterer(map, markers, {
          gridSize: 50,
          spiderfyOnMaxZoom: false,
          styles: this.options.clusterStyles,
        });
      },
      // update cluster after markers update
      updateCluster() {
        this.markerCluster.clearMarkers();
        this.markerCluster.addMarkers(this.markers);
      },
      // close all open elements
      mapClickAction() {
        this.isOpenFilters = false;
        this.resetPopup();
      },
    },
    components: {
      departmentsList,
      filtersNewContainer,
      departmentsPopup,
    },
  };
</script>