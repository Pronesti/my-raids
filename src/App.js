import React, { Component } from 'react';
import * as firebase from 'firebase';
import {Switch,Route,BrowserRouter as Router} from 'react-router-dom';

// Modulos
import Home from './modules/Home';
import AddRaid from './modules/AddRaid';
import Login from './modules/Login';

// Componentes
import MyNavbar from './components/MyNavbar';
import MyFooter from './components/MyFooter';

var config = {
  apiKey: "AIzaSyAdop4gyCDK-K9esSV6Rq212fHnhY7_od8",
  authDomain: "my-raid-app.firebaseapp.com",
  databaseURL: "https://my-raid-app.firebaseio.com",
  projectId: "my-raid-app",
  storageBucket: "my-raid-app.appspot.com",
  messagingSenderId: "135690198295"
};
firebase.initializeApp(config);

class App extends Component {
  constructor () {
    super()
    this.state = {}
  }

  componentDidMount(){

  }
  

  render() {
    return (
      <div className="App">
      <MyNavbar />
      <div className="spacefix2"></div>
<Router>
<Switch>
  <Route exact path="/" component={Home}/>
  <Route path="/addRaid" component={AddRaid}/>
  <Route path="/login" component={Login}/>
</Switch>
</Router>
<div className="spacefix"></div>
<MyFooter />
      </div>
    );
  }
}

export default App;
