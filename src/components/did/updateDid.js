import React, { useState, useRef, useEffect } from "react";
import { Form, Button, Card, Row, Col, Modal } from "react-bootstrap";
import Select from "react-select";
import { UnControlled as CodeMirror } from "react-codemirror2";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/mode/css/css";
// import Arweave from "arweave";
// const { readContract } = require("smartweave");
import { getDIdState, updateDID, burnKOIIAndMigrateContent } from "@_koi/did";
import "./style.css";
import parseCss from "../../services/parseCSS";

const Error = (props) => {
  return (
    <Modal show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>{props.message}</Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={props.handleClose}>
          OK
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
const currencies = [
  "Bitcoin",
  "Ethereum",
  "Binance Coin",
  "Tether",
  "Solana",
  "Cardano",
  "XRP",
  "Polkadot",
  "Avalanche",
  "Shiba",
];
const UpdateDid = () => {
  const [didState, setDidState] = useState({
    links: [
      {
        title: "",
        link: "",
      },
    ],
  });
  const [linkCount, setLinkCount] = useState(1);
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [didId, setDidId] = useState(null);
  const [addresses, setAddresses] = useState([
    { name: "", value: "", type: "general" },
  ]);
  const [didLoaded, setDidLoaded] = useState(false);
  const [code, setCode] = useState("");

  function handleLinkChange(id, value) {
    let links = [...didState.links];
    let [prop, index] = id.split("-");

    if (links[index]) {
      let link = links[index];
      if (prop === "t") {
        link.title = value;
      } else if (prop === "v") {
        link.link = value;
      }
    } else {
      let link = {};
      if (prop === "t") {
        link.title = value;
      } else if (prop === "v") {
        link.link = value;
      }
      links.push(link);
    }
    setDidState({ ...didState, links });
  }

  const handleClose = () => {
    setShow(false);
    setError("");
  };
  const handleShow = (e) => {
    setShow(true);
    setError(e);
  };
  function addLink() {
    if (linkCount < 5) {
      let links = [...didState.links];
      links.push({
        title: "",
        link: "",
      });
      setDidState({ ...didState, links });
      setLinkCount(linkCount + 1);
    } else handleShow("You can add upto 5 links");
  }
  function removeLink() {
    if (linkCount < 2) {
      handleShow("You can must add a link");
    } else {
      let links = [...didState.links];
      links.pop();
      setDidState({ ...didState, links });
      setLinkCount(linkCount - 1);
    }
  }
  function getLinkItem(i) {
    return (
      <Row key={i}>
        <Col>
          <Form.Group className="mb-3" controlId={`t-${i}`}>
            <Form.Label>Title</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="LinkedIn, Instagram, Twitter ....."
              defaultValue={didState.links[i].title}
              onChange={(e) => {
                handleLinkChange(e.target.id, e.target.value);
              }}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3" controlId={`v-${i}`}>
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              required
              placeholder="e.g https://linked.com/Arnald"
              defaultValue={didState.links[i].link}
              onChange={(e) => {
                handleLinkChange(e.target.id, e.target.value);
              }}
            />
          </Form.Group>
        </Col>
      </Row>
    );
  }
  function generateLinksTable() {
    const items = [];
    for (let i = 0; i < linkCount; i++) {
      items.push(getLinkItem(i));
    }
    return items;
  }
  function addAddress() {
    let adds = [...addresses];
    adds.push({
      name: "",
      value: "",
      type: "general",
    });
    setAddresses(adds);
    // setAddressCount(addressCount + 1);
  }

  const addCustomAddress = () => {
    let adds = [...addresses]
    adds.push({
      name: "",
      value: "",
      type: "custom",
    })
    setAddresses(adds)
  }
  const removeAddress = () => {
    if (addresses.length < 2) {
      handleShow("You can must add an address");
    } else {
      let adds = [...addresses];
      adds.pop();
      setAddresses(adds);
    }
    // if (addressCount < 2) {
    //   handleShow("You can must add an address");
    // } else {
    //   setAddressCount(addressCount - 1);
    // }
  };

  const getUpdatedCurrencies = () => {
    const renderCurrencies = [];
    currencies.forEach((cur, i) => {
      if (addresses.findIndex((k) => k.name === cur) === -1)
        renderCurrencies.push({ value: cur, label: cur });
      // else
      //   renderCurrencies.push({ value: cur, label: cur, disabled: true })
    });
    return renderCurrencies;
  };
  const handleAddressChange = (id, value) => {
    // console.log(id, value);
    let dupAddresses = [...addresses];
    // let dupAddresses = JSON.parse(JSON.stringify(addresses))
    let [prop, index] = id.split("-");
    let address = {};

    if (addresses[index]) {
      address = dupAddresses[index];
      if (prop === "ta") {
        address.name = value;
      } else if (prop === "va") {
        address.value = value;
      } else if (prop === "ca") {
        address.name = value;
      }
    } else {
      address = {};
      if (prop === "ta") {
        address.name = value;
      } else if (prop === "va") {
        address.value = value;
      } else if (prop === "ca") {
        address.name = value;
      }
      dupAddresses.push(address);
    }
    setAddresses(dupAddresses);
  };
  const getAddressItem = (i) => {
    return (
      <Row key={i}>
        <Col>
          <Form.Label>Currency</Form.Label>
          <Select
            className="custom-select"
            id={`ta-${i}`}
            placeholder="select currency"
            value={{ value: addresses[i].name, label: addresses[i].name }}
            onChange={(sel) => handleAddressChange(`ta-${i}`, sel.value)}
            options={getUpdatedCurrencies(i)}
          />
        </Col>
        <Col>
          <Form.Group className="mb-3" controlId={`va-${i}`}>
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              required
              placeholder="0x000000000000000"
              defaultValue={addresses[i].value}
              onChange={(e) => {
                handleAddressChange(e.target.id, e.target.value);
              }}
            />
          </Form.Group>
        </Col>
      </Row>
    );
  };
  const getCustomAddressItem = (i) => {
    return (
      <Row key={i}>
        <Col>
          <Form.Group className="mb-3" controlId={`ca-${i}`}>
            <Form.Label>Custom Currency</Form.Label>
            <Form.Control
              type="text"
              required
              placeholder="custom currency"
              value={addresses[i].name}
              onChange={(e) => {
                handleAddressChange(e.target.id, e.target.value);
              }}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3" controlId={`va-${i}`}>
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              required
              placeholder="0x000000000000000"
              value={addresses[i].value}
              onChange={(e) => {
                handleAddressChange(e.target.id, e.target.value);
              }}
            />
          </Form.Group>
        </Col>
      </Row>
    );
  };
  function generateAddressTable() {
    const items = [];
    for (let i = 0; i < addresses.length; i++) {
      if (addresses[i].type === "general") items.push(getAddressItem(i));
      else items.push(getCustomAddressItem(i));
    }
    return items;
  }
  function inputHandler(id, value) {
    setDidState({
      ...didState,
      [id]: value,
    });
  }
  function onSubmit(e) {
    e.preventDefault();
    if (!(window.koiiWallet && window.koiiWallet.createDID)) {
      handleShow("Install Finne wallet or update it to latest version");
      return;
    }
    let state = JSON.parse(JSON.stringify(didState));
    state.css = code;
    let newAddresses = {};
    addresses.forEach(function (address) {
      if (address.name !== "" && address.value !== "") {
        newAddresses[`${address.name.toLowerCase()}`] = address.value;
      }
    });
    state.addresses = newAddresses;
    console.error(state);
    return false;
    // window.koiiWallet.updateDID(didState,didId).then((res)=>{
    //   console.log(res)
    //   setUpdated(true)
    // });
  }
  function getDidStateHandler() {
    console.log("transaction", didId);
    // const data = {
    //   "links": [
    //     {
    //       "title": "Twitter",
    //       "link": "https://twitter.com/"
    //     },
    //     {
    //       "title": "LinkedIn ",
    //       "link": "https://www.linkedin.com/in/"
    //     },
    //     {
    //       "title": "Github",
    //       "link": "https://github.com/"
    //     }
    //   ],
    //   "addresses": {
    //     "solona": "5m6DdgC4yQY9EdzEocdHwCywpw78HYcsXuYPzwHytvg2",
    //     "ether": "0x0C840f508e3eC928f59Ff83440dbA3fFcd0e615F",
    //     "polygon": "0x75b352626e0E16c36605fE388190a57a88181657"
    //   },
    //   "name": "tempcd",
    //   "description": "This is my profile page!",
    //   "picture": "ErowSOjPjG5-wdvjVOGQSNlHVT-AE5f-Bzlmh2NxqFk",
    //   "banner": "-GQ4iE_f2OhwB2ws_NT9_oxfjycDK0X0r3yAQSaxWJk",
    //   "styles": {
    //     "links": {
    //       "color": "black"
    //     },
    //     "name": {
    //       "fontSize": "20px"
    //     },
    //     "description": {
    //       "color": "green"
    //     }
    //   },
    //   "css": ".links {\n  color: black;\n}\n\n.name {\n  font-size: 20px;\n}\n\n.description {\n  color: green;\n}\n\n"
    // }

    getDIdState(didId).then((res) => {
      console.log(res);
      if (res.status !== 200) {
        handleShow(res.message);
      } else {
        const data = res.data.data;
        console.log("res data", data);
        setDidState(data);
        setLinkCount(data.links.length);
        const resAdds = [];

        for (let [key, value] of Object.entries(data.addresses)) {
          console.log(key, value);
          if (
            currencies.findIndex((c) => c.toLowerCase() === key.toLowerCase()) >
            -1
          )
            resAdds.push({ name: key, value, type: "general" });
          else resAdds.push({ name: key, value, type: "custom" });
        }
        if (resAdds.length === 0)
          resAdds.push({ name: "", value: "", type: "general" });
        setCode(data.css);
        setAddresses(resAdds);
        setDidLoaded(true);
      }
    });
  }
  return (
    <div>
      <h3>Update DID</h3>
      {/* {didLoaded ? (<h4>DID Update Initialized</h4>) :""} */}
      {error && (
        <Error
          show={show}
          message={error}
          handleClose={handleClose}
          handleShow={handleShow}
        ></Error>
      )}
      {!didLoaded && (
        <div className="did-address-area">
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Enter you DID Id</Form.Label>
            <Form.Control
              type="text"
              placeholder="DID Id"
              value={didId}
              onChange={(e) => setDidId(e.target.value)}
            />
          </Form.Group>
          <Button onClick={getDidStateHandler} variant="primary" type="buuton">
            Get
          </Button>
        </div>
      )}
      {didLoaded && (
        <Form onSubmit={onSubmit}>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={didState.name}
              required
              onChange={(e) => {
                inputHandler(e.target.id, e.target.value);
              }}
              placeholder="Enter your good name"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              value={didState.description}
              required
              placeholder="Enter Description"
              onChange={(e) => {
                inputHandler(e.target.id, e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="picture">
            <Form.Label>Profile Picture transaction Id</Form.Label>
            <Form.Control
              type="text"
              required
              value={didState.picture}
              placeholder="Enter Profile Picture Tx Id"
              onChange={(e) => {
                inputHandler(e.target.id, e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="banner">
            <Form.Label>banner Picture transaction Id</Form.Label>
            <Form.Control
              required
              value={didState.banner}
              type="text"
              placeholder="Enter banner image Tx Id"
              onChange={(e) => {
                inputHandler(e.target.id, e.target.value);
              }}
            />
          </Form.Group>

          <Card border="primary">
            <Card.Header>Social Links</Card.Header>
            <Card.Body>
              {linkCount ? (
                generateLinksTable()
              ) : (
                <Row>
                  <Col>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Label>Title</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="LinkedIn, Instagram, Twitter ....."
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Label>Title</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="e.g https://linked.com/Arnald"
                      />
                    </Form.Group>
                  </Col>
                </Row>
              )}

              <Button variant="success" onClick={addLink}>
                +Add
              </Button>
              <Button
                style={{ marginLeft: "5px" }}
                variant="danger"
                onClick={removeLink}
              >
                Remove
              </Button>
            </Card.Body>
          </Card>
          <Card border="primary">
            <Card.Header>Other Crypto Addresses</Card.Header>
            <Card.Body className="crypto-address-area">
              {generateAddressTable()}

              <Button className="mt-10" variant="success" onClick={addAddress}>
                +Add
              </Button>
              <Button
                className="mt-10 ml-5"
                variant="danger"
                onClick={removeAddress}
              >
                Remove
              </Button>
              <Button
                className="mt-10 ml-5"
                variant="success"
                onClick={addCustomAddress}
              >
                Add Custom Address
              </Button>
            </Card.Body>
          </Card>
          <Form.Group
            className="mb-3"
            controlId="formBasicCheckbox"
          ></Form.Group>
          <CodeMirror
            value={code}
            options={{
              theme: "material",
              lineNumbers: true,
            }}
            onChange={(editor, data, value) => {
              setCode(value);
            }}
          />
          <Button variant="primary" type="submit" className="mt-10">
            Update
          </Button>
        </Form>
      )}
    </div>
  );
};

export default UpdateDid;
