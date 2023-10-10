import "./Header.css";

const Header = ({
  setUserId,
  setPlanets,
  setOriginalPlanetsList,
  setVehicles,
  setSelected,
  setDistanceFromPlanet,
  setTimeTaken,
  setFormData,
}) => {
  let fetchPlanets = async () => {
    let response = await fetch("https://findfalcone.geektrust.com/planets");
    return response.json();
  };

  return (
    <div className="header-layout">
      <div className="title-layout">
        <div className="header-font">Finding Falcone!</div>
      </div>

      <div className="button-layout">
        <button
          className="reset-button"
          disabled={window.location.pathname === "/result"}
          onClick={async (e) => {
            setUserId(1);
            setPlanets([]);
            setVehicles([]);
            setSelected(null);
            setDistanceFromPlanet(0);
            setTimeTaken(0);
            setFormData({
              planet_names: [],
              vehicle_names: [],
            });

            let response = await fetchPlanets();
            setPlanets(response);
            setOriginalPlanetsList(response);
          }}
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
