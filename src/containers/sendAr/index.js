import React from "react";
import Sidebar from "theme/sidebar";
import { tools } from "../../services/KOII";
import { useState } from "react";
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
          <div className="col-md-3 col-md-offset-12">
            <Sidebar></Sidebar>
          </div>
          <div className="col-md-6">
            <div className="page-title">Send AR</div>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="mt-20">Enter User Arweave Address</Form.Label>
              <Form.Control
                onChange={addressChangeHandler}
                type="email"
                placeholder="User Address"
                className="mt-10"
              />
              <Form.Label className="mt-20">Enter Quantity</Form.Label>
              <Form.Control
                onChange={qtyChangeHandler}
                type="email"
                placeholder="Quantity"
                className="mt-10"
              />
              <Button onClick={sendKOII} className="mt-20" variant="primary">
                Send AR
              </Button>
            </Form.Group>
            {trxId?(<p className="mt-20">Ar sent your trxId is {trxId}</p>):""}
          </div>
        </div>
      </div>
    </>
  );
};

export default SendAr;
