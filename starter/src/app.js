/**
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Loader } from '@googlemaps/js-api-loader';
import MarkerClusterer from '@google/markerclustererplus';

const apiOptions = {
    apiKey: "AIzaSyDb-JYtPPv5CujnKefClvRF2B_X_p9O61Q"
}

const loader = new Loader(apiOptions);

loader.load().then(() => {
    console.log('Maps JS API loaded');
    const map = displayMap();
    const markers = addMarkers(map);
    clusterMarkers(map, markers);
    addPanToMarker(map, markers);
});

function displayMap() {
    // this style simply hides the POIs automatically created by google
    const myStyles = [
        {
            featureType: "poi",
            elementType: "labels",
            stylers: [
                { visibility: "off" }
            ]
        }
    ];

    const mapOptions = {
        center: { lat: 42.833333, lng: -88.732222 },
        zoom: 14,
        styles: myStyles
    }
    const mapDiv = document.getElementById('map');
    const map = new google.maps.Map(mapDiv, mapOptions);

    return map;
}

function addMarkers(map) {
    const locations = {
        cozumel: { lat: 42.834484, lng: -88.750673 },
        uww: { lat: 42.839831, lng: -88.744122 },
        brainFreeze: { lat: 42.832578, lng: -88.721376 },
        kwikTrip: { lat: 42.821578, lng: -88.746306 },
        waterTower: { lat: 42.841786, lng: -88.739372 },
        sweetSpot: { lat: 42.832372, lng: -88.732902 }
    }
    const markers = [];
        for (const location in locations) {
            const markerOptions = {
                map: map,
                position: locations[location],
                icon: './img/custom_pin.png'
            }
            const marker = new google.maps.Marker(markerOptions);
            markers.push(marker);
        }
    return markers;
}

function clusterMarkers(map, markers) {
    const clustererOptions = { imagePath: './img/m' }
    const markerCluster = new MarkerClusterer(map, markers, clustererOptions);
}

function addPanToMarker(map, markers) {
    let circle;
    markers.map(marker => {
        marker.addListener('click', event => {
            const location = { lat: event.latLng.lat(), lng: event.latLng.lng() };
            map.panTo(location);
            if (circle) {
                circle.setMap(null);
            }
            circle = drawCircle(map, location);
        });
    });
}

function drawCircle(map, location) {
    const circleOptions = {
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 1,
        map: map,
        center: location,
        radius: 800
    }
    const circle = new google.maps.Circle(circleOptions);
    return circle;
}
