import Header from "./Header.js";
import Footer from "./Footer.js";
import "./Falcone.css";
import { useState, useEffect } from "react";

const Falcone = () => {
  let [planets, setPlanets] = useState([]);
  let [vehicles, setVehicles] = useState([]);
  let [selected, setSelected] = useState(null);
  // let [vehicles2, setVehicles2] = useState([]);
  let [formData, setFormData] = useState({
    token: "",
    planet_names: [],
    vehicle_names: [],
  });

  let fetchPlanets = async () => {
    let response = await fetch("https://findfalcone.geektrust.com/planets");
    return response.json();
  };

  let fetchVehicles = async () => {
    let response = await fetch("https://findfalcone.geektrust.com/vehicles");
    return response.json();
  };
  useEffect(() => {
    (async () => {
      let response = await fetchPlanets();
      setPlanets(response);
    })();
  }, []);

  console.log(formData);
  console.log(planets);

  return (
    <>
      <Header />
      <div className="body-layout">
        <div className="body-font">Select planets you want to search in: </div>
      </div>
      <div className="form-layout">
        <div className="each-dropdown-layout">
          <label>Destination 1</label>
          <select
            name="planets"
            id="1"
            onChange={async (e) => {
              let newPlanetsList = [];
              planets.forEach((data) => {
                if (data.name !== e.target.value) newPlanetsList.push(data);
              });

              let planetNames = [];
              planetNames.push(e.target.value);

              setFormData({
                ...formData,
                planet_names: planetNames,
              });

              let response = await fetchVehicles();
              setVehicles(response);
            }}
          >
            <option value="" default>
              Select
            </option>
            {planets.map((obj) => {
              return (
                <option key={obj.name} id={`${obj.name}`} value={`${obj.name}`}>
                  {obj.name}
                </option>
              );
            })}
          </select>

          {vehicles.map((obj, ind) => {
            return (
              <div key={ind}>
                <input
                  type="radio"
                  name="vehicles"
                  value={`${obj.name}`}
                  checked={ind === selected}
                  onChange={(e) => {
                    setSelected((prev) => {
                      return ind === prev ? null : ind;
                    });

                    let vehicleList = [];
                    formData.vehicle_names.forEach((data) => {
                      vehicleList.push(data);
                    });
                    vehicleList.push(e.target.value);
                    setFormData({
                      ...formData,
                      vehicle_names: vehicleList,
                    });

                    let newVehicles = [];
                    vehicles.forEach((obj) => {
                      if (obj.name === e.target.value) {
                        let obj1 = { ...obj };
                        if (obj1.total_no > 0) obj1.total_no -= 1;
                        newVehicles.push(obj1);
                      } else {
                        newVehicles.push(obj);
                      }
                    });

                    setVehicles(newVehicles);
                    let presentPlanetList = [];
                    planets.forEach((obj) => {
                      if (!formData.planet_names.includes(obj.name))
                        presentPlanetList.push(obj);
                    });

                    setPlanets(presentPlanetList);
                  }}
                />
                <label>{`${obj.name} (${obj.total_no})`}</label>
              </div>
            );
          })}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Falcone;
