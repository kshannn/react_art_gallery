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
    storedTags:""
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

  displayArtSubject = (artpost) => {
    // console.log(artpost.art_subject)
    
    let storedTags = ""
    for (let each_art_subject of artpost.art_subject){
      
      // console.log(each_art_subject)
      if (each_art_subject === "animal"){
        storedTags += '<span className="badge badgeAnimal">animal</span>'
      }
      
      if (each_art_subject === "people"){
        storedTags += '<span className="badge badgePeople">people</span>'
      }
      
      if (each_art_subject === "nature"){
        storedTags += '<span className="badge badgeNature">nature</span>'
      }
      
    }
    return storedTags
    
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
                Likes: {artpost.statistics.like_count} Reviews: {artpost.statistics.review_count}
              </p>
              <span className="badge">{artpost.art_type}</span>
              {/* <span className="badge">{artpost.art_subject}</span> */}
              <span>{this.displayArtSubject(artpost)}</span>
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
        
        <div className="row">
        {this.state.displayHome && this.renderList()}
        </div>
        
        {this.renderArtInfoPage()}
        {this.renderCreateArtPage()}

      </React.Fragment>
    );
  }
}
