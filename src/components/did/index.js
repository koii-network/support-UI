import React, { useState } from "react";
import Sidebar from "../sidebar";
import { Form, Button, Tabs, Tab } from "react-bootstrap";
import did from "DID-SDK";
import CreateDid from "./createDid";

const DID = () => {
  const [key, setKey] = useState("create");
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-2 ">
            <Sidebar></Sidebar>
          </div>
          <div className="col-md-6">
            <Tabs
              id="controlled-tab-example"
              activeKey={key}
              onSelect={(k) => setKey(k)}
              className="mb-3"
            >
              <Tab eventKey="create" title="Home">

              </Tab>
              <Tab eventKey="update" title="Profile">
                <h1>hello</h1>
              </Tab>
            </Tabs>
            {key==="create"?(<CreateDid></CreateDid>):""}
          </div>
        </div>
      </div>
    </>
  );
};

export default DID;
