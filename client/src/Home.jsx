import React from 'react';
import axios from 'axios';
import { MapContainer } from "./Map.jsx";
import {
  Map,
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";

const WrappedMap = withScriptjs(withGoogleMap(MapContainer));

class Home extends React.Component {

  constructor(props){
    super(props);
    this.state = {};
  }




  componentDidMount() {
    axios.get('/').then(({data}) => {
      console.log(data);
    })
  }
  render() {
    const userObj  = this.props.clientList
    console.log("This is Home:", userObj)
    return (
      <div>
      <h2>Home</h2>;
        <div style={{ width: "100vw", height: "100vh" }}>
            <WrappedMap
              googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${
                process.env.REACT_APP_GOOGLE_KEY
              }`}
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={<div style={{ height: `100%` }} />}
              mapElement={<div style={{ height: `100%` }} />}
              clientList={this.userObj}
            />
        </div>
      </div>
    )
  }
}

export { Home };