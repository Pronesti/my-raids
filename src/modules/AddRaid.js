import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input,Card,CardText,CardTitle } from 'reactstrap';
import * as firebase from 'firebase';
import {Link} from 'react-router-dom';

class AddRaid extends Component {
    constructor () {
        super()  
        this.state = {
            count: '',
            raidID: '',
            poke_name: 'MewTwo',
            time: '',
            location_name: '',
            location_street: '',
            users_in: null,
        }
      }

componentDidMount(){
    const nameRef = firebase.database().ref().child('raidscount');
    nameRef.on('value', snapshot => {
      this.setState({
        count: snapshot.val(),
        raidID: snapshot.val() + 1
      })
    })
}


crearRaid(){
    this.setState({
        raidID:  (parseInt(this.state.count, 10) + 1)
      })
    firebase.database().ref('raidscount').set(
        (this.state.count + 1)
      );
    firebase.database().ref('raids/' + this.state.raidID).set({
        raidID: this.state.raidID,
        poke_name: this.state.poke_name,
        time: this.state.time,
        location_name: this.state.location_name,
        location_street: this.state.location_street,
        users_in: this.state.users_in,
      });

    }

    handleChange(e){
        this.setState({
            [e.target.name]: e.target.value
        })}

  render() {
    return (
      <div className="AddRaid">

<Card body className="text-center logginCard">
        <CardTitle><h3>Agregar Raid</h3></CardTitle>
        <CardText>

      <Form>
        <FormGroup>
          <Label for="exampleSelect">Select</Label>
          <Input type="select" name="poke_name" id="exampleSelect" onChange={e => this.handleChange(e)}>
            <option>Mewtwo</option>
            <option>Deoxys</option>
            <option>Golem</option>
            <option>Snorlax</option>
            <option>Machamp</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="exampleTime">Time</Label>
          <Input type="time" name="time" id="exampleTime" placeholder="time placeholder" onChange={e => this.handleChange(e)} />
        </FormGroup>
        <FormGroup>
          <Label for="exampleEmail">Location Name</Label>
          <Input type="input" name="location_name" id="exampleEmail" placeholder="" onChange={e => this.handleChange(e)} />
        </FormGroup>
        <FormGroup>
          <Label for="exampleEmail">Location Street</Label>
          <Input type="input" name="location_street" id="exampleEmail" placeholder="" onChange={e => this.handleChange(e)} />
        </FormGroup>
      </Form>
        </CardText>   
        <Link to="/"> <Button onClick={() => this.crearRaid()} block>Add</Button> </Link> 
      </Card>

      </div>
    );
  }
}

export default AddRaid;
