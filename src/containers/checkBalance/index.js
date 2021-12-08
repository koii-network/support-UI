import React from "react";
import Sidebar from "theme/sidebar";
import { tools, arweave } from "../../services/KOII";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";
const Balance = () => {
  const [userAddress, setUserAddress] = useState("");
  const [arBalance, setUserBalance] = useState("");
  const [koiiBalance, setKoiiBalance] = useState("");
  function getUserBalance() {
    if(userAddress) {
      arweave.wallets.getBalance(userAddress).then((balance) => {
        setUserBalance(arweave.ar.winstonToAr(balance));
      });
      tools.getKoiiState().then((state) => {
        if (userAddress !== undefined && userAddress in state.balances)
          setKoiiBalance(state.balances[userAddress]);
        else setKoiiBalance(0);
      });
    }else{

    }
  }
  function addressChangeHandler(e) {
    // console.log(e.target.value);
    setUserAddress(e.target.value);
  }
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-3 col-md-offset-12">
            <Sidebar></Sidebar>
          </div>
          <div className="col-md-6">
            <div className="page-title">Get Balance</div>
            <Form.Group className="mb-3 mt-20" controlId="formBasicEmail">
              <Form.Label>Enter User Arweave Address</Form.Label>
              <Form.Control
                onChange={addressChangeHandler}
                type="email"
                placeholder="User Address"
                className="mt-10"
              />
              <Button
                onClick={getUserBalance}
                className="mt-20"
                variant="success"
              >
                Get balance
              </Button>
              <div className="mt-20 lbl1 d-flex">{arBalance && <div className="lbl-balance">{arBalance}</div>} AR</div>
              <div className="mt-10 lbl1 d-flex">{koiiBalance && <div className="lbl-balance">{koiiBalance}</div>}KOII</div>
            </Form.Group>
          </div>
        </div>
      </div>
    </>
  );
};

export default Balance;
