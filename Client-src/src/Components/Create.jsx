import React from "react";
import { Col, Button, Container, Row } from "reactstrap";
import { AvForm, AvField, AvRadioGroup, AvRadio } from 'availity-reactstrap-validation';
import { BsEnvelopeFill, BsPersonFill, BsFillTrashFill } from "react-icons/bs";
import { MdDateRange, MdCreateNewFolder } from "react-icons/md";
import { FaVenusMars, FaBookReader, FaUserEdit } from "react-icons/fa";
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
      <Container className="bg-info text-white">
        <Container>
          <AvForm onSubmit={this.handleSubmit.bind(this)} >
            <Row><Col><h1>Employee Management</h1></Col></Row>
            <Row><Col><h6>Open Book Assignment submitted by Jennifer</h6></Col></Row>
            <Row xs="4">
              <Col md={1}><Button size="md" md="3" className="btn btn-light" onClick={this.refreshPage}><MdCreateNewFolder size='2rem' /></Button></Col>
              <Col md={1}><NavLink to='/Read'><Button size="md" md="2"><FaBookReader size='2rem' /></Button></NavLink></Col>
              <Col md={1}><NavLink to='/Update'><Button size="md" md="2"><FaUserEdit size='2rem' /></Button></NavLink></Col>
              <Col md={1}><NavLink to='/Delete'><Button size="md" md="2"><BsFillTrashFill size='2rem' /></Button></NavLink></Col>
            </Row>
            <Row><Col><h5>Create New Employee</h5></Col></Row>
            <Row>
              <Col sm={5}>
                <BsPersonFill size='3rem' />
                <AvField name="fname" type="text" placeholder="Enter First Name" value={this.state.fname} onChange={this.handleFnameChange.bind(this)} validate={{
                  required: { value: true, errorMessage: 'Please enter first name' },
                  pattern: { value: '^[A-Za-z]+$', errorMessage: 'Invalid name. Please enter only letters.' },
                  minLength: { value: 6, errorMessage: 'Your name must be between 6 and 16 characters' },
                  maxLength: { value: 16, errorMessage: 'Your name must be between 6 and 16 characters' }
                }} /></Col>

              <Col sm={5}>
                <BsPersonFill size='3rem' />
                <AvField name="sname" type="text" placeholder="Enter Surname" value={this.state.sname} onChange={this.handleSnameChange.bind(this)} validate={{
                  required: { value: true, errorMessage: 'Please enter surname' },
                  pattern: { value: '^[A-Za-z]+$', errorMessage: 'Invalid name. Please enter only letters.' },
                  minLength: { value: 6, errorMessage: 'Your name must be between 6 and 16 characters' },
                  maxLength: { value: 16, errorMessage: 'Your name must be between 6 and 16 characters' }
                }} /></Col>
            </Row>
            <Row xs="2">
              <Col sm={5}>
                <BsEnvelopeFill size='3rem' />
                <AvField name="emailProp" type="text" placeholder="abc@xyz.com" value={this.state.email} onChange={this.handleEmailChange.bind(this)} validate={{
                  required: { value: true, errorMessage: 'Please enter surname' },
                  pattern: { value: '^[A-Za-z]+@zyllu.com$', errorMessage: 'Invalid email' }
                }
                } />
              </Col>

              <Col sm={5}>
                <MdDateRange size='3rem' />
                <AvField name="dateProp" type="text" placeholder="Date of Birth [MM/DD/YYYY]" value={this.state.dob} onChange={this.handleDobChange.bind(this)} validate={{ required: { value: true, errorMessage: 'Please enter Data of Birth' }, date: { format: 'MM/DD/YYYY' } }} title="Use MM/DD/YYYY" />
              </Col>
            </Row>
            <Row>
              <Col sm={5}>
                <FaVenusMars size='3rem' />
                <AvRadioGroup name="gender" required errorMessage="Please select one!">
                  <AvRadio label="Male" value="Male" checked={this.state.gender === 'Male'} onChange={this.handleGenderChange.bind(this)} />
                  <AvRadio label="Female" value="Female" checked={this.state.gender === 'Female'} onChange={this.handleGenderChange.bind(this)} />
                </AvRadioGroup>
              </Col>
              <Col sm={5}>
                <Button size="md" md="2" type='submit'><MdCreateNewFolder size='3rem' /></Button>
              </Col>
              {this.state.data && <div>
                <h2>Status</h2>
                {JSON.stringify(this.state.data, null, 2)}
              </div>}
            </Row>
          </AvForm>
        </Container>
      </Container>
    );
  }
}

export default Create;
