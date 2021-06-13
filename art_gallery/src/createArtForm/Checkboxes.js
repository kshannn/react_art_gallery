import React from "react";

export default function Checkboxes(props) {
  return (
    <React.Fragment>
      <h2>Art Subject</h2>
      <input
        type="checkbox"
        name="art_subject"
        value="nature"
        onChange={props.updateCheckbox}
      />{" "}
      Nature
      <input
        type="checkbox"
        name="art_subject"
        value="animal"
        onChange={props.updateCheckbox}
      />{" "}
      Animal
      <input
        type="checkbox"
        name="art_subject"
        value="people"
        onChange={props.updateCheckbox}
      />{" "}
      People
    </React.Fragment>
  );
}
