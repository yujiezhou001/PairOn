import React from 'react';
import axios from 'axios';

class Home extends React.Component {
  //sets intial state
  constructor(props){
    super(props);
    this.state = {
      currentUser: {firstName: null, hometown: null, experiences: "All", avatarURL: null, currentLocation: { lat, lng, "IE. GOOGLE API"}, aboutMe: null}
      clientList: [], // full of currentUser objects sent from WebSocket
      Chatmessages: []
    };
  }


getUserInfoFromDB = () => {
  const userObjFromDB = {};
  knex
      .select("*")
      .from ("users")
      .where({users.id = user_id})
      .then(results => {
        userObjFromDB = results;
      })
  return userObjFromDB;
}
// should I pass the currentUser Obj?
    updateUserList = (newuser) => {
 // const newCurrentUser = Object.assign({}, this.state.currentUser)
  // newCurrentUser.name = newName

      const newCurrentUser = { ...this.state.currentUser, firstName: newUser.firstName , hometown: this.state.currentUser.hometown, experiences: "All",}


      this.setState({currentUser: newCurrentUser})

      const notificationObj = {
        type: "newCurrentUser",
        content: {} // passing the new user object to push to the client list
        }


this.state = {
      currentUser: {name: "Anonymous", hometown: ""}
  changeName = (newName) => {
 // const newCurrentUser = Object.assign({}, this.state.currentUser)
  // newCurrentUser.name = newName
  const newCurrentUser = { ...this.state.currentUser, name: newName, hometown: this.state.currentUser.hometown}

  const oldName = this.state.currentUser.name;

  this.setState({currentUser: newCurrentUser})

 //  this.serverSocket.send(JSON.stringify(notificationObj));
 //  //type prop needs to be attached to all objects sent through socket
 //  // the line `userA changed their username to Bob`

 //  }

  // componentDidMount() {
  //   axios.get('/').then(({data}) => {
  //     console.log(data);
  //   })
  // }

//   render() {
//     return (
//       <div>
//       <h2>Home</h2>;
//     //<component updateUserList{this.updateUserList} />
//       </div>
//     )
//   }
// }

export { Home };