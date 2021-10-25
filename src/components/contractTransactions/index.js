import React from "react";
import Sidebar from "../sidebar";
import { tools, arweave } from "../../services/KOII";
import { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import ReactJson from "react-json-view";

const ContractTransactions = () => {
  const [defaultContract, setDefaultContract] = useState(null);
  const [transactions, setTransactions] = useState(null);
  let contracts = "";

  tools.getAttentionId().then((e) => {
    contracts = tools.contractId + ", " + e;
    setDefaultContract(contracts);
  });

  function getTransactions(e) {
    const queryContracts = JSON.stringify(contracts.split(","));
    const query = `query{transactions(first:100,tags:[{name:"App-Name",values:["SmartWeaveAction"]},{name:"Contract",values:${queryContracts}}]){edges{node{id block{height}}}}}`;
    tools.gql(JSON.stringify({query})).then((f) => {
      setTransactions(f.data.transactions.edges);
    }).catch(alert);
  }

  function contractChangeHandler(e) {
    contracts = e.target.value;
  }

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-2 col-md-offset-12">
            <Sidebar></Sidebar>
          </div>
          <div className="col-md-6">
            <h3>Get KOII State</h3>
            <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Contract IDs (comma separated)</Form.Label>
              <Form.Control
                onChange={contractChangeHandler}
                as="textarea"
                placeholder="Contract IDs"
                defaultValue={defaultContract}
              />
              <Button
                onClick={getTransactions}
                className="mt-2"
                variant="primary"
                type="submit"
              >
                Get Transactions
              </Button>
            </Form.Group>
            {transactions ? (
              <ReactJson
                collapsed={false}
                style={{ marginTop: "5px",minWidth:"1200px",minHeight:"200px" }}
                src={transactions}
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

export default ContractTransactions;
