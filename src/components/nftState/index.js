import React from "react";
import Sidebar from "../sidebar";
import { tools, arweave } from "../../services/KOII";
import { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import ReactJson from "react-json-view";

const NFTState = () => {
  const [NFTState, setNFTState] = useState(null);
  const [NFTAddress, setNFTAddress] = useState("");

  function onclickHandler(e) {
    tools.getNftState(NFTAddress).then(setNFTState);
  }
  function addressChangeHandler(e) {
    setNFTAddress(e.target.value);
  }
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-2 ">
            <Sidebar></Sidebar>
          </div>
          <div className="col-md-6">
            <h3>Get KOII State</h3>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Enter NFT address</Form.Label>
              <Form.Control
                onChange={addressChangeHandler}
                type="email"
                placeholder="User Address"
              />
              <div className="row">
                <div className="col-md-3">
                  <Form.Label>Enter Quantity</Form.Label>
                </div>
              </div>
              
              <div className="col-md-3">
                <Button
                  onClick={onclickHandler}
                  className="mt-2"
                  variant="primary"
                >
                  Get NFT state
                </Button>
              </div>
            </Form.Group>
            {NFTState ? (
              <ReactJson
                collapsed={true}
                style={{
                  marginTop: "5px",
                  minWidth: "1200px",
                  minHeight: "200px",
                }}
                src={NFTState}
                defaultValue={{}}
                displayDataTypes={false}
                theme="chalk"
              />
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default NFTState;
