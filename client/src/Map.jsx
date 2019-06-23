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
} from "react-google-maps";

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
      persons: this.props.clientList// [
      //   {
      //     firstName: "Rebecca",
      //     hometown: "Montreal",
      //     latitude: 45.525063,
      //     longitude: -73.59943
      //   },
      //   {
      //     firstName: "Marie-Anne",
      //     hometown: "Laval",
      //     latitude: 45.5246127,
      //     longitude: -73.5987241
      //   },
      //   {
      //     firstName: "Yujie",
      //     hometown: "Dalian",
      //     latitude: 45.52744,
      //     longitude: -73.59643
      //   },
      //   {
      //     firstName: "Stephanie",
      //     hometown: "Halifax",
      //     latitude: 45.527255,
      //     longitude: -73.597953
      //   },
      //   {
      //     firstName: "Eric",
      //     hometown: "Saint-Sauveur",
      //     latitude: 45.5274897,
      //     longitude: -73.5984506
      //   },
      //   {
      //     firstName: "Melinda",
      //     hometown: "Montreal",
      //     latitude: 45.5311081,
      //     longitude: -73.5995769
      //   },
      //   {
      //     firstName: "Rebecca",
      //     hometown: "Montreal",
      //     latitude: 45.5311011,
      //     longitude: -73.5995709
      //   },
      //   {
      //     firstName: "Rebecca",
      //     hometown: "Montreal",
      //     latitude: 45.5241357,
      //     longitude: -73.5970109
      //   },
      //   {
      //     firstName: "Rebecca",
      //     hometown: "Montreal",
      //     latitude: 45.5279216,
      //     longitude: -73.5965196
      //   },
      //   {
      //     firstName: "Rebecca",
      //     hometown: "Montreal",
      //     latitude: 45.5277183,
      //     longitude: -73.5944831
      //   },
      //   {
      //     firstName: "Rebecca",
      //     hometown: "Montreal",
      //     latitude: 45.5303865,
      //     longitude: -73.5988069
      //   },
      //   {
      //     firstName: "Rebecca",
      //     hometown: "Montreal",
      //     latitude: 45.5263447,
      //     longitude: -73.5983598
      //   },
      //   {
      //     firstName: "Rebecca",
      //     hometown: "Montreal",
      //     latitude: 45.5261267,
      //     longitude: -73.5972654
      //   },
      //   {
      //     firstName: "Rebecca",
      //     hometown: "Montreal",
      //     latitude: 45.52714,
      //     longitude: -73.59613
      //   }
      // ]
    };
  }

  // useEffect(() => {
  //   const listener = e => {
  //     if (e.key === "Escape") {
  //       this.setState({ selectedPerson: person });
  //     }
  //   };
  //   window.addEventListener("keydown", listener);

  //   return () => {
  //     window.removeEventListener("keydown", listener);
  //   };
  // }, []);

  //   handleToggleOpen = () => {
  //     this.setState({
  //       isOpen: true
  //     });
  //   };

  //   handleToggleClose = () => {
  //     this.setState({
  //       isOpen: false
  //     });
  //   };

  //   displayMarkers = () => {
  //     return this.state.persons.map((person, index) => {
  //       return (
  //         <Marker
  //           key={index}
  //           id={index}
  //           position={{
  //             lat: person.latitude,
  //             lng: person.longitude
  //           }}
  //           onClick={() => this.setState({ selectedPerson: person })}
  //         />
  //       );
  //     });
  //   };

  //   displayMarkers = () => {

  // return this.state.persons.map((person, index) => {
  //   return (
  //     <Marker
  //       key={index}
  //       id={index}
  //       position={{
  //         lat: person.latitude,
  //         lng: person.longitude
  //       }}
  //     onClick={() => console.log("You clicked me!")} />
  //     });
  // }

  //   const [selectedPerson, setSelectedPerson] = useState(null);

  geoSuccess = position => {
    console.log(position.coords.latitude, position.coords.longitude);

    this.setState({
      geoReady: true,
      currentLocation: {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }
    });
    this.props.updateCurrentLocation(this.state.currentLocation(lat, lgn))
    console.log(this.state.currentLocation);
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

  // componentDidMount() {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.watchPosition(
  //       position => {
  //         this.setState({
  //           userLocation: {
  //             lat: position.coords.latitude,
  //             lng: position.coords.longitude
  //           }
  //         });
  //       },
  //       err => console.log(err),
  //       { enableHighAccuracy: true, timeout: 20000, maximumAge: 60 * 60 }
  //     );
  //   } else {
  //     alert("Error! Browser does not support geolocation.");
  //   }

  //   console.log(this.state.userLocation);
  // }


  render() {
    const { lat, lng } = this.state.currentLocation;
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
              <h3>{this.state.selectedPerson.firstName}</h3>
              <p>{this.state.selectedPerson.hometown}</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    );
  }
}

// {/*
//         /* {this.state.person && (
//           <InfoWindow
//             onCloseClick={() => {
//               this.setState.persons(null);
//             }}
//             position={{
//               lat: this.state.persons.latitude,
//               lng: this.state.persons.longitude
//             }}
//           >
//             <div>
//               <h3>{this.state.persons.firstName}</h3>
//               <p>{this.state.persons.hometown}</p>
//             </div>
//           </InfoWindow> */
//           )}

/* <Marker
          position={
            ({
              lat: 45.52754,
              lng: -73.59663
            },
            {
              lat: 45.5258607,
              lng: -73.5986309
            },
            {
              lat: 45.52753,
              lng: -73.59623
            },
            {
              lat: 45.52744,
              lng: -73.59603
            },
            {
              lat: 45.52752,
              lng: -73.59623
            },
            {
              lat: 45.52755,
              lng: -73.59653
            })
          } */

// onClick={() => {
//     setSelectedPerson(park);
// }}
// />

/* <Marker position={{ lat: 45.5258607, lng: -73.5986309 }} /> */

// export class MapContainer extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       stores: [
//         { lat: 47.49855629475769, lng: -122.14184416996333 },
//         { latitude: 47.359423, longitude: -122.021071 },
//         { latitude: 47.2052192687988, longitude: -121.988426208496 },
//         { latitude: 47.6307081, longitude: -122.1434325 },
//         { latitude: 47.3084488, longitude: -122.2140121 },
//         { latitude: 47.5524695, longitude: -122.0425407 }
//       ]
//     };
//   }

//   displayMarkers = () => {
//     return this.state.stores.map((store, index) => {
//       return (
//         <Marker
//           key={index}
//           id={index}
//           position={{
//             lat: store.latitude,
//             lng: store.longitude
//           }}
//           onClick={() => console.log("You clicked me!")}
//         />
//       );
//     });
//   };

//   render() {
//     return (
//       <Map
//         google={this.props.google}
//         zoom={8}
//         style={mapStyles}
//         initialCenter={{ lat: 47.444, lng: -122.176 }}
//       >
//         {this.displayMarkers()}
//       </Map>
//     );
//   }
// }

export default MapContainer;
