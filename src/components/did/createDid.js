import React, { useState, useRef, useEffect } from "react";
import { Form, Button, Card, Row, Col, Modal } from "react-bootstrap";
import {createDID} from 'DID-SDK';
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
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
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
  function inputHandler(id, value) {
    setDidState({
      ...didState,
      [id]: value,
    });
  }
  function submit(e) {
    e.preventDefault();
    createDID(didState).then((txId)=>{
        alert(txId);
        console.log(txId)
    });
    alert("ss")

  }

  return (
    <div>
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
            onChange={(e) => {
              inputHandler(e.target.id, e.target.value);
            }}
            placeholder="Enter your good name"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control type="text" placeholder="Enter Description" onChange={(e) => {
              inputHandler(e.target.id, e.target.value);
            }} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="picture">
          <Form.Label>Profile Picture transaction Id</Form.Label>
          <Form.Control type="text" placeholder="Enter Profile Picture Tx Id" onChange={(e) => {
              inputHandler(e.target.id, e.target.value);
            }} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="banner">
          <Form.Label>banner Picture transaction Id</Form.Label>
          <Form.Control type="text" placeholder="Enter banner image Tx Id" onChange={(e) => {
              inputHandler(e.target.id, e.target.value);
            }} />
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
                    <Form.Label>Titleeeeee</Form.Label>
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
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button variant="primary"  type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default CreateDid;
