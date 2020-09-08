import React from "react";
/* library of react components*/

import { Button } from "@material-ui/core";

const DevicesData = ({
  handleDeleteButton,
  handleChangeButton,
  handleTroubleButton,
  blockStyle,
  devicesData,
  deviceCondition,
  serialsNumbers,
}) => {
  return (
    /* Code below render information about device whith serverResponse from server */

    <div>
      {devicesData.map((objDevice, i) => {
        return (
          <div key={i} style={blockStyle}>
            <p style={{ width: 200 }}>{`№ ${i + 1}: ${
              objDevice.model
            } / Series: ${objDevice.deviceNumber}`}</p>
            <Button
              disabled={deviceCondition[`${serialsNumbers[i]}`]}
              onClick={() => handleDeleteButton(objDevice.deviceNumber, i)}
              size="small"
              variant="contained"
              color="secondary"
            >
              Delete
            </Button>
            <Button
              disabled={deviceCondition[`${serialsNumbers[i]}`]}
              onClick={() => handleChangeButton(i, objDevice.deviceNumber)}
              size="small"
              variant="contained"
            >
              Change
            </Button>
            <Button
              disabled={deviceCondition[`${serialsNumbers[i]}`]}
              onClick={() => handleTroubleButton(i, serialsNumbers[i])}
              variant="contained"
              color="primary"
            >
              Device broke down
            </Button>
          </div>
        );
      })}
    </div>
  );
};

export default DevicesData;
