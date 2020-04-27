import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Update from "./Components/Update";
import Delete from "./Components/Delete";
import Read from "./Components/Read";
import Create from "./Components/Create";
class App extends Component {
  render() {
    return (
      //Create the routing to different CRUD operations
      //Routing
      <Router>
        <div className='App'>
          <Route path='/' exact render={() => {
            return (<Create />)
          }} />
          <Route path='/Read' exact render={() => {
            return (<Read />)
          }} />
          <Route path='/Update' exact render={() => {
            return (<Update />)
          }} />
          <Route path='/Delete' exact render={() => {
            return (<Delete />)
          }} />
        </div>
      </Router>
    );
  }
}

export default App;