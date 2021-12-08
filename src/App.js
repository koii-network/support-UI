import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import Balance from "./containers/checkBalance/index";
import TransactionStatus from './containers/TransactionStatus';
import OwnersNFTs from './containers/ownersNFTs';
import KoiiState from './containers/koiiState';
import AttentionState from './containers/attentionState';
import SendKOII from './containers/sendKOII';
import SendAr from ".//containers/sendAr";
import NFTState from './containers/nftState';
import BridgeInfo from './containers/bridgeinfo';
import contractTransactions from "./containers/contractTransactions";
import DID from "./containers/did"

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
