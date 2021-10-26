import React from "react";
import Sidebar from "../sidebar";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import ReactJson from 'react-json-view'

const BridgeInfo = () => {
  const [trxStatus, setTrxStatus] = useState("");
  const [NFTid, setNFTid] = useState("");
  const [ETHid, setETHid] = useState("");

  async function GetARinfo() {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            arNFTId: NFTid,
        })
    };
    fetch('https://devbundler.openkoi.com:8885/fetchBridgeDetails', requestOptions)
    .then(response => response.json())
    .then((data) => {
        console.log(data);
        setTrxStatus(data)
     });
  }
  async function GetETHinfo() {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          ethereumNFTId: ETHid,
        })
    };
    fetch('https://devbundler.openkoi.com:8885/fetchBridgeDetails', requestOptions)
    .then(response => response.json())
    .then((data) => {
        console.log(data);
        setTrxStatus(data)
     });
  }
  function NFTidChangeHandler(e) {
    setNFTid(e.target.value);
  }
  function ETHidChangeHandler(e) {
    setETHid(e.target.value);
  }
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-2 col-md-offset-12">
            <Sidebar></Sidebar>
          </div>
          <div className="col-md-6">
            <h3>Bridge Information</h3>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Check AR to ETH</Form.Label>
              <Form.Control
                onChange={NFTidChangeHandler}
                type="email"
                placeholder="Enter AR NFT id"
              />
              <Button onClick={GetARinfo} className="mt-2" variant="primary">
                Get info
              </Button>
              <br></br>
              <br></br>
              <Form.Label>Check ETH to AR</Form.Label>
              <Form.Control
                onChange={ETHidChangeHandler}
                type="email"
                placeholder="Enter ETH id"
              />
              <Button onClick={GetETHinfo} className="mt-2" variant="primary">
                Get info
              </Button>
              <ReactJson style={{marginTop:"5px"}} src={trxStatus} defaultValue={{}} theme="chalk" />
            </Form.Group>
          </div>
        </div>
      </div>
    </>
  );
};

export default BridgeInfo;
