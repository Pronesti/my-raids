import React, { Component } from 'react';
import { Card, CardTitle, CardText, Button } from 'reactstrap';
import * as firebaseui from 'firebaseui';
import * as firebase from 'firebase';
import {Link} from 'react-router-dom';


class Login extends Component {
constructor(props){
  super(props);
  this.state = {
      logged: false,
      username: '',
      email: '',
      profilepic: '',
  }
}

componentDidMount(){
var _this=this;
    var uiConfig = {
        callbacks: {
          signInSuccessWithAuthResult: function(authResult, redirectUrl) {
            // User successfully signed in.
            // Return type determines whether we continue the redirect automatically
            // or whether we leave that to developer to handle.
            //this.setstate({username: authResult.displayName});
            return true;
          },
          uiShown: function() {
            // The widget is rendered.
            // Hide the loader.
            document.getElementById('loader').style.display = 'none';
          }
        },
        // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
        signInFlow: 'popup',
        signInSuccessUrl: '/',
        signInOptions: [
          // Leave the lines as is for the providers you want to offer your users.
          firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        ],
        // Terms of service url.
        tosUrl: '<your-tos-url>',
        // Privacy policy url.
        privacyPolicyUrl: '<your-privacy-policy-url>'
      };

// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());
ui.start('#firebaseui-auth-container', uiConfig);


firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        _this.setState({logged: true, username: user.displayName, profilepic: user.photoURL,});
      console.log(user);
    } else {
      // No user is signed in.
    }
  }).bind(this);


  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
  .then(function() {
    // Existing and future Auth states are now persisted in the current
    // session only. Closing the window would clear any existing state even
    // if a user forgets to sign out.
    // ...
    // New sign-in will be persisted with session persistence.
    return firebase.auth().signInWithPopup(firebase.auth.GoogleAuthProvider());
  })
  .catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
  });

}

logOut(){
    firebase.auth().signOut().then(function() {

      }).catch(function(error) {
        // An error happened.
      });
}

logginButton(){
    if (this.state.logged === false){
        return(<div className="googleUI">
            <div id="firebaseui-auth-container"></div>
            <div id="loader">Loading...</div></div>);
    }
}

loggoutButton(){
    if (this.state.logged === true){
        return(<div>
           <Link to="/"><Button outline color="danger" onClick={ () => (this.logOut()) }>Log Out</Button></Link>
        </div>);
    }
}

render() {
    return (
      <div className="Login">

<Card body className="text-center logginCard">
        <CardTitle>{this.state.logged ? ( <h3>{this.state.username}</h3> ) : ("Login")}</CardTitle>
        <CardText>{this.state.logged ? ( <img className="logginPic" src={this.state.profilepic} alt={this.state.username} /> ) : (<p></p>)}</CardText>
        {this.state.logged ? ( this.loggoutButton() ) : ( this.logginButton() )}       
      </Card>


      </div>
    );
  }
}

export default Login;
