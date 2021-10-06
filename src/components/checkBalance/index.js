import React from "react";
import Sidebar from "../sidebar";
import { tools, arweave } from "../../services/KOII";
import { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
const Balance = () => {
  const [userAddress, setUserAddress] = useState("");
  const [ArBalance, setUserBalance] = useState("");
  const [koiiBalance, setKoiiBalance] = useState("");
  function getUserBalance() {
    arweave.wallets
      .getBalance(userAddress)
      .then((balance) => {
        setUserBalance(arweave.ar.winstonToAr(balance));
      });
    tools.getKoiiState().then((state) => {
        console.log(state.balances)
      if (userAddress !== undefined && userAddress in state.balances)
        setKoiiBalance( state.balances[userAddress]);
      setKoiiBalance(0);
    });
  }
  function addressChangeHandler(e) {
    console.log(e.target.value);
    setUserAddress(e.target.value);
  }
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-1 col-md-offset-12">
            <Sidebar></Sidebar>
          </div>
          <div className="col-md-6">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Enter User Arweave Address</Form.Label>
              <Form.Control
                onChange={addressChangeHandler}
                type="email"
                placeholder="User Address"
              />
              <Button
                onClick={getUserBalance}
                className="mt-2"
                variant="primary"
              >
                Get balance
              </Button>
              <h3>{ArBalance}-AR</h3>
              <h3>{koiiBalance}</h3>
            </Form.Group>
          </div>
        </div>
      </div>
    </>
  );
};

export default Balance;
