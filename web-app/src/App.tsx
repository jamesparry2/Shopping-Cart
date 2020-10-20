import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import "./App.css";

import Header from "./Components/Header";
import Shopping from "./Pages/ShoppingPage";
import Checkout from "./Pages/CheckoutPage";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <div className="Container">
          <Route path="/" exact component={Shopping} />
          <Route path="/checkout" component={Checkout} />
        </div>
      </Router>
    </div>
  );
}

export default App;
