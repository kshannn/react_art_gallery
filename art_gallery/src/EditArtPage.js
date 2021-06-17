import React from "react";
import ArtForm from "./ArtForm";
import axios from "axios";

export default class EditArtPage extends React.Component {

  state = {
    poster_name: "",
    image: "",
    art_title: "",
    art_description:"",
    art_type: "",
    art_subject: []
  };

  updateChanges = async (artIdToEdit) => {

    let userData = {
      poster_name: this.state.poster_name,
      image: this.state.image,
      art_title: this.state.art_title,
      art_description: this.state.art_description,
      art_type: this.state.art_type,
      art_subject: this.state.art_subject,
      statistics:{
        review_count: this.props.review_count,
        like_count: this.props.like_count
      }
    };

  

    let response = await axios.put("https://3000-coral-grasshopper-zdtsha75.ws-us08.gitpod.io/artpost/edit/" + artIdToEdit, userData) 


    // close edit page
    this.props.closeEdit();
    this.props.closePage();
    // refresh page
    this.props.getGallery();
  }

  async componentDidMount () {
    this.setState({
      poster_name: this.props.poster_name, 
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
            art_subject={this.state.art_subject}
            updateCheckbox={this.updateCheckbox}
            poster_name={this.state.poster_name}
            image={this.state.image}
            art_title={this.state.art_title}
            art_description={this.state.art_description} />
          <button onClick={()=>{
            this.updateChanges(this.props._id);
          }}>Update</button>
        </div>
      </React.Fragment>
    );
  }

}
