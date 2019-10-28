<template>
    <div class="advanced-map brander-map__container">
        <filters-container
                container-size="1200px"
                :is-open-filters="isOpenFilters"
                :departments="departments"
                :json-labels="jsonLabels"
                :json-filters="jsonFilters"
                :json-filters-data="jsonFiltersData"
                :lang="langData"
                @filter:departments="filterDepartments"
                @is-open:filters="onFiltersOpen"
        ></filters-container>

        <div class="advanced-map__map-wrapper brander-map__wrapper">
            <div :id="'brander-map_advanced-' + mapId" class="advanced-map__map brander-map__map"></div>
            <transition name="slide">
                <departments-list
                        v-if="isOpenDepartments"
                        :title="labels.lombards_near_you"
                        :km="labels.km"
                        :departments="correctDepartments"
                        @getPosition="setMapPosition"
                        @closeDepartments="isOpenDepartments = false"
                ></departments-list>
            </transition>

            <transition name="slide">
                <departments-popup
                        v-if="isOpenPopup"
                        :department="clickedDepartment"
                        :labels="labels"
                        @click:close-popup="resetPopup()"
                ></departments-popup>
            </transition>
        </div>
    </div>
</template>

<script>
  import departmentsList from 'vueComponents/departments-list/departments-list.vue';
  import filtersContainer from 'vueComponents/filters-container/filters-container.vue';
  import departmentsPopup from 'vueComponents/departments-popup/departments-popup.vue';
  import './advanced-map.scss';

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
        onLoadLocation: {},
        currentLocation: {},
        clickedDepartment: {},
        popupDelay: 0,
        markerIcon: {
          normal: '/wp-content/plugins/BranderMap/frontend/images/map-marker.png',
          active: '/wp-content/plugins/BranderMap/frontend/images/map-marker-active.png',
        },
        map: {},
        markers: [],
        infoWindow: {},
        markersBounds: {},
        markerCluster: {},
        baseSettings: {
          zoom: 10,
          minZoom: 4,
          maxZoom: 15,
          center: new google.maps.LatLng(0, 0),
          styles: this.options.styles,
          scrollwheel: false,
          streetViewControl: false,
          zoomControlOptions: {
            position: google.maps.ControlPosition.LEFT_BOTTOM,
          },
        },
      };
    },
    mounted() {
      google.maps.event.addDomListener(window, 'load', this.initMap);
    },
    computed: {
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
      // watch displayed 'my location' button (show / hide button)
      isOpenDepartments() {
        const locationBtn = document.querySelector('.map-button[data-type="user-location"]');
        if (!this.isOpenDepartments) {
          locationBtn.removeAttribute('hidden');
        } else {
          locationBtn.setAttribute('hidden', 'hidden');
        }

        if (this.isOpenPopup) {
          this.resetPopup();
        }
      },
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
        // displayed 'my-location' search button if
        // allowed to determine the user's coordinates
        this.onLoadLocation = this.getUserLocation();
        this.onLoadLocation.then((position) => {
          this.currentLocation = position;
          this.loadDepartments();
          this.map
            .controls[google.maps.ControlPosition.LEFT_BOTTOM]
            .push(this.createCustomInterface());
          // update cluster after change markers list
          this.updateCluster();
        });
        // on click map action
        this.map.addListener('click', this.mapClickAction);
      },
      // load department data
      loadDepartments() {
        // set department collection state
        this.correctDepartments = this.setDepartmentsDistance(this.departments, this.currentLocation);
        // add markers in marker list
        this.markers = this.setMarkersList(this.correctDepartments, this.markersBounds);
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
        this.isOpenDepartments = false;
        this.resetPopup();
      },
      // add markers on map
      markersView(markers = [], map) {
        markers.forEach((marker) => {
          marker.setMap(map);
        });
      },
      // on click map department set marker on center map
      setMapPosition(position) {
        this.map.setCenter({
          lat: +position.lat,
          lng: +position.lng,
        });
        this.map.setZoom(15);
        this.map.panBy(200, 0);
      },
      // find current location on google map
      geolocation() {
        // set marker on current user location
        this.setUserLocation(this.currentLocation);
        this.isOpenDepartments = true;
        this.isOpenFilters = false;
      },
      // return promise with current user location
      // TODO: there may be a problem with determining current location
      getUserLocation() {
        return new Promise((resolve) => {
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
              resolve({
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              });
            });
          }
        });
      },
      // set current location marker on google map
      setUserLocation(position = {}) {
        const marker = new google.maps.Marker({
          position,
          icon: '../wp-content/plugins/BranderMap/frontend/images/current-position.png',
        });
        this.map.setCenter(position);
        this.map.setZoom(14);
        this.map.panBy(200, 0);
        marker.setMap(this.map);
      },
      // add distance to department after click 'my location' button
      setDepartmentsDistance(departments = [], currentLocation) {
        if (Array.isArray(departments)) {
          departments.forEach((department) => {
            const data = department;
            const [departmentLat, departmentLng, currentLat, currentLng] = [
              department.position.lat,
              department.position.lng,
              currentLocation.lat,
              currentLocation.lng,
            ];

            const distance = this.getDistance(new google.maps.LatLng(departmentLat, departmentLng),
              new google.maps.LatLng(currentLat, currentLng));

            if (distance) {
              data.distance = distance.toFixed(2);
            }
          });
          return departments;
        }
        return false;
      },
      getDistance(departmentLocation, currentLocation) {
        return google.maps
          .geometry.spherical
          .computeDistanceBetween(departmentLocation, currentLocation) / 1000;
      },
      // on click marker call this function
      markersAction(department, marker) {
        return () => {
          if (department === this.clickedDepartment) {
            return;
          }
          this.isOpenPopup = !this.isOpenPopup;
          this.isOpenDepartments = false;
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
      // create html element
      createElement(tag, config = {}) {
        const element = document.createElement(tag);
        if (config.className) {
          element.classList.add(config.className);
        }
        if (config.attr) {
          const keys = Object.keys(config.attr);
          const values = Object.values(config.attr);
          keys.forEach((key, index) => {
            element.setAttribute(key, values[index]);
          });
        }
        if (config.clickEvent) {
          element.addEventListener('click', config.clickEvent);
        }
        return element;
      },
      // create 'my location' button on google map
      createCustomInterface() {
        const myLocation = this.createElement('div', {
          className: 'map-button',
          attr: {
            'data-type': 'user-location',
          },
          clickEvent: this.geolocation,
        });
        const btn = this.createElement('div', {
          className: 'map-button__user-location',
        });
        myLocation.appendChild(btn);
        return myLocation;
      },
      // close all open elements
      mapClickAction() {
        this.isOpenDepartments = false;
        this.isOpenFilters = false;
        this.resetPopup();
      },
    },
    components: {
      departmentsList,
      filtersContainer,
      departmentsPopup,
    },
  };
</script>