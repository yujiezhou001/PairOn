import React from "react";
import axios from "axios";
import { MapContainer } from "./Map.jsx";
import {
  Map,
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";

import toaster from "toasted-notes";
import "toasted-notes/src/styles.css"; // optional styles

const WrappedMap = withScriptjs(withGoogleMap(MapContainer));

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    axios.get("/").then(({ data }) => {
      // console.log(data);
    });
  }
  render() {
    return (
      <div className="map" style={{ width: "100vw", height: "100vh" }}>
        <img className="logo-map" src="../pair_on_logo.png" />
        <WrappedMap
          googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${
            process.env.REACT_APP_GOOGLE_KEY
          }`}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `100%` }} />}
          mapElement={<div style={{ height: `100%` }} />}
          clientList={this.props.clientList}
          updateCurrentLocation={this.props.updateCurrentLocation}
          currentLocation={this.props.currentLocation}
          updateExperiences={this.props.updateExperiences}
          currentExperiences={this.props.currentExperiences}
          currentUserId={this.props.currentUserId}
          eventsList={this.props.eventsList}
          updateEventsList={this.props.updateEventsList}
          removeEventPin={this.props.removeEventPin}
        />
      </div>
    );
  }
}

export { Home };
