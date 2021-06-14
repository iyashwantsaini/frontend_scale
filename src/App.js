import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//imports
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import AddInterview from "./pages/AddInt";
import EditInterview from "./pages/EditInt";
import AccInt from "./pages/AccInt";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/addinterview" component={AddInterview} />
          <Route
            path="/editinterview/:id/:name1/:name2/:start/:end"
            component={EditInterview}
          />
          <Route path="/accinterview/:id/:email" component={AccInt} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
