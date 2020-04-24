import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import Blog from "./containers/Blog/Blog";

class App extends Component {
  render() {
    return (
      // this is important during the deployment if your React App
      // is not deployed in the root folder but in a sub-folder
      // for example called my-app then you have to
      // set the basename property of BrowserRouter to “/my-app”
      <BrowserRouter>
        <div className="App">
          <Blog />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
