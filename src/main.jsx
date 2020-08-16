import React from "react";
import { render } from "react-dom";
/* library of react components*/

import {
  Button,
  Input,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";

/* all ui in that class component */

class DeviseUi extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      serialNumber: "",
      serialsNumbers: [],
      count: 0,
      model: "",
      modelsDevices: [],
      blockStyle: {
        display: "none",
      },
      isSubmitted: false,
      disabled: true,
      devicesData: [],
      popupVisability: "none",
      deviceCondition: {},
    };
  }

  /* get server response */

  componentDidMount() {
    var devicesData = this.state.devicesData;
    fetch("/api/device", {
      method: "get",
    })
      .then((res) => {
        res.json().then(function (json) {
          devicesData.push(json);
        });
      })
      .catch((e) => console.log(e));
  }

  render() {
    const popupStyle = {
      width: 300,
      minHeight: 100,
      position: "absolute",
      backgroundColor: "white",
      border: "1px solid transparent",
      borderRadius: "10px",
      color: "black",
      display: this.state.popupVisability,
      flexDirection: "column",
      alignContent: "space-between",
      padding: 10,
      left: 525,
      top: 250,
    };

    /* get device serial number */

    const handleDeviceNumber = (event) => {
      if (this.state.model !== "") this.setState({ disabled: false });
      this.setState({ serialNumber: event.target.value });
    };

    /* get device type */

    const handleDeviceModel = (event) => {
      const defaultValue = "Выберите тип устройства",
        model =
          event.target.value === defaultValue ? "" : "" + event.target.value;
      if (model !== "" && this.state.serialNumber !== "") {
        this.setState({ disabled: false });
      }
      this.setState({ model });
    };

    /* includes method fetch to send network request by post method */

    const handleForm = (event) => {
      event.preventDefault();

      const blockStyle = {
          display: "flex",
          justifyContent: "space-around",
          width: "85%",
          marginTop: 40,
        },
        deviceNumber = this.state.serialNumber,
        count = this.state.count + 1,
        isSubmitted = true,
        modelsDevices = this.state.modelsDevices,
        disabled = true,
        serialsNumbers = this.state.serialsNumbers,
        deviceCondition = this.state.deviceCondition;

      deviceCondition[`${deviceNumber}`] = false;

      serialsNumbers.push(deviceNumber);

      /* if you use mock data comment code below*/

      fetch("/api/device", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ deviceNumber }),
      })
        .then((res) => res.json())
        .then(({ deviceManager }) => modelsDevices.push(deviceManager))
        .catch((e) => console.log(e));

      // if you use mock data uncomment code below

      // modelsDevices.push(this.state.model);

      this.setState({
        blockStyle,
        count,
        isSubmitted,
        modelsDevices,
        disabled,
      });
    };

    /* change device data */

    const handleChangeButton = (idx) => {
      const serialNumber = this.state.serialsNumbers[idx],
        model = this.state.modelsDevices[idx],
        modelsDevices = this.state.modelsDevices.filter(
          (device, i) => i !== idx
        ),
        serialsNumbers = this.state.serialsNumbers.filter(
          (device, i) => i !== idx
        );
      this.setState({ modelsDevices, serialsNumbers, serialNumber, model });
    };

    /* return fields to default value */

    const handleSendButton = () => {
      setTimeout(() => {
        this.setState({ model: "", serialNumber: "" });
      }, 1000);
    };

    /* Delete device */

    const handleDeleteButton = (idx) => {
      const modelsDevices = this.state.modelsDevices.filter(
          (device, i) => i !== idx
        ),
        serialsNumbers = this.state.serialsNumbers.filter(
          (device, i) => i !== idx
        ),
        devicesData = this.state.devicesData;

      fetch("/api/device/" + idx, {
        method: "delete",
      })
        .then(() => {
          devicesData = devicesData.filter((device) => device.id !== idx);
        })
        .catch((e) => console.log(e));

      this.setState({
        modelsDevices,
        serialsNumbers,
        serialNumber: "",
        model: "",
        devicesData,
      });
    };

    /* user send troubleshooting message */

    const handleTroubleButton = (idx, deviceSeries) => {
      const popupVisability = "flex",
        opacity = 0.6,
        devicesData = this.state.devicesData,
        deviceCondition = this.state.deviceCondition;

      deviceCondition[`${deviceSeries}`] = true;
      fetch("/api/device/" + idx, {
        method: "put",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ done: true }),
      })
        .then((res) => res.json())
        .then(({ deviceManager }) => {
          const i = devicesData.findIndex(
            (device) => device.id === deviceManager.id
          );
          devicesData[i].updatedAt = deviceManager.updatedAt;
        })
        .catch((e) => console.log(e));

      this.setState({ popupVisability, opacity, devicesData, deviceCondition });
    };

    /* close popup */

    const handleCloseButton = () => {
      const popupVisability = "none",
        opacity = 1;
      this.setState({ popupVisability, opacity });
    };

    /* styles for wrapper, which includes all ui, exept title on white background  */

    const wrapperStyle = {
        backgroundColor: "mediumaquamarine",
        width: 700,
        minHeight: 500,
        margin: "100px auto",
        paddingTop: 30,
        textAlign: "center",
        opacity: this.state.opacity,
      },
      {
        serialNumber,
        model,
        serialsNumbers,
        devicesData,
        modelsDevices,
        deviceCondition,
      } = this.state;

    return (
      <React.Fragment>
        <h2 style={{ textAlign: "center" }}>
          The app will help you register your device, change device data, delete
          and send a help message if your device is faulty
        </h2>
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
              disabled={this.state.disabled}
              type="submit"
              size="small"
              variant="contained"
              color="primary"
            >
              Save
            </Button>
          </form>

          {/* Code below render information about device whith data from server */}

          {devicesData[0] !== undefined
            ? devicesData[0].map((objDevice, i) => {
                return (
                  <div key={i} style={this.state.blockStyle}>
                    <p style={{ width: 200 }}>{`№ ${i + 1}: ${
                      objDevice.deviceNumber
                    } / Series: ${serialsNumbers[i]}`}</p>
                    <Button
                      disabled={deviceCondition[`${serialsNumbers[i]}`]}
                      onClick={() => handleDeleteButton(i)}
                      size="small"
                      variant="contained"
                      color="secondary"
                    >
                      Delete
                    </Button>
                    <Button
                      disabled={deviceCondition[`${serialsNumbers[i]}`]}
                      onClick={() => handleChangeButton(i)}
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
              })
            : console.log("data not avaible")}

          {/*  if the server broke down, you can still work with the user interface using
           artificial data, just comment the code above and uncomment below,
          you will also need to comment fetch method in handleForm and uncomment below */}

          {/*  {serialsNumbers.map((serialNumber, i) => {
            return (
              <div key={i} style={this.state.blockStyle}>
                <p style={{ width: 200 }}>{`№ ${i + 1}: ${
                  modelsDevices[i]
                } / Series: ${serialNumber}`}</p>
                <Button
                  disabled={deviceCondition[`${serialNumber}`]}
                  onClick={() => handleDeleteButton(i)}
                  size="small"
                  variant="contained"
                  color="secondary"
                >
                  Delete
                </Button>
                <Button
                  disabled={deviceCondition[`${serialNumber}`]}
                  onClick={() => handleChangeButton(i)}
                  size="small"
                  variant="contained"
                >
                  Change
                </Button>
                <Button
                  disabled={deviceCondition[`${serialNumber}`]}
                  onClick={() => handleTroubleButton(i, serialNumber)}
                  variant="contained"
                  color="primary"
                >
                  Device broke down
                </Button>
              </div>
            );
          })} */}

          {/* popup */}

          <div style={popupStyle}>
            <p>
              Thank you. Now we know that your device was broken down and soon
              you will be contacted by our technician
            </p>
            <Button
              onClick={handleCloseButton}
              size="small"
              variant="contained"
              color="primary"
            >
              Close
            </Button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

/* component render  */

render(<DeviseUi />, document.getElementById("root"));
