import logo from "./logo.svg"
import "./App.css"
import { Route, Switch } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import { Fragment } from "react/cjs/react.production.min"

import React, { Component } from "react"

import Navbar from "./components/Navbar"
import Cart from "./components/Cart"
import ProductList from "./components/ProductList"
import Details from "./components/Details"
import Default from "./components/Default"
import Modal from "./components/modal"

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Navbar />
        <Switch>
          <Route exact path="/" component={ProductList} />
          <Route path="/details" component={Details} />
          <Route path="/cart" component={Cart} />
          <Route component={Default} />
        </Switch>
        <Modal />
      </React.Fragment>
    )
  }
}

export default App
