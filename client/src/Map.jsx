import React, { Component } from "react";
// import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import {
  Map,
  GoogleApiWrapper,
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker,
  InfoWindow,
  Circle
} from "react-google-maps";
import mapStyles from "./mapStyles";
import BtnProfile from "./components/BtnProfile.jsx";

// export const WrappedMap = withScriptjs(withGoogleMap(Map));
// console.log("This is Map:", this.props.clientList)

export class MapContainer extends Component {
  constructor(props) {
    super(props),

    this.state = {
      selectedPerson: null,
      currentLocation: {
        lat: 0,
        lng: 0
      },
      geoReady: false,
      geoError: null,
      persons: this.props.clientList
    };
  }

  geoSuccess = position => {
    // console.log(position.coords.latitude, position.coords.longitude);
    let tempObj = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    };
    this.props.updateCurrentLocation(tempObj);

    this.setState({
      geoReady: true,
      currentLocation: {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }
    });
    // this.props.updateCurrentLocation(tempObj)
    console.log("This is from local state:", this.state.currentLocation);
    console.log("This is from parent state:", this.props.currentLocation);
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
    // console.log(this.props.updateCurrentLocation)
    this.setState({ geoReady: false, error: null });

    navigator.geolocation.getCurrentPosition(
      this.geoSuccess,
      this.geoFailure,
      geoOptions
    );
  }
  // const updatedLocation = this.props.currentUser.currentLocation
  render() {
    const { lat, lng } = this.props.currentLocation;
    const imgPicture = {
      width: "50px"
    };
    const circleOptions = {
      strokeColor: "#FF0000",
      strokeOpacity: 0.2,
      strokeWeight: 2,
      fillColor: "#FF0000",
      fillOpacity: 0.08
    };

    // console.log("This is persons",this.state.persons)
    return (
      <div className="Patete">
        <BtnProfile />
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
          defaultZoom={15}
          defaultCenter={{
            lat: lat,
            lng: lng
          }}
          defaultOptions={{ styles: mapStyles }}
        >
          <Circle
            defaultCenter={{
              lat: 45.5275387,
              lng: -73.5986187
            }}
            radius={1000}
            options={circleOptions}
          />
          {this.state.persons.map((person, index) => (
            <Marker
              key={index}
              id={index}
              position={{
                lat: person.currentLocation.lat,
                lng: person.currentLocation.lng
              }}
              onClick={() => this.setState({ selectedPerson: person })}
              icon={{
                url: `/waving-icon-18.jpg`,
                scaledSize: new window.google.maps.Size(40, 40)
              }}
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
                <a
                  className="btn btn-primary btn-sm"
                  href={`../../users/${this.state.selectedPerson.id}`}
                  role="button"
                >
                  Profile
                </a>
                <a
                  className="btn btn-primary btn-sm"
                  href={`../../chat/${this.state.selectedPerson.id}`}
                  role="button"
                >
                  Chat
                </a>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </div>
    );
  }
}

export default MapContainer;
