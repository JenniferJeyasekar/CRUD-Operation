import React from "react";
import { NavLink } from "react-router-dom";
import { Container, Row, Col, Alert, Button, Label, Input } from "reactstrap";
import { AvForm, AvField } from 'availity-reactstrap-validation';
import Axios from "axios";

class Delete extends React.Component {
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
  //Handles input changes
  handleIdChange = (event) => {
    this.setState({
      id: event.target.value
    })
  }
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
  //Performs delete in the databaase
  handleDelete = (event) => {
    event.preventDefault();
    Axios({
      method: "DELETE",
      url: "http://localhost:5000/employee",
      params: {
        id: this.state.id
      },
      headers: {
        "Content-type": "application/json"
      }
    }).then(res => {
      console.log("Data Deleted");
      const data = res.data;
      this.setState({
        data
      });
      console.log(data);
    })
  }
  //Retrives the data from the data
  handleSubmit = async (event) => {
    try {
      event.preventDefault();
      await Axios({
        method: "GET",
        url: "http://localhost:5000/employee",
        params: {
          id: this.state.id
        },
        headers: {
          "Content-type": "application/json"
        }
      }).then(res => {
        const data = res.data;
        console.log(data);
        this.setState({
          id: data.Item.EmpId,
          fname: data.Item.EmpFname,
          sname: data.Item.EmpSurname,
          email: data.Item.Email,
          dob: data.Item.DOB,
          gender: data.Item.Gender

        });
      });
    }
    catch (err) {
      let error = '';
      let formIsValid = true;
      if (err) {
        formIsValid = false;
        error = "Cannot Read. Employee Id doesnot exist";
      }
      this.setState({
        error: error,
        id: "",
        fname: "",
        sname: "",
        email: "",
        dob: "",
        gender: ""
      });
      console.log("Error", err)
      return formIsValid;
    }
  }
  refreshPage() {
    console.log("Clicked");
    window.location.reload();
  }
  render() {
    return (
      <Container className="bg-info">
        <Container>
          <AvForm onSubmit={this.handleDelete.bind(this)} >
            <Row><Col><h1>Employee Management</h1></Col></Row>
            <Row><Col><h6>Open Book Assignment submitted by Jennifer</h6></Col></Row>
            <Row xs="4">
              <Col md={1}><NavLink to='/'><Button size="md" md="3" >Create</Button></NavLink></Col>
              <Col md={1}><NavLink to='/Read'><Button size="md" md="2">Read</Button></NavLink></Col>
              <Col md={1}><NavLink to='/Update'><Button size="md" md="2">Update</Button></NavLink></Col>
              <Col md={1}><Button size="md" md="2" className="btn btn-light" onClick={this.refreshPage}>Delete</Button></Col>
            </Row>
            <Row><Alert color="Warning">{this.state.error}</Alert></Row>
            <h5>Delete Existing Employee</h5>
            <Row xs="2">
              <Col sm={5}><AvField name="id" label="Employee Id:" type="text" placeholder="Enter employee id" value={this.state.id} onChange={this.handleIdChange.bind(this)} validate={{
                required: { value: true, errorMessage: 'Please enter employee id!' },
                pattern: { value: '^[0-9]+$', errorMessage: 'Invalid name. Please enter only letters.' }
              }} /></Col>
              <Col>
                <Button size="sm" className="Read-button" type='submit' onClick={this.handleSubmit.bind(this)}>Read</Button>
              </Col>
            </Row>
            <Row xs="2">
              <Col sm={5}><AvField name="fname" label="First Name:" type="text" placeholder="Enter First Name" value={this.state.fname} onChange={this.handleFnameChange.bind(this)} /></Col>
              <Col sm={5}><AvField name="sname" label="Surname:" type="text" placeholder="Enter Surname" value={this.state.sname} onChange={this.handleSnameChange.bind(this)} /></Col>
            </Row>
            <Row xs="2">
              <Col sm={5}>
                <AvField name="emailProp" label="Email" type="text" placeholder="abc@xyz.com" value={this.state.email} onChange={this.handleEmailChange.bind(this)} />
              </Col>
              <Col sm={5}>
                <AvField name="dateProp" label="Date of Birth" type="text" placeholder="MM/DD/YYYY" value={this.state.dob} onChange={this.handleDobChange.bind(this)} />
              </Col>
            </Row>
            <Row>
              <Label sm="2">Gender:</Label>
              <Col sm={3}>
                <Input type="radio" value="Male" checked={this.state.gender === 'Male'} onChange={this.handleGenderChange.bind(this)} /> Male
              <br />
                <Input type="radio" value="Female" checked={this.state.gender === 'Female'} onChange={this.handleGenderChange.bind(this)} /> Female
            </Col>
            </Row>
            <Row>
              <Button size="sm" className="delete-button" type='submit' onClick={this.handleDelete.bind(this)}>Delete</Button>
            </Row>
          </AvForm>
          {this.state.data && <div>
            <h2>Status</h2>
            <pre>{JSON.stringify(this.state.data, null, 2)}</pre>
          </div>}
        </Container>
      </Container>
    );
  }
}

export default Delete;
