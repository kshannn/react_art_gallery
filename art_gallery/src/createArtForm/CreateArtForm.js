import React from "react";
import ArtForm from "./ArtForm";
import axios from "axios";
import "../App.css";

export default class CreateArtForm extends React.Component {
  state = {
    poster_name: "",
    image: "",
    art_title:"",
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
      art_type: this.state.art_type,
      art_subject: this.state.art_subject,
      review_count: 0,
      like_count: 0
    };
    let response = await axios.post(
      "https://3000-coral-grasshopper-zdtsha75.ws-us09.gitpod.io/create_art_post",
      userData
    );

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
        <div className="App">
          <ArtForm
            updateForm={this.updateForm}
            art_type={this.state.art_type}
            updateCheckbox={this.updateCheckbox}
            poster_name={this.state.poster_name}
            image={this.state.image}
            art_title={this.state.art_title} />
          <button onClick={this.submit}>Submit</button>
        </div>
      </React.Fragment>
    );
  }
}
