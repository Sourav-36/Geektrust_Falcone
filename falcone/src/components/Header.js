import "./Header.css";

const Header = ({
  setPlanet1,
  setVehicle1,
  setSelected1,
  setDistanceFromPlanet1,
  setPlanet2,
  setVehicle2,
  setSelected2,
  setDistanceFromPlanet2,
  setPlanet3,
  setVehicle3,
  setSelected3,
  setDistanceFromPlanet3,
  setPlanet4,
  setVehicle4,
  setSelected4,
  setDistanceFromPlanet4,
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
          onClick={async (e) => {
            setPlanet1([]);
            setVehicle1([]);
            setSelected1(null);
            setDistanceFromPlanet1(0);
            setPlanet2([]);
            setVehicle2([]);
            setSelected2(null);
            setDistanceFromPlanet2(0);
            setPlanet3([]);
            setVehicle3([]);
            setSelected3(null);
            setDistanceFromPlanet3(0);
            setPlanet4([]);
            setVehicle4([]);
            setSelected4(null);
            setDistanceFromPlanet4(0);
            setTimeTaken(0);
            setFormData({
              planet_names: [],
              vehicle_names: [],
            });

            let response = await fetchPlanets();
            setPlanet1(response);
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
