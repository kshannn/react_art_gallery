import React from "react";
import axios from "axios";
import CreateArtPage from "./CreateArtPage";
import './App.css';


export default class App extends React.Component {
  state = {
    displayArtForm: false,
    gallery: []
  };

  // GET request
  async componentDidMount() {
    console.log("component mounted")
    let response = await axios.get(
      "https://3000-coral-grasshopper-zdtsha75.ws-us09.gitpod.io/art_gallery"
    );
    this.setState({
      gallery: response.data
    });
  }

  

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

  renderList = () => {
    let jsx = this.state.gallery.map((artpost) => {
      return (
        <React.Fragment>
          <div className="listingContainer">
            <div className="imageHolder">
              <img src={artpost.image} alt="nature" />
            </div>
            <div className="listingContent">
              <h2>{artpost.art_name}</h2>
              <h3>{artpost.poster_name}</h3>
              <p>
                Likes: {artpost.like_count} Reviews: {artpost.review_count}
              </p>
            </div>
          </div>
        </React.Fragment>
      );
    });
    return jsx;
  };

  render() {
    return (
      <React.Fragment>
        <button onClick={this.createArt}>Create</button>
        {/* <Artposts /> */}


        {this.renderList()}

        {this.renderCreateArtPage()}
      </React.Fragment>
    );
  }
}
