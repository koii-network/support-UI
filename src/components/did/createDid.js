import React, { useState, useRef, useEffect } from "react";
import { Form, Button, Card, Row, Col, Modal } from "react-bootstrap";
import Select from "react-select";
import { UnControlled as CodeMirror } from "react-codemirror2";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/mode/css/css";
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
const CreateDid = () => {
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
  const [code, setCode] = useState("");

  function handleLinkChange(id, value) {
    // console.log(id, value);
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
              onChange={(e) => {
                handleLinkChange(e.target.id, e.target.value);
              }}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3" controlId={`v-${i}`}>
            <Form.Label>URL</Form.Label>
            <Form.Control
              type="text"
              required
              placeholder="e.g https://linked.com/Arnald"
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
    let adds = [...addresses];
    adds.push({
      name: "",
      value: "",
      type: "custom",
    });
    setAddresses(adds);
  };
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
            // value={selectedOption}
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
  const inputValidation = (str) => {
    let prefix = 'https://viewblock.io/arweave/tx/';
    return str.startsWith(prefix)
  }
  function onSubmit(e) {
    e.preventDefault();
    if(!(window.koiiWallet && window.koiiWallet.createDID )){
      handleShow("Install Finne wallet or update it to latest version")
      return
    }
    let state = {...didState}
    if(!inputValidation(state.picture)) {
      handleShow("Please input valid arweave tx ID for profile image")
      return
    }
    if(!inputValidation(state.banner)) {
      handleShow("Please input valid arweave tx ID for banner image")
      return
    }
    try {
      state.style = parseCss(code);
    } catch (e) {
      state.styles = {};
    }
    state.code = code;
    let newAddresses = {};
    addresses.forEach(function (address) {
      if (address.name !== "" && address.value !== "") {
        newAddresses[`${address.name.toLowerCase()}`] = address.value;
      }
    });
    state.addresses = newAddresses;
    console.error(state);
    return false;
    // window.koiiWallet.createDID(didState).then((txId) => {
    // console.log(txId);
    // burnKOIIAndMigrateContent(txId)
    // setDidId(txId.data);
    // });
  }

  return (
    <div>
      <h3>Create DID</h3>
      {error ? (
        <Error
          show={show}
          message={error}
          handleClose={handleClose}
          handleShow={handleShow}
        ></Error>
      ) : (
        ""
      )}

      <Form onSubmit={onSubmit}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
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
          {/* Addresses */}
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

        <Form.Group className="mb-3" controlId="formBasicCheckbox"></Form.Group>
        {/* <Editor
          value={code}
          onValueChange={setCode}
          highlight={(code) => highlight(code, languages.css)}
          padding={10}
          style={{
            fontFamily: '"Fira code", "Fira Mono", monospace',
            fontSize: 12,
          }}
        /> */}
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
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      {didId ? (
        <h3>
          DID Deployed. see your did at <code>https://arweave.net/{didId}</code>
        </h3>
      ) : (
        ""
      )}
    </div>
  );
};

export default CreateDid;
