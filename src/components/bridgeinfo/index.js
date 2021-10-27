import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import ReactJson from 'react-json-view';
import ReactTooltip from 'react-tooltip';
import Sidebar from "../sidebar";

const BridgeInfo = () => {
  const [trxStatus, setTrxStatus] = useState("");
  const [NFTid, setNFTid] = useState("");

  async function Getinfo() {
    if (NFTid.length === 43) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          arNFTId: NFTid,
        })
    };
    fetch('https://devbundler.openkoi.com:8885/fetchBridgeDetails', requestOptions)
    .then(response => response.json())
    .then((data) => {
        console.log(data);
        setTrxStatus(data)
     });
    } else {
      var index = NFTid.lastIndexOf("\/");
      const ETHid = NFTid.substring(index + 1,NFTid.length);
      console.log(ETHid)
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          ethereumNFTId: ETHid,
        })
    };
    fetch('https://devbundler.openkoi.com:8885/fetchBridgeDetails', requestOptions)
    .then(response => response.json())
    .then((data) => {
        console.log(data);
        setTrxStatus(data)
     });
    }
}
  function NFTidChangeHandler(e) {
    setNFTid(e.target.value);
  }
  
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-2 col-md-offset-12">
            <Sidebar></Sidebar>
          </div>
          <div className="col-md-6">
            <h3>Bridge Lookup</h3>
            <h5>The bridge lookup is where you can find any NFT that has crossed a Koii Bridge.</h5>
            <h5>You can see its origins and its path across the decentralized web, and the stones it has stepped on along the way.</h5>
            <br></br>
            <br></br>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>
              Use
              <spam data-tip data-for="opensea"> opensea url<i class="far fa-question-circle"></i> </spam>
              <ReactTooltip id='opensea'>
              <div>The opensea url is the link of your NFT on opensea</div>
              <img src="opensea.png"  width="500px" />              
              </ReactTooltip> 
              or  
              <spam data-tip data-for="ar"> Koii NFT id<i class="far fa-question-circle"></i></spam>
              <ReactTooltip id='ar'> 
              <div>You could find it in your Finnie or Koi.rocks content.<br/> Click the "Share" button and after the last "/"(it has 43 characters) is your NFT id</div>
              <img src="ar.png"  width="500px" />              
              </ReactTooltip> 
             

                </Form.Label>
              <Form.Control
                onChange={NFTidChangeHandler}
                type="email"
                placeholder='"https://opensea.io/assets/..." or "qwerty12345..."'
              />
              <Button onClick={Getinfo} className="mt-2" variant="primary">
                Get your NFT bridge info
              </Button>
              <ReactJson style={{marginTop:"5px"}} src={trxStatus} defaultValue={{}} theme="chalk" />
            </Form.Group>
          </div>
        </div>
      </div>
    </>
  );
};

export default BridgeInfo;
