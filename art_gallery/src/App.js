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
        <div className="col-md-4 col-sm-6 col-xs-12">
          <div className="listingContainer" onClick={() => {
            this.showArtInfo(artpost)
          }
          }>
            <div className="imageHolder" style={{ backgroundImage: `url(${artpost.image})` }}>
            </div>
            <div className="listingContent">
              <h2>{artpost.art_title.length > 10 ? artpost.art_title.slice(0, 10) + "..." : artpost.art_title}</h2>
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
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">Navbar</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <form className="d-flex">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
        <button className="btn btn-outline-success" type="submit">Search</button>
      </form>
    </div>
  </div>
</nav>

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
