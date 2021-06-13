import React from "react";
import axios from "axios";
// import json from "./collection_artposts.json";

export default class Artposts extends React.Component {
  state = {
    gallery: []
  };

  // async componentDidMount() {
  //   this.setState({
  //     gallery: json
  //   });
  // }

  // GET request
  async componentDidMount() {
    let response = await axios.get(
      "https://3000-coral-grasshopper-zdtsha75.ws-us09.gitpod.io/art_gallery"
    );
    this.setState({
      gallery: response.data
    });
  }

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
    return <React.Fragment>{this.renderList()}</React.Fragment>;
  }
}
