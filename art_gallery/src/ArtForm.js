import React from "react";

export default class ArtForm extends React.Component {

  render() {
    return (
      <React.Fragment>
        <div id="artForm">
          <h1>Start an art post</h1>
          {/* ====== Text field: Poster Name ======*/}
          <h2>Your name</h2>
          <input type="text"
            placeholder="Your name"
            name="poster_name"
            value={this.props.poster_name}
            onChange={this.props.updateForm}
          />

          {/* ====== Text field: Art URL ======*/}
          <h2>Upload your art link</h2>
          <input type="text"
            placeholder="Input your art URL"
            name="image"
            value={this.props.image}
            onChange={this.props.updateForm} />

          {/* ====== Art URL Preview ======*/}
          <div className="preview" style={{ backgroundImage: `url(${this.props.image})` }}>{this.props.image === "" ? <p>Preview art</p> : null}</div>

          {/* ====== Text field: Art Title ======*/}
          <h2>Title of Art</h2>
          <input type="text"
            placeholder="Input title of your art"
            name="art_title"
            value={this.props.art_title}
            onChange={this.props.updateForm} />

          {/* ====== Text field: Art Description ======*/}
          <h2>Art Description</h2>
          <textarea placeholder="Type a description for your art"
            name="art_description"
            rows="4"
            cols="40"
            value={this.props.art_description}
            onChange={this.props.updateForm}
          ></textarea>

          {/* ====== Radio buttons: Art Type ======*/}
          <div>
            <h2>Art Type</h2>
            <input
              type="radio"
              name="art_type"
              value="digital"
              onChange={this.props.updateForm}
              checked={this.props.art_type === "digital"}
            />{" "}
        <span>Digital</span>
        <input
              type="radio"
              name="art_type"
              value="traditional"
              onChange={this.props.updateForm}
              checked={this.props.art_type === "traditional"}
            />{" "}
        <span>Traditional</span>
        </div>
          {/* ====== Checkboxes: Art Subject ======*/}
          <div>
            <h2>Art Subject</h2>
            <input
              type="checkbox"
              name="art_subject"
              value="nature"
              checked={this.props.art_subject.includes("nature")}
              onChange={this.props.updateCheckbox}
            />{" "}
        <span>Nature</span>
        <input
              type="checkbox"
              name="art_subject"
              value="animal"
              checked={this.props.art_subject.includes("animal")}
              onChange={this.props.updateCheckbox}
            />{" "}
        <span>Animal</span>
        <input
              type="checkbox"
              name="art_subject"
              value="people"
              checked={this.props.art_subject.includes("people")}
              onChange={this.props.updateCheckbox}
            />{" "}
        <span>People</span>
         </div>
        </div>
      </React.Fragment>
    );
  }

}