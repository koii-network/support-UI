import React, { useState } from "react";
import Sidebar from "../sidebar";
import { Form, Button, Tabs, Tab } from "react-bootstrap";
import CreateDid from "./createDid";
import UpdateDid from './updateDid';

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
              <Tab eventKey="create" title="Create DID">
            

              </Tab>
              <Tab eventKey="update" title="Update DID">
              </Tab>
            </Tabs>
              {key==="update"?(<UpdateDid></UpdateDid>):<CreateDid></CreateDid>}
          </div>
        </div>
      </div>
    </>
  );
};

export default DID;
