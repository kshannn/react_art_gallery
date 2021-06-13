import React from "react";

export default function create(props) {
  return (
    <React.Fragment>
      <button onClick={props.create}>Create</button>
    </React.Fragment>
  );
}
