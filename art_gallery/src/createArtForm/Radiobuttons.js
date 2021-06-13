import React from "react";

export default function Radiobuttons(props) {
  return (
    <React.Fragment>
      <h2>Art type</h2>
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
    </React.Fragment>
  );
}
