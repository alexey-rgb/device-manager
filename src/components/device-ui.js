import React, { useState, useEffect } from "react";
import Form from "./form.jsx";
import DevicesData from "./devices-data.jsx";
import Popup from "./popup.jsx";
import { Button } from "@material-ui/core";

/* all ui in that functional component */

const DeviseUi = () => {
  const getData = () => {
    let serverResponse = [];
    fetch("/api/device", {
      method: "get",
    })
      .then((res) => {
        res.json().then(function (json) {
          json.forEach((obj) => {
            serverResponse.push(obj);
          });
        });
      })
      .catch((e) => console.log(e));

    return serverResponse;
  };

  // Hooks
  const [serialNumber, setSerialNumber] = useState("");
  const [serialsNumbers, setSerialsNumbers] = useState([]);
  const [count, setCount] = useState(0);
  const [model, setModel] = useState("");
  const [modelsDevices, setModelDevices] = useState([]);
  const [blockStyle, setBlockStyle] = useState({
    display: "flex",
    justifyContent: "space-around",
    width: "630px",
    margin: "0 auto 30px",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [devicesData, setDevicesData] = useState(getData());
  const [popupVisability, setPopupVisability] = useState("none");
  const [deviceCondition, setDeviceCondition] = useState({});
  const [isStart, setIsStart] = useState(false);
  const [id, setId] = useState(0);
  const [opacity, setOpacity] = useState(1);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    setDevicesData(getData());
  }, [count]);

  /* get device serial number */

  const handleDeviceNumber = (event) => {
    // if (model !== "") setDisabled(false);
    setSerialNumber(event.target.value);
  };

  /* get device type */

  const handleDeviceModel = (event) => {
    const defaultValue = "Выберите тип устройства";
    setModel(
      event.target.value === defaultValue ? "" : "" + event.target.value
    );
  };

  useEffect(() => {
    if (model !== "" && serialNumber !== "") {
      setDisabled(false);
    }
  }, [model]);

  /* includes method fetch to send network request by post method */

  const handleForm = (event) => {
    event.preventDefault();

    const /* blockStyle = {
        display: "flex",
        justifyContent: "space-around",
        width: "85%",
        marginTop: 40,
      }, */
      data = {
        deviceNumber: serialNumber,
        model: model,
        id: id + 1,
      };

    /* if you use mock serverResponse comment code below */

    fetch("/api/device", {
      method: "post",
      headers: { "Content-Type": "application/json;charset=UTF-8" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then(({ deviceManager }) => modelsDevices.push(deviceManager))
      .catch((e) => console.log(e));

    // if you use mock serverResponse uncomment code below

    // modelsDevices.push(model);

    deviceCondition[`${serialNumber}`] = false;

    serialsNumbers.push(serialNumber);

    /*    setBlockStyle(blockStyle); */
    setCount(count + 1);
    setId(id + 1);
    setIsSubmitted(true);
    setModelDevices(modelsDevices);
    setDisabled(true);
    setDeviceCondition(deviceCondition);
    setSerialsNumbers(serialsNumbers);
  };

  /* change device serverResponse */

  const handleChangeButton = (idx, currentDeviceNumber) => {
    /*
      const serialNumber = serialsNumbers[0],
        model = modelsDevices[idx],
        modelsDevices = modelsDevices.filter(
          (device, i) => i !== idx
        ), */
    /*   serialsNumbers = serialsNumbers.filter(
        (device, i) => i !== idx
      ); */

    /*  const changedDevices = devicesData.filter(
      (device, i) => device.deviceNumber !== currentDeviceNumber
    ); */
    /*     setModelDevices(modelsDevices[idx]);
    setSerialNumber(serialsNumbers[idx]);
    setSerialsNumbers(serialsNumbers); */
    console.log(devicesData[idx].id);
    setSerialNumber(devicesData[idx].deviceNumber);
    setModel(devicesData[idx].model);
    //  setDevicesData(changedDevices);
  };

  /* return fields to default value */

  const handleSendButton = () => {
    setTimeout(() => {
      setModel("");
      setSerialNumber("");
    }, 1000);
  };

  /* Delete device */

  const handleDeleteButton = (deviceNum, idx) => {
    /*  const modelsDevices = modelsDevices.filter(
          (device, i) => i !== idx
        ),
        serialsNumbers = serialsNumbers.filter(
          (device, i) => i !== idx
        );*/

    fetch("/api/device/" + deviceNum, {
      method: "delete",
    })
      /*     .then(() => {
         
      }) */
      .catch((e) => console.log(e));
    const deletedDevices = devicesData.filter(
      (device) => device.deviceNumber !== deviceNum
    );
    setModelDevices(modelsDevices);
    setSerialNumber("");
    setSerialsNumbers(serialsNumbers);
    /* setModel(); */
    setDevicesData(deletedDevices);
    setId(id === 1 ? 1 : id - 1);
  };

  /* user send troubleshooting message */

  const handleTroubleButton = (idx, deviceSeries) => {
    const popupVisability = "flex",
      opacity = 0.6;

    deviceCondition[`${deviceSeries}`] = true;
    fetch("/api/device/" + idx, {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ done: true }),
    })
      .then((res) => res.json())
      .then(({ deviceManager }) => {
        const i = devicesData[0].findIndex(
          (device) => device.id === deviceManager.id
        );
        devicesData[0][i].updatedAt = deviceManager.updatedAt;
      })
      .catch((e) => console.log(e));
    setPopupVisability(popupVisability);
    setDeviceCondition(deviceCondition);
    setDevicesData(devicesData);
    setOpacity(opacity);
  };

  /* close popup */

  const handleCloseButton = () => {
    const popupVisability = "none",
      opacity = 1;
    setPopupVisability(popupVisability);
    setOpacity(opacity);
  };

  const title = (
    <h2 style={{ textAlign: "center" }}>
      The app will help you register your device, change device serverResponse,
      delete and send a help message if your device is faulty
    </h2>
  );

  const handleStartButton = () => {
    setIsActive(true);
  };

  return (
    <React.Fragment>
      {title}
      <Button
        style={{ margin: "30px auto 30px auto", display: "block", width: 350 }}
        onClick={handleStartButton}
        size="small"
        variant="contained"
        color="secondary"
      >
        Show my devices
      </Button>
      <Form
        handleForm={handleForm}
        handleDeviceNumber={handleDeviceNumber}
        handleDeviceModel={handleDeviceModel}
        handleSendButton={handleSendButton}
        disabled={disabled}
        model={model}
        serialNumber={serialNumber}
        opacity={opacity}
      />
      <DevicesData
        handleDeleteButton={handleDeleteButton}
        handleChangeButton={handleChangeButton}
        handleTroubleButton={handleTroubleButton}
        blockStyle={blockStyle}
        devicesData={devicesData}
        deviceCondition={deviceCondition}
        serialsNumbers={serialsNumbers}
      />
      <Popup
        handleCloseButton={handleCloseButton}
        popupVisability={popupVisability}
      />
    </React.Fragment>
  );
};

export default DeviseUi;
