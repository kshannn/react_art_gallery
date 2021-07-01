import React from "react";
import axios from "axios";
import CreateArtPage from "./CreateArtPage";
import ArtInfo from "./ArtInfo";
import FilterOptions from "./FilterOptions"
import SideFilterOptions from "./SideFilterOptions"
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

const baseUrl = "https://8080-coral-grasshopper-zdtsha75.ws-us11.gitpod.io"

export default class App extends React.Component {
  state = {
    displayArtForm: false,
    displayArtInfo: false,
    displayHome: true,
    artHolder: 0,
    gallery: [],
    searchTerm: ""
    // sideBarDisplayed: false
  };

  // ===== Load gallery on page load (GET REQUEST) =====
  async componentDidMount() {
    this.getGallery();
  }

  getGallery = async () => {
    let response = await axios.get(
      baseUrl + "/art_gallery"
    );
    this.setState({
      gallery: response.data
    });
  }

  // ===== Displays only filtered results in gallery =====
  filterGallery = (response) => {
    this.setState({
      gallery: response.data.reverse()
    })
  }

  // ===== Process form fields =====
  updateForm = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  // ===== Search for art/artist with search bar =====
  searchResults = async () => {
    // retrieve art or artist
    let response = await axios.get(baseUrl + "/art_gallery/search" + "?q=" + this.state.searchTerm);
    // display found art or artist in gallery
    this.setState({
      gallery: response.data.reverse()
    })
  }

  // ===== Return user to home page =====
  closePage = () => {
    this.setState({
      displayArtForm: false,
      displayArtInfo: false,
      displayHome: true
    });
  };

  // ===== Clicking on create art button set displayArtForm to true =====
  createArt = () => {
    this.setState({
      displayArtForm: true,
      displayArtInfo: false,
      displayHome: false
    });
  };

  // ===== When displayArtForm is set to true, art post creation page is rendered =====
  renderCreateArtPage = () => {
    if (this.state.displayArtForm) {
      return <CreateArtPage
        closePage={this.closePage}
        getGallery={this.getGallery} />;
    } else {
      return null;
    }
  };

  // ===== Clicking on artpost set displayArtInfo to true =====
  showArtInfo = (artpost) => {
    this.setState({
      displayArtInfo: true,
      displayHome: false,
      artHolder: artpost
    })
  }

  // ===== When displayArtInfo is set to true, detailed art post page is rendered =====
  renderArtInfoPage = () => {
    if (this.state.displayArtInfo) {
      return <ArtInfo
        _id={this.state.artHolder._id}
        closePage={this.closePage}
        getGallery={this.getGallery}
        displayArtType={this.displayArtType}
      />;
    } else {
      return null;
    }
  }

  // ===== Display art type (e.g. digital/traditional) tags in each art post =====
  displayArtType = (artpost) => {
    if (artpost.art_type === "digital") {
      return <span className="badge badge-digital" style={{ marginRight: "5px" }}>{artpost.art_type}</span>
    } else {
      return <span className="badge badge-traditional" style={{ marginRight: "5px" }}>{artpost.art_type}</span>
    }
  }

  // ===== Render all the art posts =====
  renderList = () => {

    // Display no results if no results found
    if (this.state.gallery.length === 0) {
      return <h2 id="noResults">No results found...</h2>
    }

    let jsx = this.state.gallery.map((artpost) => {
      return (
        <div className="col-md-4 col-sm-6 col-xs-12">
          <div className="listingContainer" onClick={() => {
            this.showArtInfo(artpost)
          }
          }>
            {/* Render basic layout of each artpost */}
            <div className="imageHolder" style={{ backgroundImage: `url(${artpost.image})` }}>
            </div>
            <div className="listingContent">
              <h2>{artpost.art_title}</h2>
              <h3>{artpost.poster_name}</h3>
              <p>
                <i className="fas fa-heart"></i>
                {artpost.statistics.like_count}
                <i className="far fa-comment-dots"></i>
                {artpost.statistics.review_count}
              </p>

              <div id="tagsContainer">
                {/* Display art type tag for each artpost */}
                {this.displayArtType(artpost)}

                {/* Display art subject tags for each artpost */}
                {artpost.art_subject.map((subject) => {
                  return (
                    <span className={"badge " + "badge-" + subject} style={{ marginRight: "5px" }}>{subject}</span>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      );
    });

    return jsx;
  };

  // ===== Render the landing page =====
  render() {
    return (
      <React.Fragment>
        {/* NAVBAR */}
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">

            {/* Bootstrap offcanvas filter options */}
            <button id="sideToggle" className="btn d-md-none" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
              <i className="navbar-toggler-icon"></i>
            </button>

            <div className="offcanvas offcanvas-start" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
              <div className="offcanvas-header">
                <h5 className="offcanvas-title" id="offcanvasExampleLabel">Search Filter</h5>
                <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
              </div>
              <div className="offcanvas-body">
                <SideFilterOptions filterGallery={this.filterGallery} getGallery={this.getGallery} closePage={this.closePage} />
              </div>
            </div>

            {/* Logo */}
            <a className="navbar-brand" href="/">
              <img id="logo" src="../artlogo.png"></img>
            </a>

            {/* Search Bar */}
            <div id="searchContainer">
              <input
                id="searchBar"
                className="form-control me-2"
                value={this.state.searchTerm}
                onChange={this.updateForm}
                name="searchTerm"
                type="search"
                placeholder="Search for art or artist"
                aria-label="Search" />

              <button className="btn" onClick={() => {
                this.searchResults()
                this.setState({
                  displayArtInfo: false,
                  displayHome: true,
                })
              }

              }>
                <i className="fas fa-search"></i>
              </button>
            </div>

            <React.Fragment>
              <button id="createArtBtn" onClick={this.createArt}><i class="fas fa-plus-circle"></i> Create</button>
            </React.Fragment>
            {/* } */}

          </div>
        </nav>

        {/* HERO IMAGE */}
        <div id="hero" style={{ backgroundImage: `url("./hero_image.jpg")` }}>
          <div><p>— TheArtGalore where every artist deserves to shine</p></div>
        </div>

        {/* BODY */}
        {/* Only display main body when on home page */}
        {this.state.displayHome &&
          <div id="mainSection">

            {/* Filter section */}
            <div id="filterSection" className="d-none d-md-block">
              <FilterOptions filterGallery={this.filterGallery} getGallery={this.getGallery} />
            </div>

            {/* Gallery section */}
            <div id="gallerySection">
              {this.state.gallery ? <p id="resultsNum">Displaying {this.state.gallery.length} result(s)</p> : null}
              <div className="row">
                {this.renderList()}
              </div>
            </div>

          </div>
        }

        {/* Render detailed art page when art is clicked */}
        {this.renderArtInfoPage()}

        {/* Render create art page when create button is clicked */}
        {this.renderCreateArtPage()}

      </React.Fragment>
    );
  }
}
