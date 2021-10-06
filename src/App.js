import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Sidebar from "./components/sidebar/index";
import Balance from "./components/checkBalance/index";
import TransactionStatus from './components/TransactionStatus';
import OwnersNFTs from './components/ownersNFTs';
import KoiiState from './components/koiiState';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={Balance}></Route>
          <Route path="/transaction-status" component={TransactionStatus}></Route>
          <Route path="/get-nfts" component={OwnersNFTs}></Route>
          <Route path="/Koii-State" component={KoiiState}></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
