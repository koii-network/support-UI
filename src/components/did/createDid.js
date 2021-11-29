import React, { useState, useRef, useEffect } from "react";
import {
  Form,
  Button,
  Card,
  Row,
  Col,
  Modal
} from "react-bootstrap";
import Select from 'react-select';
import { UnControlled as CodeMirror } from "react-codemirror2";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/mode/css/css";
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
const CreateDid = () => {
  const [didState, setDidState] = useState({
    links: [
      {
        title: "",
        link: "",
      },
    ],
  });
  const [linkState, setLinkState] = useState({});
  const [linkCount, setLinkCount] = useState(1);
  const [addressCount, setAddressCount] = useState(1);
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [didId, setDidId] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [currencies, setCurrencies] = useState([
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
  ]);
  const [code, setCode] = useState(
    "body{\n    color:white;\n  }\n  header{\n font-size:30px;\n}"
  );
  function handleLinkChange(id, value) {
    console.log(id, value);
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

    // setLinkState(
    //   {
    //     ...linkState,
    //     [id]: value,
    //   },
    //   () => {
    //     let links = [...didState.links];
    //     links[id] = value;
    //     setDidState([links])
    //   }
    // );

    // setLinkState({
    //     didState.links[2].title:2
    // })
  }
  function getUsedCurrencies(){
    let c = []
    for(let i=0;i<addresses.length;i++){
      c.push(addresses[i]["name"])
    }

  }
  function handleAddressChange(id, value) {
    console.log(id, value);
    let dupAddresses = JSON.parse(JSON.stringify(addresses))
    let [prop, index] = id.split("-");
    let address = {}

      if (addresses[index]) {
         address = dupAddresses[index];
        if (prop === "ta") {
          address.name = value;
        } else if (prop === "va") {
          address.value = value;
        }
      } else {
        address = {};
        if (prop === "ta") {
          address.name = value;
        } else if (prop === "va") {
          address.value = value;
        }
        dupAddresses.push(address)

      }
      setAddresses(dupAddresses)
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
  function addAddress() {
    // let links = [...didState.links];
    // links.push({
    //   title: "",
    //   link: "",
    // });
    // setDidState({ ...didState, links });
    setAddressCount(addressCount + 1);
  }
  function removeAddress() {
    if (addressCount < 2) {
      handleShow("You can must add an address");
    } else {
      setAddressCount(addressCount - 1);
    }
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
              value={linkState?.i?.title}
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
              value={linkState?.i?.value}
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
  const getUpdatedCurrencies = () => {
    const renderCurrencies = []
    renderCurrencies.push(<option selected={false} disabled={true} key={-1}></option>)
    currencies.forEach((cur, i) => {
      if (addresses.findIndex(k => k.name === cur) === -1)
        renderCurrencies.push(<option key={i}>{cur}</option>)
      // else 
      //   renderCurrencies.push(<option key={i} disabled={true}>{cur}</option>)
    })
    console.log(renderCurrencies)
    return renderCurrencies;
    // return currencies.map((e) => (
    //   if (addresses.findIndex(k => k.name === e) === -1)
    //   return (<option>{e}</option>)
    // ))
  }
  function getAddressItem(i) {
    return (
      <Row key={i}>
        <Col>
          <Form.Label>Currency</Form.Label>
          <select
            className="form-control"
            id={`ta-${i}`}
            onChange={(e) => {
              handleAddressChange(e.target.id, e.target.value);
            }}
          >
            {getUpdatedCurrencies(i)}
          </select>
        </Col>
        <Col>
          <Form.Group className="mb-3" controlId={`va-${i}`}>
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              required
              placeholder="0x000000000000000"
              value={linkState?.i?.value}
              onChange={(e) => {
                handleAddressChange(e.target.id, e.target.value);
              }}
            />
          </Form.Group>
        </Col>
      </Row>
    );
  }
  function generateAddressTable() {
    const items = [];
    for (let i = 0; i < addressCount; i++) {
      items.push(getAddressItem(i));
    }
    return items;
  }
  function inputHandler(id, value) {
    setDidState({
      ...didState,
      [id]: value,
    });
  }
  function submit(e) {
    e.preventDefault();
    let state = JSON.parse(JSON.stringify(didState));
    state.css = code;
    console.error(state);
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

      <Form onSubmit={submit}>
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
          <Card.Body>
            {generateAddressTable()}

            <Button variant="success" onClick={addAddress}>
              +Add
            </Button>
            <Button
              style={{ marginLeft: "5px" }}
              variant="danger"
              onClick={removeAddress}
            >
              Remove
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
