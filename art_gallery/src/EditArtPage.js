import React from "react";
import ArtForm from "./ArtForm";
// import axios from "axios";

export default class EditArtPage extends React.Component {

  state = {
    poster_name: "",
    image: "",
    art_title: "",
    art_description:"",
    art_type: "",
    art_subject: []
  };

  async componentDidMount () {
    this.setState({
      poster_name: this.props.poster_name, // insert previous data, try passing in object
      image: this.props.image,
      art_title: this.props.art_title,
      art_description:this.props.art_description,
      art_type: this.props.art_type,
      art_subject: this.props.art_subject
    })
  }

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
        <div id="editArtPage">
          <button onClick={this.props.closeEdit}>Back</button>
          <ArtForm
            updateForm={this.updateForm}
            art_type={this.state.art_type}
            updateCheckbox={this.updateCheckbox}
            poster_name={this.state.poster_name}
            image={this.state.image}
            art_title={this.state.art_title}
            art_description={this.state.art_description} />
          <button>Update</button>
        </div>
      </React.Fragment>
    );
  }

}
