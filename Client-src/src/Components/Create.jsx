import React from "react";
import { Col, Button, Container, Row } from "reactstrap";
import { AvForm, AvField, AvRadioGroup, AvRadio } from 'availity-reactstrap-validation';
import { NavLink } from "react-router-dom";
import Axios from "axios";
import randomstring from "randomstring";
class Create extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      fname: '',
      sname: '',
      email: '',
      dob: '',
      gender: ''
    }
  }
  //Handles the input changes
  handleFnameChange = (event) => {
    this.setState({
      fname: event.target.value
    })
  }
  handleSnameChange = (event) => {
    this.setState({
      sname: event.target.value
    })
  }
  handleEmailChange = (event) => {
    this.setState({
      email: event.target.value
    })
  }
  handleDobChange = (event) => {
    this.setState({
      dob: event.target.value
    })
  }
  handleGenderChange = (event) => {
    this.setState({
      gender: event.target.value
    })
  }
  refreshPage() {
    console.log("Clicked");
    window.location.reload();
  }
  //Loads the data into database
  handleSubmit = event => {
    event.preventDefault();
    Axios({
      method: "POST",
      url: "http://localhost:5000/create",
      params: {
        id: randomstring.generate({
          length: 3,
          charset: 'numeric'
        }),
        fname: this.state.fname,
        sname: this.state.sname,
        email: this.state.email,
        dob: this.state.dob,
        gender: this.state.gender
      },
      headers: {
        "Content-type": "application/json"
      }
    }).then(res => {
      const data = res.data;
      this.setState({
        data
      });
      console.log(data);
    });
  }
  render() {
    return (
      <Container className="bg-info">
        <Container>
          <AvForm onSubmit={this.handleSubmit.bind(this)} >
            <Row><Col><h1>Employee Management</h1></Col></Row>
            <Row><Col><h6>Open Book Assignment submitted by Jennifer</h6></Col></Row>
            <Row xs="4">
              <Col md={1}><Button size="md" md="3" className="btn btn-light" onClick={this.refreshPage}>Create</Button></Col>
              <Col md={1}><NavLink to='/Read'><Button size="md" md="2">Read</Button></NavLink></Col>
              <Col md={1}><NavLink to='/Update'><Button size="md" md="2">Update</Button></NavLink></Col>
              <Col md={1}><NavLink to='/Delete'><Button size="md" md="2">Delete</Button></NavLink></Col>
            </Row>
            <Row><Col><h5>Create New Employee</h5></Col></Row>
            <Row xs="2">
              <Col sm={5}><AvField name="fname" label="First Name:" type="text" placeholder="Enter First Name" value={this.state.fname} onChange={this.handleFnameChange.bind(this)} validate={{
                required: { value: true, errorMessage: 'Please enter first name' },
                pattern: { value: '^[A-Za-z]+$', errorMessage: 'Invalid name. Please enter only letters.' },
                minLength: { value: 6, errorMessage: 'Your name must be between 6 and 16 characters' },
                maxLength: { value: 16, errorMessage: 'Your name must be between 6 and 16 characters' }
              }} /></Col>
              <Col sm={5}><AvField name="sname" label="Surname:" type="text" placeholder="Enter Surname" value={this.state.sname} onChange={this.handleSnameChange.bind(this)} validate={{
                required: { value: true, errorMessage: 'Please enter surname' },
                pattern: { value: '^[A-Za-z]+$', errorMessage: 'Invalid name. Please enter only letters.' },
                minLength: { value: 6, errorMessage: 'Your name must be between 6 and 16 characters' },
                maxLength: { value: 16, errorMessage: 'Your name must be between 6 and 16 characters' }
              }} /></Col>
            </Row>
            <Row xs="2">
              <Col sm={5}>
                <AvField name="emailProp" label="Email" type="text" placeholder="abc@xyz.com" value={this.state.email} onChange={this.handleEmailChange.bind(this)} validate={{ required: { value: true, errorMessage: 'Please enter Email' }, email: true }} />

              </Col>
              <Col sm={5}>
                <AvField name="dateProp" label="Date of Birth" type="text" placeholder="MM/DD/YYYY" value={this.state.dob} onChange={this.handleDobChange.bind(this)} validate={{ required: { value: true, errorMessage: 'Please enter Data of Birth' }, date: { format: 'MM/DD/YYYY' } }} title="Use MM/DD/YYYY" />
              </Col>
            </Row>
            <Row>
              <Col sm={3}>
                <AvRadioGroup name="gender" label="Gender: " required errorMessage="Please select one!">
                  <AvRadio label="Male" value="Male" checked={this.state.gender === 'Male'} onChange={this.handleGenderChange.bind(this)} />
                  <AvRadio label="Female" value="Female" checked={this.state.gender === 'Female'} onChange={this.handleGenderChange.bind(this)} />
                </AvRadioGroup>
              </Col>
            </Row>

            <Button size="sm" className="create-button" type='submit'>Create</Button>

          </AvForm>
          {this.state.data && <div>
            <h2>Status</h2>
            {JSON.stringify(this.state.data, null, 2)}
          </div>}
        </Container>
      </Container>
    );
  }
}

export default Create;
