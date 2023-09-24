import "./Result.css";
import Header from "./Header.js";
import Footer from "./Footer.js";
import { useHistory } from "react-router-dom";

const Result = (props) => {
  let history = useHistory();
  return (
    <>
      <Header />
      <div className="result-layout">
        {window.localStorage.getItem("planet") !== null ? (
          <>
            <div className="success-font">
              Success! Congratulations on Finding Falcone. King Shan is mighty
              pleased.
            </div>
            <div className="data-layout">
              <div className="data-font">
                Time taken: {window.localStorage.getItem("time")}
              </div>
              <div className="data-font">
                Planet found: {window.localStorage.getItem("planet")}
              </div>
            </div>
          </>
        ) : (
          <div className="failure-font">
            Failure ! You could not find Falcone. King Shan is very
            disheartened.
          </div>
        )}
        <div className="start-button-layout">
          <button
            type="button"
            className="start-button"
            onClick={(e) => {
              window.localStorage.clear();
              history.push("/");
            }}
          >
            Start Again
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Result;
