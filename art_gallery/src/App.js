import React from "react";
import axios from "axios";
import CreateArtPage from "./CreateArtPage";
import ArtInfo from "./ArtInfo";
import './App.css';


export default class App extends React.Component {
  state = {
    displayArtForm: false,
    displayArtInfo: false,
    displayHome: true,
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



  closePage = () => {
    this.setState({
      displayArtForm: false,
      displayArtInfo: false,
      displayHome: true
    });
  };

  createArt = () => {
    this.setState({
      displayArtForm: true,
      displayHome: false
    });
  };

  renderCreateArtPage = () => {

    if (this.state.displayArtForm) {
      return <CreateArtPage closePage={this.closePage} getGallery={this.getGallery} />;
    } else {
      return null;
    }
  };

 
  showArtInfo = (artpost) => {
    this.setState({
      displayArtInfo: true,
      displayHome: false,
      artHolder: artpost
    })
  }

  renderArtInfoPage = () => {
    if (this.state.displayArtInfo) {
      return <ArtInfo 
      closePage={this.closePage} 
      image={this.state.artHolder.image}
      art_title={this.state.artHolder.art_title}
      art_description={this.state.artHolder.art_description}
      poster_name={this.state.artHolder.poster_name}
      like_count={this.state.artHolder.like_count}
      review_count={this.state.artHolder.review_count}
      post_date={this.state.artHolder.post_date}
      _id={this.state.artHolder._id}
      getGallery={this.getGallery}
      art_type={this.state.artHolder.art_type}
      art_subject={this.state.artHolder.art_subject}
      />;
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
            </div>
            <div className="listingContent">
              <h2>{artpost.art_title.length > 20 ? artpost.art_title.slice(0, 20) + "..." : artpost.art_title}</h2>
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
        {this.state.displayHome &&
          <button onClick={this.createArt}>Create</button>
        }
        
        {this.state.displayHome && this.renderList()}
        {this.renderArtInfoPage()}
        {this.renderCreateArtPage()}

      </React.Fragment>
    );
  }
}
