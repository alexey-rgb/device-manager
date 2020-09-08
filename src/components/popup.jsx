import React from "react";
/* library of react components*/

import { Button } from "@material-ui/core";

const Popup = (props) => {
  const popupStyle = {
    width: 300,
    minHeight: 100,
    position: "absolute",
    backgroundColor: "white",
    border: "1px solid transparent",
    borderRadius: "10px",
    color: "black",
    display: props.popupVisability,
    flexDirection: "column",
    alignContent: "space-between",
    padding: 10,
    left: 525,
    top: 250,
  };
  return (
    /* popup */

    <div style={popupStyle}>
      <p>
        Thank you. Now we know that your device was broken down and soon you
        will be contacted by our technician
      </p>
      <Button
        onClick={props.handleCloseButton}
        size="small"
        variant="contained"
        color="primary"
      >
        Close
      </Button>
    </div>
  );
};

export default Popup;
