<template>
   <div class="single-map brander-map__container">
      <div class="single-map__map-wrapper brander-map__wrapper">
         <div :id="'brander-map_single-' + mapId" class="single-map__map brander-map__map"></div>
      </div>
   </div>
</template><

<script>
  import './single-map.scss';

  export default {
    props: [
      'mapId', 'options', 'jsonDepartments', 'jsonLabels',
    ],
    data() {
      return {
        correctDepartments: [],
        onLoadLocation: {},
        currentLocation: {},
        userLocationMarker: {},
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
          zoom: 14,
          styles: this.options.styles,
          scrollwheel: true,
          streetViewControl: false,
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
      // parse json object
      departments() {
        return JSON.parse(this.jsonDepartments);
      },
      // parse json object
      labels() {
        return JSON.parse(this.jsonLabels);
      },
    },
    methods: {
      // init google map
      initMap() {
        // get base map container
        const mapElement = document.getElementById(`brander-map_single-${this.mapId}`);
        // create google map
        this.map = new google.maps.Map(mapElement, this.baseSettings);
        this.loadDepartments();
        // set map interface position
        // TODO: onClick my location btn
        this.onLoadLocation = this.getUserLocation();
        this.onLoadLocation.then((position) => {
          this.currentLocation = position;
          this.loadDepartments();
          // set map interface position
          this.map
              .controls[google.maps.ControlPosition.RIGHT_BOTTOM]
              .push(this.createCustomInterface());
          // update cluster after change markers list
          this.updateCluster();
        });
        this.markerCluster = this.createCluster(this.map, this.markers);
        this.map.setCenter(this.correctDepartments[0].position);
      },
      // update cluster after markers update
      updateCluster() {
        this.markerCluster.clearMarkers();
        this.markerCluster.addMarkers(this.markers);
      },
      loadDepartments() {
        // set department collection
        this.correctDepartments = this.departments;
        // add markers in marker list
        this.markers = this.setMarkersList(this.correctDepartments, this.markersBounds);
        // displayed markers on map
        this.markersView(this.markers, this.map);
      },
      // add markers on map
      markersView(markers = [], map) {
        markers.forEach((marker) => {
          marker.setMap(map);
        });
      },
      // find current location on google map
      geolocation() {
        // set marker on current user location
        this.setUserLocation(this.currentLocation);
      },
      // return promise with current user location
      // TODO: there may be a problem with determining current location
      getUserLocation() {
        return new Promise((resolve, reject) => {
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
        const userLocation = new google.maps.Marker({
          position,
          icon: '../../wp-content/plugins/BranderMap/frontend/images/current-position.png',
        });
        userLocation.setMap(this.map);
        // all markers in center
        this.markersBounds = new google.maps.LatLngBounds();
        this.markers.forEach((marker) => {
          this.markersBounds.extend(marker.position);
        });
        this.markersBounds.extend(position);
        // all markers in center
        this.map.fitBounds(this.markersBounds);
      },
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
      constructorMarker(position, department) {
        const marker = new google.maps.Marker({
          position,
          icon: this.markerIcon.active,
        });
        return marker;
      },
      // set markers list
      setMarkersList(departmens, bounds) {
        return departmens.map((department) => {
          // marker position
          const markerPosition = new google.maps
              .LatLng(department.position.lat, department.position.lng);
          return this.constructorMarker(markerPosition, department, bounds);
        });
      },
      // create google map clusters
      createCluster(map, markers) {
        return new MarkerClusterer(map, markers, {
          gridSize: 50,
          styles: this.options.clusterStyles,
        });
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
          attr: {
            'data-position': 'right',
          },
        });
        myLocation.appendChild(btn);
        return myLocation;
      },
    },
  };
</script>