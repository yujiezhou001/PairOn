// import React from 'react';
// import logo from './logo.svg';
// import './App.css';
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";
// import { Chat } from './Chat';
// import { Register } from './Register';
// import { Login } from './Login';
// import { Home } from './Home';
// import { Profile } from './Profile';



// // Can we delete this guys?
// // function App() {
// //   return (
// //     <div className="App">
// //       <header className="App-header">
// //         <img src={logo} className="App-logo" alt="logo" />
// //         <p>
// //           Edit <code>src/App.js</code> and save to reload.
// //         </p>
// //         <a
// //           className="App-link"
// //           href="https://reactjs.org"
// //           target="_blank"
// //           rel="noopener noreferrer"
// //         >
// //           Learn React
// //         </a>
// //       </header>
// //     </div>
// //   );
// // }

// // export default App;


// class App extends React.Component {
//   //sets intial state
//   super(props);
//       this.state = {
//         currentUser: {firstName: null, hometown: null, experiences: "All", avatarURL: null, currentLocation: { lat, lng, "IE. GOOGLE API"}, aboutMe: null}
//         clientList: [], // full of currentUser objects sent from WebSocket
//         Chatmessages: []
//       };
//     }


// // everything except the current location (not stored in db)
//   getUserInfoFromDB = () => {
//     const userObjFromDB = {};
//     knex
//         .select("*")
//         .from ("users")
//         .where({users.id = user_id})
//         .then(results => {
//           userObjFromDB = results;
//         })
//     return userObjFromDB;
//   }
//   // should I pass the currentUser Obj?
//       updateUserList = (newuser) => {
//    // const newCurrentUser = Object.assign({}, this.state.currentUser)
//     // newCurrentUser.name = newName

//         const newCurrentUser = { ...this.state.currentUser, firstName: newUser.firstName , hometown: this.state.currentUser.hometown, experiences: "All", currentLocation: }


//         this.setState({currentUser: newCurrentUser})

//         const notificationObj = {
//           type: "newCurrentUser",
//           content: {} // passing the new user object to push to the client list
//           }


//   this.state = {
//         currentUser: {name: "Anonymous", hometown: ""}
//     changeName = (newName) => {
//    // const newCurrentUser = Object.assign({}, this.state.currentUser)
//     // newCurrentUser.name = newName
//     const newCurrentUser = { ...this.state.currentUser, name: newName, hometown: this.state.currentUser.hometown}

//     const oldName = this.state.currentUser.name;

//     this.setState({currentUser: newCurrentUser})



//     render() {
//       return (
//         <Router>
//           <div>
//             <nav>
//               <ul>
//                 <li>
//                   <Link to="/">Home</Link>
//                 </li>
//                 <li>
//                   <Link to="/users/id">Profile</Link>
//                 </li>
//                 <li>
//                   <Link to="/login/">Login</Link>
//                 </li>
//                 <li>
//                   <Link to="/register/">Register</Link>
//                 </li>
//                 <li>
//                   <Link to="/chat/">Chat</Link>
//                 </li>
//               </ul>
//             </nav>

//             <Route path="/" exact component={Home} />
//             <Route path="/chat/"  component={Chat} />
//             <Route path="/login" exact component={Login} />
//             <Route path="/register" exact component={Register} />
//             <Route path="/users/id" component={Profile} />

//           </div>
//         </Router>
//       );
//     }

// }

// export default App;
