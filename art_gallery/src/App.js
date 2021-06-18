import React from "react";
import axios from "axios";
import CreateArtPage from "./CreateArtPage";
import ArtInfo from "./ArtInfo";
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';


export default class App extends React.Component {
  state = {
    displayArtForm: false,
    displayArtInfo: false,
    displayHome: true,
    artHolder: 0,
    gallery: [],
    storedTags: ""
  };


  // GET request
  async componentDidMount() {
    this.getGallery();
  }

  getGallery = async () => {
    let response = await axios.get(
      "https://3000-coral-grasshopper-zdtsha75.ws-us08.gitpod.io/art_gallery"
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
        _id={this.state.artHolder._id}
        closePage={this.closePage}
        getGallery={this.getGallery}
      />;
    } else {
      return null;
    }
  }

  displayArtType = (artpost) => {
    if (artpost.art_type=== "digital"){
      return <span className="badge badge-digital">{artpost.art_type}</span>
    } else {
      return <span className="badge badge-traditional">{artpost.art_type}</span>
    }
  }


  renderList = () => {
    let jsx = this.state.gallery.map((artpost) => {
      return (
        <div className="col-lg-4 col-md-6 col-xs-12">
          <div className="listingContainer" onClick={() => {
            this.showArtInfo(artpost)
          }
          }>
            <div className="imageHolder" style={{ backgroundImage: `url(${artpost.image})` }}>
            </div>
            <div className="listingContent">
              <h2>{artpost.art_title.length > 20 ? artpost.art_title.slice(0, 20) + "..." : artpost.art_title}</h2>
              <h3>{artpost.poster_name}</h3>
              <p>
                Likes: {artpost.statistics.like_count} Reviews: {artpost.statistics.review_count}
              </p>
          
              {this.displayArtType(artpost)}

              {artpost.art_subject.map((subject) => {
                return (
                  <span className={"badge " + "badge-" + subject}>{subject}</span>
                )
              })}
            </div>
          </div>
        </div>
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

        <div id="mainSection">
          <div id="filterSection"></div>
          <div id="gallerySection">
            <div className="row">
              {this.state.displayHome && this.renderList()}
            </div>
          </div>
        </div>



        {this.renderArtInfoPage()}
        {this.renderCreateArtPage()}

      </React.Fragment>
    );
  }
}
