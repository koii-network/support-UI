import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Sidebar from "./components/sidebar/index";
import Balance from "./components/checkBalance/index";
import TransactionStatus from './components/TransactionStatus';
import OwnersNFTs from './components/ownersNFTs';
import KoiiState from './components/koiiState';
import AttentionState from './components/attentionState';
import SendKOII from './components/sendKOII';
import SendA from './/components/sendAr';
import SendAr from ".//components/sendAr";
import NFTState from './components/nftState';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={Balance}></Route>
          <Route path="/transaction-status" component={TransactionStatus}></Route>
          <Route path="/get-nfts" component={OwnersNFTs}></Route>
          <Route path="/Koii-State" component={KoiiState}></Route>
          <Route path="/attention-State" component={AttentionState}></Route>
          <Route path="/nft-state" component={NFTState}></Route>
          <Route path="/send-koii" component={SendKOII}></Route>
          <Route path="/send-ar" component={SendAr}></Route>
          <Route path="/send-ar" component={SendAr}></Route>

      
        </Switch>

      </div>
    </Router>
  );
}

export default App;
