<template>
    <div class="simple-map brander-map__container">
        <div class="simple-map__map-wrapper brander-map__map-wrapper">
            <div :id="'brander-map_simple-' + mapId" class="simple-map__map brander-map__map"></div>
        </div>
    </div>
</template>

<script>
  import './simple-map.scss';

  export default {
    props: [
      'options', 'jsonDepartments', 'jsonLabels',
      'mapId',
    ],

    data() {
      return {
        correctDepartments: [],
        onLoadLocation: {},
        currentLocation: {},
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
          maxZoom: 14,
          center: new google.maps.LatLng(0, 0),
          styles: this.options.styles,
          scrollwheel: true,
          streetViewControl: false,
          zoomControlOptions: {
            position: google.maps.ControlPosition[this.controllerPosition],
          },
        },
        controllerPosition: 'RIGHT_BOTTOM',
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
        const mapElement = document.getElementById(`brander-map_simple-${this.mapId}`);
        // all markers in center
        this.markersBounds = new google.maps.LatLngBounds();
        // create google map
        this.map = new google.maps.Map(mapElement, this.baseSettings);
        this.loadDepartments();
        // all markers in center
        this.map.fitBounds(this.markersBounds);
        // set map interface position
        // TODO: onClick my location btn
        this.onLoadLocation = this.getUserLocation();
        this.onLoadLocation.then((position) => {
          this.currentLocation = position;
          this.loadDepartments();
          this.map
              .controls[google.maps.ControlPosition[this.controllerPosition]]
              .push(this.createCustomInterface());
          // update cluster after change markers list
          this.updateCluster();
        });
        // create cluster
        this.markerCluster = this.createCluster(this.map, this.markers);
        // on click map action
        this.map.addListener('click', this.mapClickAction);
      },
      // update cluster after markers update
      updateCluster() {
        this.markerCluster.clearMarkers();
        this.markerCluster.addMarkers(this.markers);
      },
      // load department data
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

          if (markers.length === 1) {
            map.setZoom(15);
          }
        });
      },

      // on click map department set marker on center map
      setMapPosition(position) {
        this.map.setCenter({
          lat: +position.lat,
          lng: +position.lng,
        });
        this.map.setZoom(15);
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
        const marker = new google.maps.Marker({
          position,
          icon: '../wp-content/plugins/BranderMap/frontend/images/current-position.png',
        });
        this.map.setCenter(position);
        this.map.setZoom(14);
        marker.setMap(this.map);
      },
      // on click marker call this function
      markersAction(department, marker) {
        return () => {
        };
      },
      // marker constructor
      constructorMarker(position, department, bounds) {
        const marker = new google.maps.Marker({
          position,
          icon: this.markerIcon.normal,
        });
        if (bounds) {
          // all markers in center
          bounds.extend(position);
        }
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
      // close all open elements
      mapClickAction() {
        this.isOpenDepartments = false;
        this.isOpenFilters = false;
      },
    },
  };
</script>