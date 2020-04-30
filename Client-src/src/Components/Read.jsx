import React from "react";
import { NavLink } from "react-router-dom";
import { Container, Row, Col, Button, Input, Alert } from "reactstrap";
import { BsEnvelopeFill, BsPersonFill, BsFillTrashFill } from "react-icons/bs";
import { MdDateRange, MdCreateNewFolder } from "react-icons/md";
import { FaVenusMars, FaBookReader, FaUserEdit } from "react-icons/fa";
import { AvForm, AvField } from 'availity-reactstrap-validation';
import Axios from "axios";

class Read extends React.Component {
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
  //Reads the data from the database
  handleSubmit = async (event) => {
    try {
      event.preventDefault();
      await Axios({
        method: "GET",
        url: "http://localhost:5000/employee",
        params: { id: this.state.id },
        headers: { "Content-type": "application/json" }
      })
        .then(res => {
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
        error = "Cannot read!!! Please enter a valid employee id";

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
      <Container className="bg-info text-white">
        <Container>
          <AvForm onSubmit={this.handleSubmit.bind(this)} >
            <Row><Col><h1>Employee Management</h1></Col></Row>
            <Row><Col><h6>Open Book Assignment submitted by Jennifer</h6></Col></Row>
            <Row xs="4">
              <Col md={1}><NavLink to='/'><Button size="md" md="3"><MdCreateNewFolder size='2rem' /></Button></NavLink></Col>
              <Col md={1}><Button size="md" md="2" className="btn btn-light" onClick={this.refreshPage}><FaBookReader size='2rem' /></Button></Col>
              <Col md={1}><NavLink to='/Update'><Button size="md" md="2"><FaUserEdit size='2rem' /></Button></NavLink></Col>
              <Col md={1}><NavLink to='/Delete'><Button size="md" md="2"><BsFillTrashFill size='2rem' /></Button></NavLink></Col>
            </Row>
            <Row><Alert color="Warning">{this.state.error}</Alert></Row>
            <h5>Read Existing Employee</h5>
            <Row xs="2">
              <Col sm={5}>
                <BsPersonFill size='3rem' />
                <AvField name="id" type="text" placeholder="Enter employee id" value={this.state.id} onChange={this.handleIdChange.bind(this)} validate={{
                  required: { value: true, errorMessage: 'Please enter employee id!' },
                  pattern: { value: '^[0-9]+$', errorMessage: 'Invalid name. Please enter only letters.' }
                }} /></Col>
              <Col>
                <Button size="sm" className="Read-button" type='submit'><FaBookReader size='4rem' /></Button>
              </Col>
            </Row>
            <Row xs="2">
              <Col sm={5}><BsPersonFill size='3rem' /><AvField name="fname" type="text" placeholder="Enter First Name" value={this.state.fname} onChange={this.handleFnameChange.bind(this)} /></Col>
              <Col sm={5}><BsPersonFill size='3rem' /><AvField name="sname" type="text" placeholder="Enter Surname" value={this.state.sname} onChange={this.handleSnameChange.bind(this)} /></Col>
            </Row>
            <Row xs="2">
              <Col sm={5}>
                <BsEnvelopeFill size='3rem' />
                <AvField name="emailProp" type="text" placeholder="abc@xyz.com" value={this.state.email} onChange={this.handleEmailChange.bind(this)} />
              </Col>
              <Col sm={5}>
                <MdDateRange size='3rem' />
                <AvField name="dateProp" type="text" placeholder="Date of Birth [MM/DD/YYYY]" value={this.state.dob} onChange={this.handleDobChange.bind(this)} />
              </Col>
            </Row>
            <Row>

              <Col sm={5}>
                <FaVenusMars size='3rem' /><br />
                <Input type="radio" value="Male" checked={this.state.gender === 'Male'} onChange={this.handleGenderChange.bind(this)} /> Male
              <br />
                <Input type="radio" value="Female" checked={this.state.gender === 'Female'} onChange={this.handleGenderChange.bind(this)} /> Female
            </Col>
            </Row>
          </AvForm>
        </Container>
      </Container>
    );
  }
}

export default Read;
