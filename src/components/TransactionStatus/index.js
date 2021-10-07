import React from "react";
import Sidebar from "../sidebar";
import { tools, arweave } from "../../services/KOII";
import { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import JSONPretty from 'react-json-pretty';
import monikai from 'react-json-pretty/themes/monikai.css';
import ReactJson from 'react-json-view'
const TransactionStatus = () => {
  const [trxId, setTrxId] = useState("");
  const [trxStatus, setTrxStatus] = useState("");
  const [koiiBalance, setKoiiBalance] = useState("");
  function getTransactionIdStatus() {
    arweave.transactions
      .getStatus(trxId)
      .then((res) => {
        console.log(res);
        setTrxStatus(res)
        // {
        //  status: 200,
        //  confirmed: {
        //    block_height: 140151,
        //    block_indep_hash: 'OR1wue3oBSg3XWvH0GBlauAtAjBICVs2F_8YLYQ3aoAR7q6_3fFeuBOw7d-JTEdR',
        //    number_of_confirmations: 20
        //  }
        //}
      });
  }
  function trxChangeHandler(e) {
    console.log(e.target.value);
    setTrxId(e.target.value);
  }
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-2 col-md-offset-12">
            <Sidebar></Sidebar>
          </div>
          <div className="col-md-6">
              <h3>Get transaction Status</h3>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Enter transaction Id</Form.Label>
              <Form.Control
                onChange={trxChangeHandler}
                type="email"
                placeholder="Transaction Id"
              />
              <Button
                onClick={getTransactionIdStatus}
                className="mt-2"
                variant="primary"
              >
                Get Status
              </Button>
              {/* <JSONPretty className='mt-3' id="json-pretty" data={trxStatus} theme={monikai}></JSONPretty> */}
              {}
              <ReactJson style={{marginTop:"5px"}} src={trxStatus} defaultValue={{}} theme="chalk" />
            </Form.Group>
          </div>
        </div>
      </div>
    </>
  );
};

export default TransactionStatus;
