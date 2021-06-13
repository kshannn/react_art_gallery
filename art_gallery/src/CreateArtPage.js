import React from "react";
import CreateArtForm from "./createArtForm/CreateArtForm";

export default function CreateArtPage(props) {
  return (
    <React.Fragment>
      <div id="createArtPage">
        <button onClick={props.close}>Back</button>
        <CreateArtForm />
      </div>
    </React.Fragment>
  );
}
