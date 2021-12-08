import React from "react";
import Sidebar from "theme/sidebar";
import { tools } from "../../services/KOII";
import { useState } from "react";
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
          <div className="col-md-3 col-md-offset-12">
            <Sidebar></Sidebar>
          </div>
          <div className="col-md-6">
            <div className="page-title">Get NFTs Owned by a User</div>
            <Form.Group className="mb-3 mt-20" controlId="formBasicEmail">
              <Form.Label>Enter Owner's Wallet address </Form.Label>
              <Form.Control
                onChange={trxChangeHandler}
                type="email"
                placeholder="Owner's Wallet address"
                className="mt-10"
              />
              <Button
                onClick={getNfts}
                className="mt-20"
                variant="primary"
              >
                Get NFTs
              </Button>
              {nfts ? (
              <ReactJson
                collapsed={true}
                style={{ marginTop: "20px",minWidth:"1200px",minHeight:"200px" }}
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
