import React from "react";
import Artposts from "./Artposts";
import CreateArtPage from "./CreateArtPage";
import './App.css';


export default class App extends React.Component {
  state = {
    displayArtForm: false,
  };

  returnHome = () => {
    this.setState({
      displayArtForm: false
    });
  };
  createArt = () => {
    this.setState({
      displayArtForm: true
    });
  };

  renderCreateArtPage = () => {
    if (this.state.displayArtForm) {
      return <CreateArtPage close={this.returnHome} />;
    } else {
      return null;
    }
  };

  render() {
    return (
      <React.Fragment>
        <button onClick={this.createArt}>Create</button>
        <Artposts />




        {this.renderCreateArtPage()}
      </React.Fragment>
    );
  }
}
