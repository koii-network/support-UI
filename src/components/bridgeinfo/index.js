import React from "react";
import Sidebar from "../sidebar";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import ReactJson from 'react-json-view'

const BridgeInfo = () => {
  const [trxStatus, setTrxStatus] = useState("");
  const [NFTid, setNFTid] = useState("");
  const [ARaddress, setARaddress] = useState("");
  const [burnKOII, setburnKOII] = useState("");
  const [locked, setlocked] = useState("");

  async function Getinfo() {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            arNFTId: NFTid,
            arUserAddress: ARaddress,
            burnKOItx: burnKOII,
            lockedNFTtx: locked
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
  function ARaddressChangeHandler(e) {
    setARaddress(e.target.value);
  }
  function burnKOIIChangeHandler(e) {
    setburnKOII(e.target.value);
  }
  function lockedChangeHandler(e) {
    setlocked(e.target.value);
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
              <Form.Label>Enter AR NFT id</Form.Label>
              <Form.Control
                onChange={NFTidChangeHandler}
                type="email"
                placeholder="arNFTId"
              />
              <Form.Label>Enter AR user address</Form.Label>
              <Form.Control
                onChange={ARaddressChangeHandler}
                type="email"
                placeholder="arUserAddress"
              />
              <Form.Label>Enter Burn KOII tx id</Form.Label>
              <Form.Control
                onChange={burnKOIIChangeHandler}
                type="email"
                placeholder="burnKOItx"
              />
              <Form.Label>Enter locked NFT tx id</Form.Label>
              <Form.Control
                onChange={lockedChangeHandler}
                type="email"
                placeholder="lockedNFTtx"
              />
              <Button onClick={Getinfo} className="mt-2" variant="primary">
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
