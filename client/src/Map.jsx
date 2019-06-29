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
import { Link } from "react-router-dom";
import mapStyles from "./mapStyles";
import HorizontalScroll from "./components/HorizontalScroll.jsx";

// export const WrappedMap = withScriptjs(withGoogleMap(Map));
// console.log("This is Map:", this.props.clientList)
export class MapContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedPerson: null,
      selectedEvent: null,
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

        onRightClick={this.props.updateEventsList}
      >
{/*        <Circle
          defaultCenter={{
            lat: 45.5275387,
            lng: -73.5986187
          }}
          radius={1000}
          options={circleOptions}
        />*/}

        // render an event marker for each event in the event list with .map function
        {this.props.eventsList.map((oneEvent, index) => {

          {
            let eventIcon = "/eventicon.png"

            return (
              <Marker
                key={index}
                id={index}
                position={{
                  lat: oneEvent.lat,
                  lng: oneEvent.lng
                }}
                onClick={() => this.setState({ selectedEvent: oneEvent })}
                onRightClick={() => this.props.removeEventPin(oneEvent)}
                icon={{
                  url: eventIcon,
                  scaledSize: new window.google.maps.Size(40, 40)
                }}
              />
            );
          }
        })}

        {this.state.selectedEvent && (
          <InfoWindow
            onCloseClick={() => {
              this.setState({ selectedEvent: null });
            }}
            position={{
              lat: this.state.selectedEvent.lat,
              lng: this.state.selectedEvent.lng
            }}
          >
            <div>
              <img
                className="rounded-circle"
                src={this.state.selectedEvent.avatarURL}
                style={imgPicture}
              />

              <h5>Event</h5>

              <p>{this.state.selectedEvent.description}</p>

              <Link to={`../../users/${this.state.selectedEvent.id}`}>
                <button type="button" className="btn btn-primary btn-sm">
                  Profile
                </button>
              </Link>

              <Link to={`../../chat/${this.state.selectedEvent.id}`}>
                <button type="button" className="btn btn-primary btn-sm">
                  Chat
                </button>
              </Link>
            </div>
          </InfoWindow>
        )}

        {this.props.clientList.map((person, index) => {
          //this.state.persons
          if (
            this.props.currentExperiences === person.experiences ||
            this.props.currentExperiences === "all" ||
            person.experiences === "all"
          ) {
            let personIcon = "/waving-icon-18.jpg";

            if (this.props.currentUserId === person.id) {
              personIcon = "/currentUser_Location.png";
            }

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
                  url: personIcon,
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

              <Link to={`../../users/${this.state.selectedPerson.id}`}>
                <button type="button" className="btn btn-primary btn-sm">
                  Profile
                </button>
              </Link>

              <Link to={`../../chat/${this.state.selectedPerson.id}`}>
                <button type="button" className="btn btn-primary btn-sm">
                  Chat
                </button>
              </Link>
            </div>
          </InfoWindow>
        )}
        <HorizontalScroll handelExperience={this.handleOnClick} />
      </GoogleMap>
    );
  }
}

export default MapContainer;
