import React from "react";
import axios from "axios";
import CreateArtPage from "./CreateArtPage";
import ArtInfo from "./ArtInfo";
import './App.css';


export default class App extends React.Component {
  state = {
    displayArtForm: false,
    displayArtInfo: false,
    artHolder: 0,
    gallery: []
  };


  // GET request
  async componentDidMount() {
    this.getGallery();
  }

  getGallery = async () => {
    let response = await axios.get(
      "https://3000-coral-grasshopper-zdtsha75.ws-us09.gitpod.io/art_gallery"
    );
    this.setState({
      gallery: response.data
    });
  }



  returnHome = () => {
    this.setState({
      displayArtForm: false,
      displayArtInfo: false
    });
  };

  createArt = () => {
    this.setState({
      displayArtForm: true
    });
  };

  renderCreateArtPage = () => {

    if (this.state.displayArtForm) {
      return <CreateArtPage close={this.returnHome} getGallery={this.getGallery} />;
    } else {
      return null;
    }
  };

 
  showArtInfo = (artpost) => {
    this.setState({
      displayArtInfo: true,
      artHolder: artpost
    })
  }

  renderArtInfoPage = () => {
    if (this.state.displayArtInfo) {
      return <ArtInfo 
      close={this.returnHome} 
      imageURL={this.state.artHolder.image}
      art_title={this.state.artHolder.art_title}/>;
    } else {
      return null;
    }
  }

  renderList = () => {
    let jsx = this.state.gallery.map((artpost) => {
      return (
        <React.Fragment>
          <div className="listingContainer" onClick={() => {
            this.showArtInfo(artpost)
          }
          }>
            <div className="imageHolder" style={{backgroundImage: `url(${artpost.image})`}}>
              {/* <img src={artpost.image} alt="user inserted art" /> */}
            </div>
            <div className="listingContent">
              <h2>{artpost.art_title}</h2>
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


        {this.renderList()}
        {this.renderArtInfoPage()}
        {this.renderCreateArtPage()}

      </React.Fragment>
    );
  }
}
