import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Chat } from "./Chat";
import { Register } from "./Register";
import { Login } from "./Login";
import { Home } from "./Home";
import { Profile } from "./Profile";
import { MapContainer } from "./Map.jsx";
import {
  Map,
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";

// const WrappedMap = withScriptjs(withGoogleMap(Map));

const WrappedMap = withScriptjs(withGoogleMap(MapContainer));

function Index() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}

function About() {
  return (
    <div>
      <h1>hello</h1>
      <h2>hello world</h2>
    </div>
  );
}

function Users() {
  return <h2>Users</h2>;
}

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/users/id">Profile</Link>
            </li>
            <li>
              <Link to="/login/">Login</Link>
            </li>
            <li>
              <Link to="/register/">Register</Link>
            </li>
            <li>
              <Link to="/chat/">Chat</Link>
            </li>
          </ul>
        </nav>
        <div style={{ width: "100vw", height: "100vh" }}>
          <WrappedMap
            googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${
              process.env.REACT_APP_GOOGLE_KEY
            }`}
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `100%` }} />}
            mapElement={<div style={{ height: `100%` }} />}
          />
        </div>

        <Route path="/" exact component={Home} />
        <Route path="/chat/" component={Chat} />
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register} />
        <Route path="/users/id" component={Profile} />
      </div>
    </Router>
  );
}

export default App;
