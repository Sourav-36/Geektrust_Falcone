import "./Header.css";

const Header = () => {
  return (
    <div className="header-layout">
      <div className="title-layout">
        <div className="header-font">Finding Falcone!</div>
      </div>

      <div className="button-layout">
        <button className="reset-button">Reset</button>
        <button className="geektrust-home-button">Geektrust Home</button>
      </div>
    </div>
  );
};

export default Header;
