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

// export const WrappedMap = withScriptjs(withGoogleMap(Map));
// console.log("This is Map:", this.props.clientList)
export class MapContainer extends Component {
  constructor(props) {
    super(props);

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

  handleOnClick = event => {
    // if (event.onClick) {
    this.props.updateExperiences(event.currentTarget.value);
    // this.setState({currentUser: event.currentTarget.value})
    // }
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

    // const lat = 45.5275387;
    // const lng = -73.5986187;

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

        {this.state.persons.map((person, index) => {
          if (
            this.props.currentExperiences === person.experiences ||
            this.props.currentExperiences === "All" ||
            person.experiences === "All"
          ) {
            return (
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
            );
          }
        })}

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

        <button
          onClick={this.handleOnClick}
          value="Drinks"
          className="btn btn-primary btn-sm"
        >
          Drinks
        </button>

        <button
          onClick={this.handleOnClick}
          value="Food"
          className="btn btn-primary btn-sm"
        >
          Food
        </button>

        <button
          onClick={this.handleOnClick}
          value="Culture"
          className="btn btn-primary btn-sm"
        >
          Culture
        </button>

        <button
          onClick={this.handleOnClick}
          value="Events"
          className="btn btn-primary btn-sm"
        >
          Events
        </button>

        <button
          onClick={this.handleOnClick}
          value="Sports"
          className="btn btn-primary btn-sm"
        >
          Sports
        </button>

        <button
          onClick={this.handleOnClick}
          value="Unique"
          className="btn btn-primary btn-sm"
        >
          Unique
        </button>

        <button
          onClick={this.handleOnClick}
          value="All"
          className="btn btn-primary btn-sm"
        >
          All
        </button>
      </GoogleMap>
    );
  }
}

export default MapContainer;
