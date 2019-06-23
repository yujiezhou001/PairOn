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
        currentLocation: { lat: 45.5246127, lng: -73.5987241 }
      },
      userLocation: {
        lat: 0,
        lng: 0
      },
      geoReady: false,
      geoError: null,
      persons: this.props.clientList
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
    const imgPicture = {
      width: "50px"
    };
    // console.log("This is persons",this.state.persons)
    return (
      <GoogleMap
        ref={map => {
          this.map = map;
          if (map && lat && lng) {
            // console.log(bounds);
            // const bounds = new google.maps.LatLngBounds({ lat, lng });
            //map.fitBounds(bounds);
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
              lat: person.currentLocation.lat,
              lng: person.currentLocation.lng
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
              lat: this.state.selectedPerson.currentLocation.lat,
              lng: this.state.selectedPerson.currentLocation.lng
            }}
          >
            <div>
              <img
                className="rounded-circle"
                src={this.state.selectedPerson.avatarURL}
                style={imgPicture}
              />
              <h5>{this.state.selectedPerson.firstName}</h5>
              <p>{this.state.selectedPerson.hometown}</p>
              <button type="submit" className="btn btn-primary btn-sm">
                Profile
              </button>
              <button type="submit" className="btn btn-primary btn-sm">
                Chat
              </button>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    );
  }
}

export default MapContainer;
