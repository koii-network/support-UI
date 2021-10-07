import React from "react";
import Sidebar from "../sidebar";
import { tools, arweave } from "../../services/KOII";
import { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import ReactJson from "react-json-view";

const NFTState = () => {
  const [NFTState, setNFTState] = useState(null);

  function onclickHandler(e) {
    tools.getNftState().then(setNFTState);
  }
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-2 ">
            <Sidebar></Sidebar>
          </div>
          <div className="col-md-6">
            <h3>Get KOII State</h3>

            <Button onClick={onclickHandler} className="mt-2" variant="primary">
              Get State
            </Button>
            {NFTState ? (
              <ReactJson
                collapsed={true}
                groupArraysAfterLength={2}
                style={{ marginTop: "5px",minWidth:"1200px",minHeight:"200px" }}
                src={NFTState}
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

export default NFTState;
