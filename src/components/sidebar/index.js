import "./style.css";
import React from "react";
import { Nav } from "react-bootstrap";
import { withRouter } from "react-router";
function Sidebar() {
  return (
    <>
      <Nav
        className="col-md-2 d-none d-md-block bg-dark sidebar"
        activeKey="/home"
      >
        <div className="sidebar-sticky">
          <h3 style={{color:"white",fontSize:"20px"}}>KOII Support Actions</h3>
        </div>
        <Nav.Item>
          <Nav.Link href="/">Get Balance</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link active href="/transaction-status">
            Get Transaction Status
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/get-nfts">Get Owner's NFTs</Nav.Link>
        </Nav.Item>
        <Nav.Link href="/get-nfts">Get Owner's NFTs</Nav.Link>
        <Nav.Item></Nav.Item>
      </Nav>
    </>
  );
}

export default Sidebar;
