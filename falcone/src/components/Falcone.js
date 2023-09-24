import Header from "./Header.js";
import Footer from "./Footer.js";
import "./Falcone.css";
import { useState, useEffect } from "react";

const Falcone = () => {
  let [planets, setPlanets] = useState([]);
  let [vehicles, setVehicles] = useState([]);
  let [selected, setSelected] = useState(null);

  let [planets2, setPlanets2] = useState([]);
  let [vehicles2, setVehicles2] = useState([]);
  let [selected2, setSelected2] = useState(null);

  let [planets3, setPlanets3] = useState([]);
  let [vehicles3, setVehicles3] = useState([]);
  let [selected3, setSelected3] = useState(null);

  let [planets4, setPlanets4] = useState([]);
  let [vehicles4, setVehicles4] = useState([]);
  let [selected4, setSelected4] = useState(null);

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

  // console.log(formData);

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

                    setPlanets2(presentPlanetList);
                  }}
                />
                <label>{`${obj.name} (${obj.total_no})`}</label>
              </div>
            );
          })}
        </div>

        <div className="each-dropdown-layout">
          <label>Destination 2</label>
          <select
            name="planets2"
            id="2"
            onChange={async (e) => {
              let planetNames = [];
              formData.planet_names.forEach((data) => {
                planetNames.push(data);
              });
              planetNames.push(e.target.value);

              setFormData({
                ...formData,
                planet_names: planetNames,
              });

              setVehicles2(vehicles);
            }}
          >
            <option value="" default>
              Select
            </option>
            {planets2.map((obj) => {
              return (
                <option key={obj.name} id={`${obj.name}`} value={`${obj.name}`}>
                  {obj.name}
                </option>
              );
            })}
          </select>

          {vehicles2.map((obj, ind) => {
            return (
              <div key={ind}>
                <input
                  type="radio"
                  name="vehicles2"
                  value={`${obj.name}`}
                  checked={ind === selected2}
                  onChange={(e) => {
                    setSelected2((prev) => {
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
                    vehicles2.forEach((obj) => {
                      if (obj.name === e.target.value) {
                        let obj1 = { ...obj };
                        if (obj1.total_no > 0) obj1.total_no -= 1;
                        newVehicles.push(obj1);
                      } else {
                        newVehicles.push(obj);
                      }
                    });

                    setVehicles2(newVehicles);
                    let presentPlanetList = [];
                    planets2.forEach((obj) => {
                      if (!formData.planet_names.includes(obj.name))
                        presentPlanetList.push(obj);
                    });

                    setPlanets3(presentPlanetList);
                  }}
                />
                <label>{`${obj.name} (${obj.total_no})`}</label>
              </div>
            );
          })}
        </div>

        <div className="each-dropdown-layout">
          <label>Destination 3</label>
          <select
            name="planets3"
            id="3"
            onChange={async (e) => {
              let planetNames = [];
              formData.planet_names.forEach((data) => {
                planetNames.push(data);
              });
              planetNames.push(e.target.value);

              setFormData({
                ...formData,
                planet_names: planetNames,
              });

              setVehicles3(vehicles2);
            }}
          >
            <option value="" default>
              Select
            </option>
            {planets3.map((obj) => {
              return (
                <option key={obj.name} id={`${obj.name}`} value={`${obj.name}`}>
                  {obj.name}
                </option>
              );
            })}
          </select>

          {vehicles3.map((obj, ind) => {
            return (
              <div key={ind}>
                <input
                  type="radio"
                  name="vehicles3"
                  value={`${obj.name}`}
                  checked={ind === selected3}
                  onChange={(e) => {
                    setSelected3((prev) => {
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
                    vehicles3.forEach((obj) => {
                      if (obj.name === e.target.value) {
                        let obj1 = { ...obj };
                        if (obj1.total_no > 0) obj1.total_no -= 1;
                        newVehicles.push(obj1);
                      } else {
                        newVehicles.push(obj);
                      }
                    });

                    setVehicles3(newVehicles);
                    let presentPlanetList = [];
                    planets3.forEach((obj) => {
                      if (!formData.planet_names.includes(obj.name))
                        presentPlanetList.push(obj);
                    });

                    setPlanets4(presentPlanetList);
                  }}
                />
                <label>{`${obj.name} (${obj.total_no})`}</label>
              </div>
            );
          })}
        </div>

        <div className="each-dropdown-layout">
          <label>Destination 4</label>
          <select
            name="planets4"
            id="4"
            onChange={async (e) => {
              let planetNames = [];
              formData.planet_names.forEach((data) => {
                planetNames.push(data);
              });
              planetNames.push(e.target.value);

              setFormData({
                ...formData,
                planet_names: planetNames,
              });

              setVehicles4(vehicles3);
            }}
          >
            <option value="" default>
              Select
            </option>
            {planets4.map((obj) => {
              return (
                <option key={obj.name} id={`${obj.name}`} value={`${obj.name}`}>
                  {obj.name}
                </option>
              );
            })}
          </select>

          {vehicles4.map((obj, ind) => {
            return (
              <div key={ind}>
                <input
                  type="radio"
                  name="vehicles4"
                  value={`${obj.name}`}
                  checked={ind === selected4}
                  onChange={(e) => {
                    setSelected4((prev) => {
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
                    vehicles4.forEach((obj) => {
                      if (obj.name === e.target.value) {
                        let obj1 = { ...obj };
                        if (obj1.total_no > 0) obj1.total_no -= 1;
                        newVehicles.push(obj1);
                      } else {
                        newVehicles.push(obj);
                      }
                    });

                    setVehicles4(newVehicles);
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
