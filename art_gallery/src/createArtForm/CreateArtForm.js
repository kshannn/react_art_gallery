import React from "react";
import Radiobuttons from "./Radiobuttons";
import Checkboxes from "./Checkboxes";
import axios from "axios";
import "../App.css";

export default class CreateArtForm extends React.Component {
  state = {
    art_type: "",
    art_subject: [],
    gallery: []
  };

  // GET request
  async componentDidMount() {
    let response = await axios.get(
      "https://3000-coral-grasshopper-zdtsha75.ws-us09.gitpod.io/art_gallery"
    );
    this.setState({
      gallery: response.data
    });
  }

  // POST request
  submit = async () => {
    let userData = {
      art_type: this.state.art_type,
      art_subject: this.state.art_subject
    };
    let response = await axios.post(
      "https://3000-coral-grasshopper-zdtsha75.ws-us09.gitpod.io/create_art_post",
      userData
    );
    console.log(response);
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
          <Radiobuttons
            updateForm={this.updateForm}
            art_type={this.state.art_type}
          />
          <Checkboxes updateCheckbox={this.updateCheckbox} />
          <button onClick={this.submit}>Submit</button>
        </div>
      </React.Fragment>
    );
  }
}
