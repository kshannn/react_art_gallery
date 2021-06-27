import React from "react";
import ArtForm from "./ArtForm";
import axios from "axios";

const baseUrl = "https://3000-coral-grasshopper-zdtsha75.ws-us09.gitpod.io"

export default class EditArtPage extends React.Component {

  state = {
    poster_name: "",
    image: "",
    art_title: "",
    art_description: "",
    art_type: "",
    art_subject: []
  };

  // ===== Load existing information of art to be edited =====
  async componentDidMount() {
    this.setState({
      poster_name: this.props.currentArt.poster_name,
      image: this.props.currentArt.image,
      art_title: this.props.currentArt.art_title,
      art_description: this.props.currentArt.art_description,
      art_type: this.props.currentArt.art_type,
      art_subject: this.props.currentArt.art_subject
    })
  }

  // ===== Process checkboxes =====
  updateCheckbox = (e) => {
    if (!this.state.art_subject.includes(e.target.value)) {
      let clone = [...this.state.art_subject, e.target.value];
      this.setState({
        art_subject: clone
      });
    } else {
      let indexToDelete = this.state.art_subject.findIndex((s) => {
        return s === e.target.value;
      });
      let clone = [
        ...this.state.art_subject.slice(0, indexToDelete),
        ...this.state.art_subject.slice(indexToDelete + 1)
      ];
      this.setState({
        art_subject: clone
      });
    }
  };

  // ===== Process form fields =====
  updateForm = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  // ===== Clicking on update button updates the database with new changes =====
  updateChanges = async (artIdToEdit) => {

    let userData = {
      poster_name: this.state.poster_name,
      image: this.state.image,
      art_title: this.state.art_title,
      art_description: this.state.art_description,
      art_type: this.state.art_type,
      art_subject: this.state.art_subject,
      statistics: {
        review_count: this.props.currentArt.statistics.review_count,
        like_count: this.props.currentArt.statistics.like_count
      }
    };

    let response = await axios.put(baseUrl + "/artpost/edit/" + artIdToEdit, userData)

    // returns user to gallery page and refreshes gallery with updated changes
    this.props.closeEditArt();
    this.props.closePage();
    this.props.getGallery();
  }

  // ===== Render edit art page =====
  render() {
    return (
      <React.Fragment>
        <div id="editArtPage">
          {/* Back button */}
          <button className="backBtn" onClick={this.props.closeEditArt}><i class="fas fa-chevron-left"></i>Back</button>
          <h1 className="text-center">Edit an art post</h1>

          {/* Edit art form */}
          <ArtForm
            updateForm={this.updateForm}
            art_type={this.state.art_type}
            art_subject={this.state.art_subject}
            updateCheckbox={this.updateCheckbox}
            poster_name={this.state.poster_name}
            image={this.state.image}
            art_title={this.state.art_title}
            art_description={this.state.art_description} />
          
          {/* Update button */}
          <div className="btnContainer">
            <button onClick={() => {
              this.updateChanges(this.props.currentArt._id);
            }}>Update</button>
          </div>
        </div>
      </React.Fragment>
    );
  }

}
