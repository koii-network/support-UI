import React from "react";
import Sidebar from "../sidebar";
import { tools, arweave } from "../../services/KOII";
import { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import JSONPretty from "react-json-pretty";
import monikai from "react-json-pretty/themes/monikai.css";
import ReactJson from "react-json-view";
const KoIIState = () => {
  const [koiiState, setKoiiState] = useState(null);

  function onclickHandler(e) {
    tools.getKoiiState().then(setKoiiState);
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
            {/* <JSONPretty className='mt-3' id="json-pretty" data={trxStatus} theme={monikai}></JSONPretty> */}

            {}
            {koiiState ? (
              <ReactJson
                collapsed={true}
                groupArraysAfterLength={2}
                style={{ marginTop: "5px",minWidth:"1200px",minHeight:"200px" }}
                src={koiiState}
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

export default KoIIState;
