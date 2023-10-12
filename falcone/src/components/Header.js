import "./Header.css";

const Header = ({ handleReset }) => {
  return (
    <div className="header-layout">
      <div className="title-layout">
        <div className="header-font">Finding Falcone!</div>
      </div>

      <div className="button-layout">
        <button
          className="reset-button"
          disabled={window.location.pathname === "/result"}
          onClick={handleReset}
        >
          Reset
        </button>
        <button
          className="geektrust-home-button"
          onClick={() => {
            window.open("https://www.geektrust.com/dashboard", "_blank");
          }}
        >
          Geektrust Home
        </button>
      </div>
    </div>
  );
};

export default Header;
