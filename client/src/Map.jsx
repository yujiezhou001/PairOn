import React from "react";
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";

export function Map() {
  return (
    <GoogleMap
      defaultZoom={16}
      defaultCenter={{ lat: 45.527535, lng: -73.59643 }}
    />
  );
}

export const WrappedMap = withScriptjs(withGoogleMap(Map));

export default Map;
