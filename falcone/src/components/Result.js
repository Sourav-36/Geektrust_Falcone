import "./Result.css";
import Header from "./Header.js";
import Footer from "./Footer.js";

const Result = (props) => {
  return (
    <>
      <Header />
      <div className="result-layout">
        <div className="message-font">
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
        <div className="start-button-layout">
          <button type="button" className="start-button">
            Start Again
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Result;
