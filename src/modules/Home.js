import React, { Component } from 'react';
import Raid from './../components/Raid';
import * as firebase from 'firebase';
import {CardColumns} from 'reactstrap';

class Home extends Component {

  constructor(props){
    super(props);
    this.state = {
      raids: [],
    }
  }

 

  componentDidMount(){
    var _this = this;
    let a;
   const dbRefObject = firebase.database().ref().child('raids');
   dbRefObject.on('value', snap => { 
     a = JSON.stringify(snap.val(), null, 3)
    // console.log(snap.val());
    this.setState({raids: a})
  });
  
  }

  

  listarRaids(){
    let count;
    const nameRef = firebase.database().ref().child('raidscount');
    nameRef.on('value', snapshot => {
       count = snapshot.val()
    });


    let myRaids = [];
    for(let i=1; i < count+1 ;i++){
      const dbRefObject = firebase.database().ref().child('raids').child(i);
      dbRefObject.on('value', snap => { 
        myRaids[i] = snap.val();
     });
    }
    //console.log(myRaids)

    return myRaids;
  }



  render() {
    return (
      <div className="Home">
      <CardColumns>
      {(this.listarRaids().length>0) ? (this.listarRaids().map(raid => <Raid key={raid.raidID} numero={raid.raidID} nombre={raid.poke_name} tiempo={raid.time} location={raid.location_name} street={raid.location_street} usuarios={raid.users_in}/>)) : (<p> No hay Raids</p>)}
      </CardColumns>
      </div>
    );
  }
}

export default Home;
