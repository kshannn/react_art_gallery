import React from "react";
import ArtForm from "./ArtForm";
import axios from "axios";


const baseUrl = "https://8080-coral-grasshopper-zdtsha75.ws-us09.gitpod.io"

export default class CreateArtPage extends React.Component {

  state = {
    poster_name: "",
    image: "",
    art_title: "",
    art_description:"",
    art_type: "digital",
    art_subject: [],
    errorMessage:"",
    errorMessagePosterName:"",
    errorMessageImage:"",
    errorMessageArtTitle:"",
    errorMessageArtDescription:""
  };

  // ===== Clicking on submit updates database with users' input (POST request) =====
  submit = async () => {
    let isError = false;
    // Frontend form validation
    // Validation: Name
    if(this.state.poster_name === "" || this.state.poster_name === undefined){
      isError = true;
      this.setState({
        errorMessagePosterName: "error",
        errorMessage: "Please ensure all the fields are valid!"
      })
    }

    // Validation: Art Link
    if(this.state.image === "" || this.state.image === undefined){
      isError = true;
      this.setState({
        errorMessageImage: "error",
        errorMessage: "Please ensure all the fields are valid!"
      })
      
    }

    // Validation: Title of Art
    if(this.state.art_title === "" || this.state.art_title === undefined){
      isError = true;
      this.setState({
        errorMessageArtTitle: "error",
        errorMessage: "Please ensure all the fields are valid!"
      })
      
    }
    // Validation: Description
    if(this.state.art_description === "" || this.state.art_description === undefined){
      isError = true;
      this.setState({
        errorMessageArtDescription: "error",
        errorMessage: "Please ensure all the fields are valid!"
      })
    }

    if(isError){
      return;
    }

    
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

      let response = await axios.post(baseUrl + "/create/artpost", userData);
  
      // Returns user to gallery page and refreshes updated gallery
      this.props.closePage();
      this.props.getGallery();

  };

  // Process checkbox
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

  // Process form fields
  updateForm = (e) => {
    this.setState({
      // errorMessagePosterName: "",
      [e.target.name]: e.target.value
    });
  };

  render() {
    return (
      <React.Fragment>
        <div id="createArtPage">
          {/* Back button */}
          <button className="backBtn" onClick={this.props.closePage}><i class="fas fa-chevron-left"></i>Back</button>
          <h1 className="text-center">Create an art post</h1>

          {/* Art form */}
          <ArtForm
            updateForm={this.updateForm}
            art_type={this.state.art_type}
            art_subject={this.state.art_subject}
            updateCheckbox={this.updateCheckbox}
            poster_name={this.state.poster_name}
            image={this.state.image}
            art_title={this.state.art_title}
            art_description={this.state.art_description}
            errorMessage={this.state.errorMessage}
            errorMessagePosterName={this.state.errorMessagePosterName}
            errorMessageImage={this.state.errorMessageImage}
            errorMessageArtTitle={this.state.errorMessageArtTitle}
            errorMessageArtDescription={this.state.errorMessageArtDescription} />

           {/* Submit form button  */}
          <div className="btnContainer">
          <button onClick={this.submit}>Submit</button>
          </div>
        </div>
      </React.Fragment>
    );
  }

}
