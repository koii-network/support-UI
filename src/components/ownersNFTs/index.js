import React from "react";
import Sidebar from "../sidebar";
import { tools, arweave } from "../../services/KOII";
import { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import ReactJson from "react-json-view";
const OwnersNFTs = () => {
  const [ownerAddress, setOwnerAddress] = useState("");
  const [nfts, setNfts] = useState("");

  function getNfts() {
    tools
      .getNftIdsByOwner(ownerAddress)
      .then((res) => {
        console.log(res);
        setNfts(res);
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
    setOwnerAddress(e.target.value);
  }
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-2 col-md-offset-12">
            <Sidebar></Sidebar>
          </div>
          <div className="col-md-6">
            <h3>Get NFTs Owned by a User</h3>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Enter Owner's Wallet address </Form.Label>
              <Form.Control
                onChange={trxChangeHandler}
                type="email"
                placeholder="Owner's Wallet address "
              />
              <Button
                onClick={getNfts}
                className="mt-2"
                variant="primary"
              >
                Get NFTs
              </Button>
              {nfts ? (
              <ReactJson
                collapsed={true}
                groupArraysAfterLength={2}
                style={{ marginTop: "5px",minWidth:"1200px",minHeight:"200px" }}
                src={nfts}
                defaultValue={{}}
                displayDataTypes={false}
                theme="chalk"
              />
            ) : (
              ""
            )}
            </Form.Group>
          </div>
        </div>
      </div>
    </>
  );
};

export default OwnersNFTs;
