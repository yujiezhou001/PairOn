import React, { Component } from "react";
// import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import {
  Map,
  GoogleApiWrapper,
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";

// export const WrappedMap = withScriptjs(withGoogleMap(Map));
// console.log("This is Map:", this.props.clientList)
export class MapContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedPerson: {
        firstName: "Marie-Anne",
        hometown: "Laval",
        latitude: 45.5246127,
        longitude: -73.5987241
      },
      userLocation: {
        lat: 0,
        lng: 0
      },
      geoReady: false,
      geoError: null,
      persons: [
        {
          firstName: "Rebecca",
          hometown: "Montreal",
          latitude: 45.525063,
          longitude: -73.59943
        },
        {
          firstName: "Marie-Anne",
          hometown: "Laval",
          latitude: 45.5246127,
          longitude: -73.5987241
        },
        {
          firstName: "Yujie",
          hometown: "Dalian",
          latitude: 45.52744,
          longitude: -73.59643
        },
        {
          firstName: "Stephanie",
          hometown: "Halifax",
          latitude: 45.527255,
          longitude: -73.597953
        },
        {
          firstName: "Eric",
          hometown: "Saint-Sauveur",
          latitude: 45.5274897,
          longitude: -73.5984506
        },
        {
          firstName: "Melinda",
          hometown: "Montreal",
          latitude: 45.5311081,
          longitude: -73.5995769
        },
        {
          firstName: "Rebecca",
          hometown: "Montreal",
          latitude: 45.5311011,
          longitude: -73.5995709
        },
        {
          firstName: "Rebecca",
          hometown: "Montreal",
          latitude: 45.5241357,
          longitude: -73.5970109
        },
        {
          firstName: "Rebecca",
          hometown: "Montreal",
          latitude: 45.5279216,
          longitude: -73.5965196
        },
        {
          firstName: "Rebecca",
          hometown: "Montreal",
          latitude: 45.5277183,
          longitude: -73.5944831
        },
        {
          firstName: "Rebecca",
          hometown: "Montreal",
          latitude: 45.5303865,
          longitude: -73.5988069
        },
        {
          firstName: "Rebecca",
          hometown: "Montreal",
          latitude: 45.5263447,
          longitude: -73.5983598
        },
        {
          firstName: "Rebecca",
          hometown: "Montreal",
          latitude: 45.5261267,
          longitude: -73.5972654
        },
        {
          firstName: "Rebecca",
          hometown: "Montreal",
          latitude: 45.52714,
          longitude: -73.59613
        }
      ]
    };
  }

  geoSuccess = position => {
    console.log(position.coords.latitude, position.coords.longitude);

    this.setState({
      geoReady: true,
      userLocation: {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }
    });

    console.log(this.state.userLocation);
  };

  geoFailure = err => {
    this.setState({ geoError: err.message });
  };

  componentDidMount() {
    let geoOptions = {
      enableHighAccuracy: true,
      timeOut: 20000,
      maximumAge: 60 * 60
    };

    this.setState({ geoReady: false, error: null });

    navigator.geolocation.getCurrentPosition(
      this.geoSuccess,
      this.geoFailure,
      geoOptions
    );
  }

  render() {
    const { lat, lng } = this.state.userLocation;

    return (
      <GoogleMap
        ref={map => {
          this.map = map;
          if (map && lat && lng) {
            map.panTo({ lat, lng });
          }
        }}
        defaultZoom={16}
        defaultCenter={{
          lat: lat,
          lng: lng
        }}
      >
        {this.state.persons.map((person, index) => (
          <Marker
            key={index}
            id={index}
            position={{
              lat: person.latitude,
              lng: person.longitude
            }}
            onClick={() => this.setState({ selectedPerson: person })}
          />
        ))}
        {this.state.selectedPerson && (
          <InfoWindow
            onCloseClick={() => {
              this.setState({ selectedPerson: null });
            }}
            position={{
              lat: this.state.selectedPerson.latitude,
              lng: this.state.selectedPerson.longitude
            }}
          >
            <div>
              <h3>{this.state.selectedPerson.firstName}</h3>
              <p>{this.state.selectedPerson.hometown}</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    );
  }
}

export default MapContainer;
