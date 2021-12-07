import "./style.css";
import React from "react";
import { Nav } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
function Sidebar() {
  return (
    <>
      <Nav
        className="col-md-2 d-none d-md-block  sidebar"
      >
        <div className="sidebar-sticky">
          <h3 className="font-main" style={{  fontSize: "20px" }}>
            KOII Support Actions
          </h3>
        </div>
        <Nav.Item>
          <NavLink activeClassName="active" to="/">
          <li className="list-group-item list-group-item-primary">Get Balance</li>
          </NavLink>
        </Nav.Item>
        <Nav.Item>
          <NavLink activeClassName="active" to="transaction-status">
          <li className="list-group-item list-group-item-primary">Get Transaction State</li>
          </NavLink>
        </Nav.Item>
        <Nav.Item>
          <NavLink activeClassName="active" to="get-nfts">
          <li className="list-group-item list-group-item-primary">Get Owner's NFT</li>
          </NavLink>
        </Nav.Item>
        <Nav.Item>
          <NavLink activeClassName="active" to="Koii-State">
          <li className="list-group-item list-group-item-primary">Get KOII State</li>
          </NavLink>
        </Nav.Item>
        <Nav.Item>
          <NavLink activeClassName="active" to="attention-State">
          <li className="list-group-item list-group-item-primary">Get Attention State</li>
          </NavLink>
        </Nav.Item>
        <Nav.Item>
          <NavLink activeClassName="active" to="nft-state">
          <li className="list-group-item list-group-item-primary">Get NFT State</li>
          </NavLink>
        </Nav.Item>
        <Nav.Item>
          <NavLink activeClassName="active" to="send-koii">
          <li className="list-group-item list-group-item-primary">Send KOII</li>
          
          </NavLink>
        </Nav.Item>
        <Nav.Item>
          <NavLink activeClassName="active" to="/send-ar">
          <li className="list-group-item list-group-item-primary">Send AR</li>
          </NavLink>
        </Nav.Item>

        <Nav.Item>
          <NavLink activeClassName="active" to="/bridge-info">
          <li className="list-group-item list-group-item-primary">Bridge Info</li>
          </NavLink>
        </Nav.Item>
        <Nav.Item>
          <NavLink activeClassName="active" to="/contract-transactions">
          <li className="list-group-item list-group-item-primary">Contract Transactions</li>
          </NavLink>
          <NavLink activeClassName="active" to="/did">
          <li className="list-group-item list-group-item-primary">DIDs</li>
          </NavLink>
        </Nav.Item>
      </Nav>
    </>
  );
}

export default Sidebar;
