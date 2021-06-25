import React from "react";
import ArtForm from "./ArtForm";
import axios from "axios";


const baseUrl = "https://3000-coral-grasshopper-zdtsha75.ws-us09.gitpod.io"

export default class CreateArtPage extends React.Component {

  state = {
    poster_name: "",
    image: "",
    art_title: "",
    art_description:"",
    art_type: "",
    art_subject: []
  };

  // POST request
  submit = async () => {
    let userData = {
      post_date: new Date(),
      poster_name: this.state.poster_name,
      image: this.state.image,
      art_title: this.state.art_title,
      art_description: this.state.art_description,
      art_type: this.state.art_type,
      art_subject: this.state.art_subject,
      statistics:{
        review_count: 0,
        like_count: 0
      }
    };
    let response = await axios.post(
      baseUrl + "/create/artpost",
      userData
    );

    this.props.closePage();
    this.props.getGallery();

  };

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

  updateForm = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    return (
      <React.Fragment>
        <div id="createArtPage">
          <button className="backBtn" onClick={this.props.closePage}><i class="fas fa-chevron-left"></i>Back</button>
          <h1 className="text-center">Create an art post</h1>
          <ArtForm
            updateForm={this.updateForm}
            art_type={this.state.art_type}
            art_subject={this.state.art_subject}
            updateCheckbox={this.updateCheckbox}
            poster_name={this.state.poster_name}
            image={this.state.image}
            art_title={this.state.art_title}
            art_description={this.state.art_description} />
          <div className="btnContainer">
          <button onClick={this.submit}>Submit</button>
          </div>
        </div>
      </React.Fragment>
    );
  }

}
