// import React, { Component } from 'react';
// import PropTypes from 'prop-types';

// import MarkerClusterer from 'node-js-marker-clusterer';

// class GoogleMap extends Component {
// 	componentDidMount() {
// 		this.loadMap();
// 	}

// 	componentDidUpdate(prevProps) {
// 		if (prevProps.google !== this.props.google || prevProps.locations !== this.props.locations) {
// 			this.loadMap();
// 		}
// 	}

// 	loadMap() {
// 		if (this.props && this.props.google) {
// 			const { google } = this.props;
// 			const node = this.mapRef;
// 			const mapConfig = Object.assign(
// 				{},
// 				{
// 					center: { lat: this.props.settings.defaultLatitude, lng: this.props.settings.defaultLongitude },
// 					zoom: this.props.settings.zoom,
// 					mapTypeControl: false,
// 					streetViewControl: true,
// 					gestureHandling: 'cooperative'
// 				}
// 			);

// 			this.map = new google.maps.Map(node, mapConfig);

// 			const infowindow = new google.maps.InfoWindow({
// 				content: this.props.labels.loading
// 			});

// 			const markers = this.props.locations.map((location) => {
// 				const marker = new google.maps.Marker({
// 					position: { lat: location.lat, lng: location.lng },
// 					map: this.map,
// 					content: `<div class="c-maps__callout">
//             ...
//           </div>`,
// 					icon: '/static/assets/icon-mapmarker.png'
// 				});

// 				if (location.isOpen) {
// 					setTimeout(() => {
// 						infowindow.setContent(marker.content);
// 						infowindow.open(this.map, marker);
// 					}, 1000);
// 				}

// 				google.maps.event.addListener(marker, 'click', () => {
// 					infowindow.setContent(marker.content);
// 					infowindow.open(this.map, marker);
// 				});

// 				return marker;
// 			});

// 			return new MarkerClusterer(this.map, markers, {
// 				styles: [
// 					{
// 						width: 40,
// 						height: 40,
// 						url: '/static/assets/icon-markercluster1.png',
// 						textColor: 'white'
// 					}
// 				]
// 			});
// 		}

// 		return {};
// 	}

// 	render() {
// 		return (
// 			<div
// 				className='c-maps'
// 				ref={(e) => {
// 					this.mapRef = e;
// 				}}
// 			/>
// 		);
// 	}
// }
