import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import Balance from "./components/checkBalance/index";
import TransactionStatus from './components/TransactionStatus';
import OwnersNFTs from './components/ownersNFTs';
import KoiiState from './components/koiiState';
import AttentionState from './components/attentionState';
import SendKOII from './components/sendKOII';
import SendAr from ".//components/sendAr";
import NFTState from './components/nftState';
import BridgeInfo from './components/bridgeinfo';
import contractTransactions from "./components/contractTransactions";
import DID from "./components/did"

function App() {
  return (
    <Router >
      <div className="App">
        <Switch>
          <Route path="/balance" exact component={Balance}></Route>
          <Route path="/transaction-status" component={TransactionStatus}></Route>
          <Route path="/get-nfts" component={OwnersNFTs}></Route>
          <Route path="/koii-state" component={KoiiState}></Route>
          <Route path="/attention-State" component={AttentionState}></Route>
          <Route path="/nft-state" component={NFTState}></Route>
          <Route path="/send-koii" component={SendKOII}></Route>
          <Route path="/send-ar" component={SendAr}></Route>
          <Route path="/send-ar" component={SendAr}></Route>
          <Route path="/bridge-info" component={BridgeInfo}></Route>
          <Route path="/did" exact component={DID}></Route>
          <Route path="/contract-transactions" exact component={contractTransactions}></Route>
          <Route path="/" exact render={() => <Redirect to="/balance" />}></Route>
        </Switch>

      </div>
    </Router>
  );
}

export default App;
