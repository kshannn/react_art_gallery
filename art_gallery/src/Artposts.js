import React from "react";
import json from "./collection_artposts.json";

export default class Artposts extends React.Component {
  state = {
    artposts: []
  };

  async componentDidMount() {
    this.setState({
      artposts: json
    });
  }

  renderList = () => {
    let jsx = this.state.artposts.map((artpost) => {
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
