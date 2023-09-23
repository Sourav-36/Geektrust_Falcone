import Falcone from "./components/Falcone.js";
import { Switch, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Falcone} />
      </Switch>
    </div>
  );
}

export default App;
