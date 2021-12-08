import React from "react";
import Sidebar from "theme/sidebar";
import { tools } from "../../services/KOII";
import { useState } from "react";
import { Button } from "react-bootstrap";
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
          <div className="col-md-3 col-md-offset-12">
            <Sidebar></Sidebar>
          </div>
          <div className="col-md-6">
            <div className="page-title">Get KOII State</div>
            <Button onClick={onclickHandler} className="mt-20" variant="primary">
              Get State
            </Button>
            {/* <JSONPretty className='mt-3' id="json-pretty" data={trxStatus} theme={monikai}></JSONPretty> */}

            {}
            {koiiState ? (
              <ReactJson
                collapsed={true}
                style={{ marginTop: "20px",minHeight:"200px" }}
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
