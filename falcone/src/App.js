import Falcone from "./components/Falcone.js";
import Result from "./components/Result.js";
import { Switch, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Falcone} />
        <Route path="/result" component={Result} />
      </Switch>
    </div>
  );
}

export default App;
