import React, { Component } from 'react';
import { Card, Button, ButtonGroup, CardTitle, CardText, CardSubtitle, CardBody,Badge, ListGroup, ListGroupItem  } from 'reactstrap';
import * as PropTypes from 'prop-types';
import * as firebase from 'firebase';

class Raid extends Component {
constructor(props){
  super(props);
  this.joinRaid = this.joinRaid.bind(this);
  this.state = {
    doit: false,
    raidID: 0,
    usuarios_state: null,
    nombredelusuario: "",
  }
}


componentDidMount(){
  var _this = this;

  try{
    this.setState({doit:(this.props.usuarios.length > 0)});
    this.cargarUsuarios();
   }catch(err){
  
   }

 if (typeof this.props.numero !== "undefined"){
  this.setState({
    raidID: this.props.numero,
  }, console.log(this.state))
 }
}

cargarUsuarios(){
  const array_usuarios = [];
  const nameRef = firebase.database().ref().child('raids').child(this.state.raidID).child('usuarios');
  nameRef.on('value', snapshot => {
     snapshot.forEach(function (snapshot){
       array_usuarios.push(snapshot.val())
     })
  });
  //console.log(array_usuarios)
  return array_usuarios;
}




mostrarUsuarios(){
    return(
      <div>
    <ListGroup>
    {this.cargarUsuarios().map(usua => <ListGroupItem>{usua}</ListGroupItem>)}
    </ListGroup>
      </div>
    )
}

joinRaid(number){
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      var newRaidKey = firebase.database().ref('raids').child('usuarios').push().key
      var updates ={};
      updates['/raids/' + number + '/' + 'usuarios' + '/' + (user.displayName)] = (user.displayName);
      firebase.database().ref().update(updates);
    } else {
     alert("no estas logueado");
    }
  })
  //firebase.database().ref('raids').child(number).child('usuarios').update(updates);
}

quitRaid(number){
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      var ref = firebase.database().ref('raids').child(number).child('usuarios').child(user.displayName);
      ref.remove();
    } else {
     alert("no estas logueado");
    }
  })
}

  render() {
    return (
      <div className="Raid">
      <Card>
        <CardBody className="clearfix">
        <CardTitle><Badge color="primary">{this.props.numero}</Badge> {this.props.nombre} <Badge color="warning"> {this.props.tiempo}</Badge></CardTitle>
        <CardSubtitle className="float-right">{this.props.location} | {this.props.street}</CardSubtitle>
        <br />
      
        
        <CardText></CardText>
        <CardText>{this.mostrarUsuarios()}</CardText>
          <Button outline color="danger float-right" onClick={ () => this.quitRaid(this.props.numero) }>Quit</Button> 
          <Button outline color="secondary float-right" onClick={ () => this.joinRaid(this.props.numero) }>Join</Button>
        </CardBody>
      </Card>
      </div>
    );
  }
}

export default Raid;
