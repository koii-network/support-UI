import React, { useState } from "react";
import Sidebar from "theme/sidebar";
import { Tabs, Tab } from "react-bootstrap";
import CreateDid from "./createDid";
import UpdateDid from './updateDid';

const DID = () => {
  const [key, setKey] = useState("create");
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <Sidebar></Sidebar>
          </div>
          <div className="col-md-6">
            <div className="page-title">DID</div>
            <Tabs
              id="controlled-tab-example"
              activeKey={key}
              onSelect={(k) => setKey(k)}
              className="mb-3 mt-20"
            >
              <Tab eventKey="create" title="Create DID" />
              <Tab eventKey="update" title="Update DID" />
            </Tabs>
            {key==="update"?(<UpdateDid />):<CreateDid />}
          </div>
        </div>
      </div>
    </>
  );
};

export default DID;
