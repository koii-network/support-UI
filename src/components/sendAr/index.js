import React from "react";
import Sidebar from "../sidebar";
import { tools, arweave } from "../../services/KOII";
import { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";

const SendAr = () => {
  const [userAddress, setUserAddress] = useState("");
  const [qty, setQty] = useState(0);
  const [trxId, setTrxId] = useState(null);

  async function sendKOII() {
    await window.koiiWallet.connect();
    tools.transfer(qty, userAddress, "AR").then(setTrxId);
  }
  function addressChangeHandler(e) {
    setUserAddress(e.target.value);
  }
  function qtyChangeHandler(e) {
    setQty(e.target.value);
  }
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-2 col-md-offset-12">
            <Sidebar></Sidebar>
          </div>
          <div className="col-md-6">
            <h3>Send AR</h3>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Enter User Arweave Address</Form.Label>
              <Form.Control
                onChange={addressChangeHandler}
                type="email"
                placeholder="User Address"
              />
              <Form.Label>Enter Quantity</Form.Label>
              <Form.Control
                onChange={qtyChangeHandler}
                type="email"
                placeholder="Quantity"
              />
              <Button onClick={sendKOII} className="mt-2" variant="primary">
                Send AR
              </Button>
            </Form.Group>
            {trxId?(<p>Ar sent your trxId is {trxId}</p>):""}
          </div>
        </div>
      </div>
    </>
  );
};

export default SendAr;
