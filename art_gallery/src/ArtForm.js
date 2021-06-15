import React from "react";

export default function ArtForm (props) {
  return (
    <React.Fragment>
      {/* ====== Text field: Poster Name ======*/}
      <h2>Name</h2>
      <label>Your Name: </label>
      <input type="text" 
      placeholder="Your name"
      name="poster_name"
      value={props.poster_name}
      onChange={props.updateForm}
      />

      {/* ====== Text field: Art URL ======*/}
      <h2>Upload your art link</h2>
      <input type="text"
      placeholder="Input your art URL"
      name="image"
      value={props.image}
      onChange={props.updateForm} />

      {/* ====== Text field: Art Title ======*/}
      <h2>Title of Art</h2>
      <input type="text"
      placeholder="Input title of your art"
      name="art_title"
      value={props.art_title}
      onChange={props.updateForm} />

      {/* ====== Text field: Art Description ======*/}
      <h2>Art Description</h2>
      <textarea placeholder="Type a description for your art"
      name="art_description"
      rows="4" 
      cols="40"
      value={props.art_description}
      onChange={props.updateForm}
      ></textarea> 
  
      {/* ====== Radio buttons: Art Type ======*/}
      <h2>Art Type</h2>
      <input
        type="radio"
        name="art_type"
        value="digital"
        onChange={props.updateForm}
        checked={props.art_type === "digital"}
      />{" "}
      Digital
      <input
        type="radio"
        name="art_type"
        value="traditional"
        onChange={props.updateForm}
        checked={props.art_type === "traditional"}
      />{" "}
      Traditional
      {/* ====== Checkboxes: Art Subject ======*/}
      <h2>Art Subject</h2>
      <input
        type="checkbox"
        name="art_subject"
        value="nature"
        checked={props.art_subject.includes("nature")}
        onChange={props.updateCheckbox}
      />{" "}
      Nature
      <input
        type="checkbox"
        name="art_subject"
        value="animal"
        checked={props.art_subject.includes("animal")}
        onChange={props.updateCheckbox}
      />{" "}
      Animal
      <input
        type="checkbox"
        name="art_subject"
        value="people"
        checked={props.art_subject.includes("people")}
        onChange={props.updateCheckbox}
      />{" "}
      People
    </React.Fragment>
  );
}
