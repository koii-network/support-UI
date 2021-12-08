import React from "react";
import Sidebar from "theme/sidebar";
import { tools } from "../../services/KOII";
import { useState } from "react";
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
          <div className="col-md-3">
            <Sidebar></Sidebar>
          </div>
          <div className="col-md-6">
            <div className="page-title">Get KOII State</div>
            <Form.Group controlId="formBasicEmail">
              <Form.Label className="mt-20">Enter NFT address</Form.Label>
              <Form.Control
                onChange={addressChangeHandler}
                type="email"
                placeholder="User Address"
                className=""
              />
              <div className="row">
                <div className="col-md-6">
                  <Form.Label className="mt-10">Enter Quantity</Form.Label>
                </div>
              </div>
              
              <div className="col-md-6">
                <Button
                  onClick={onclickHandler}
                  className="mt-20"
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
                  marginTop: "20px",
                  minWidth: "600px",
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
