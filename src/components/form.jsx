import React, { useState } from "react";
/* library of react components*/

import {
  Button,
  Input,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";

const Form = ({
  handleForm,
  handleDeviceNumber,
  handleDeviceModel,
  handleSendButton,
  disabled,
  model,
  serialNumber,
  opacity,
}) => {
  const wrapperStyle = {
    backgroundColor: "mediumaquamarine",
    width: 700,
    minHeight: 500,
    margin: "100px auto -300px auto",
    paddingTop: 30,
    textAlign: "center",
    opacity: opacity,
  };

  return (
    <React.Fragment>
      <div style={wrapperStyle}>
        <h3 style={{ color: "dimgrey" }}>
          Register and edit information about your device, send a message in
          case of technical malfunction
        </h3>
        <form
          style={{
            display: "flex",
            justifyContent: "space-around",
            marginTop: 50,
          }}
          onSubmit={handleForm}
        >
          <Input
            onChange={handleDeviceNumber}
            type="text"
            required
            placeholder="insert device serial number"
            value={serialNumber}
            defaultValue="Hello world"
            inputProps={{ "aria-label": "description" }}
          />
          <FormControl>
            <InputLabel style={{ width: 135 }} id="demo-simple-select-label">
              Select your device
            </InputLabel>
            <Select
              style={{ width: 165, marginTop: 20 }}
              onChange={handleDeviceModel}
              value={model}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
            >
              <MenuItem value="Own">Own</MenuItem>
              <MenuItem value="Wash Mashine">Wash Mashine</MenuItem>
            </Select>
          </FormControl>
          <Button
            onClick={handleSendButton}
            //   disabled={disabled}
            type="submit"
            size="small"
            variant="contained"
            color="primary"
          >
            Save
          </Button>
        </form>
      </div>
    </React.Fragment>
  );
};

export default Form;
