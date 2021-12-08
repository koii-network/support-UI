import React from "react";
import Sidebar from "theme/sidebar";
import { tools, arweave } from "../../services/KOII";
import { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import ReactJson from "react-json-view";
const AttentionState = () => {
  const [attentionState, setAttentionState] = useState(null);

  function onclickHandler(e) {
    fetch("https://mainnet.koii.live/attention")
      .then((res) => res.json())
      .then(setAttentionState);
  }
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-2 ">
            <Sidebar></Sidebar>
          </div>
          <div className="col-md-6">
            <h3>Get Attention State</h3>

            <Button onClick={onclickHandler} className="mt-2" variant="primary">
              Get State
            </Button>
            {/* <JSONPretty className='mt-3' id="json-pretty" data={trxStatus} theme={monikai}></JSONPretty> */}

            {}
            {attentionState ? (
              <ReactJson
                collapsed={true}
                style={{
                  marginTop: "5px",
                  minWidth: "1200px",
                  minHeight: "200px",
                }}
                src={attentionState}
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

export default AttentionState;
