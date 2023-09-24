import Header from "./Header.js";
import Footer from "./Footer.js";
import "./Falcone.css";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

const Falcone = () => {
  let [planets, setPlanets] = useState([]);
  let [vehicles, setVehicles] = useState([]);
  let [selected, setSelected] = useState(null);
  let [distanceFromPlanet, setDistanceFromPlanet] = useState(0);

  let [planets2, setPlanets2] = useState([]);
  let [vehicles2, setVehicles2] = useState([]);
  let [selected2, setSelected2] = useState(null);
  let [distanceFromPlanet2, setDistanceFromPlanet2] = useState(0);

  let [planets3, setPlanets3] = useState([]);
  let [vehicles3, setVehicles3] = useState([]);
  let [selected3, setSelected3] = useState(null);
  let [distanceFromPlanet3, setDistanceFromPlanet3] = useState(0);

  let [planets4, setPlanets4] = useState([]);
  let [vehicles4, setVehicles4] = useState([]);
  let [selected4, setSelected4] = useState(null);
  let [distanceFromPlanet4, setDistanceFromPlanet4] = useState(0);

  let [timeTaken, setTimeTaken] = useState(0);
  let history = useHistory();

  let [formData, setFormData] = useState({
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

  return (
    <>
      <Header
        setPlanet1={setPlanets}
        setVehicle1={setVehicles}
        setSelected1={setSelected}
        setDistanceFromPlanet1={setDistanceFromPlanet}
        setPlanet2={setPlanets2}
        setVehicle2={setVehicles2}
        setSelected2={setSelected2}
        setDistanceFromPlanet2={setDistanceFromPlanet2}
        setPlanet3={setPlanets3}
        setVehicle3={setVehicles3}
        setSelected3={setSelected3}
        setDistanceFromPlanet3={setDistanceFromPlanet3}
        setPlanet4={setPlanets4}
        setVehicle4={setVehicles4}
        setSelected4={setSelected4}
        setDistanceFromPlanet4={setDistanceFromPlanet4}
        setTimeTaken={setTimeTaken}
        setFormData={setFormData}
      />
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
              if (formData.planet_names.length === 1) {
                formData.planet_names.pop();
              }
              let planetNames = [];
              formData.planet_names.forEach((data) => {
                planetNames.push(data);
              });
              planetNames.push(e.target.value);

              setFormData({
                ...formData,
                planet_names: planetNames,
              });

              planets.forEach((data) => {
                if (data.name === e.target.value) {
                  setDistanceFromPlanet(data.distance);
                }
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

          <div className="radio-list-layout">
            {vehicles.map((obj, ind) => {
              return (
                <div key={ind} className="radio-button-layout">
                  <input
                    type="radio"
                    name="vehicles"
                    value={`${obj.name}`}
                    checked={ind === selected}
                    disabled={obj.max_distance < distanceFromPlanet}
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
                      let speedOfVehicle;
                      vehicles.forEach((obj) => {
                        if (obj.name === e.target.value) {
                          let obj1 = { ...obj };
                          if (obj1.total_no > 0) obj1.total_no -= 1;
                          newVehicles.push(obj1);
                          speedOfVehicle = obj1.speed;
                        } else {
                          newVehicles.push(obj);
                        }
                      });

                      setVehicles(newVehicles);

                      let presentPlanetList = [];
                      planets.forEach((obj) => {
                        if (!formData.planet_names.includes(obj.name))
                          presentPlanetList.push(obj);
                        else setTimeTaken(obj.distance / speedOfVehicle);
                      });

                      setPlanets2(presentPlanetList);
                    }}
                  />
                  <label
                    className={
                      obj.max_distance < distanceFromPlanet ? "label-font" : ""
                    }
                  >{`${obj.name} (${obj.total_no})`}</label>
                </div>
              );
            })}
          </div>
        </div>

        <div className="each-dropdown-layout">
          <label>Destination 2</label>
          <select
            name="planets2"
            id="2"
            onChange={async (e) => {
              if (formData.planet_names.length === 2) {
                formData.planet_names.pop();
              }
              let planetNames = [];
              formData.planet_names.forEach((data) => {
                planetNames.push(data);
              });
              planetNames.push(e.target.value);

              setFormData({
                ...formData,
                planet_names: planetNames,
              });

              planets.forEach((data) => {
                if (data.name === e.target.value) {
                  setDistanceFromPlanet2(data.distance);
                }
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

          <div className="radio-list-layout">
            {vehicles2.map((obj, ind) => {
              return (
                <div key={ind} className="radio-button-layout">
                  <input
                    type="radio"
                    name="vehicles2"
                    value={`${obj.name}`}
                    checked={ind === selected2}
                    disabled={obj.max_distance < distanceFromPlanet2}
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
                      let speedOfVehicle;
                      vehicles2.forEach((obj) => {
                        if (obj.name === e.target.value) {
                          let obj1 = { ...obj };
                          if (obj1.total_no > 0) obj1.total_no -= 1;
                          newVehicles.push(obj1);
                          speedOfVehicle = obj1.speed;
                        } else {
                          newVehicles.push(obj);
                        }
                      });

                      setVehicles2(newVehicles);
                      let presentPlanetList = [];
                      planets2.forEach((obj) => {
                        if (!formData.planet_names.includes(obj.name))
                          presentPlanetList.push(obj);
                        else
                          setTimeTaken(
                            timeTaken + obj.distance / speedOfVehicle
                          );
                      });

                      setPlanets3(presentPlanetList);
                    }}
                  />
                  <label
                    className={
                      obj.max_distance < distanceFromPlanet2 ? "label-font" : ""
                    }
                  >{`${obj.name} (${obj.total_no})`}</label>
                </div>
              );
            })}
          </div>
        </div>

        <div className="each-dropdown-layout">
          <label>Destination 3</label>
          <select
            name="planets3"
            id="3"
            onChange={async (e) => {
              if (formData.planet_names.length === 3) {
                formData.planet_names.pop();
              }
              let planetNames = [];
              formData.planet_names.forEach((data) => {
                planetNames.push(data);
              });
              planetNames.push(e.target.value);

              setFormData({
                ...formData,
                planet_names: planetNames,
              });
              planets.forEach((data) => {
                if (data.name === e.target.value) {
                  setDistanceFromPlanet3(data.distance);
                }
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

          <div className="radio-list-layout">
            {vehicles3.map((obj, ind) => {
              return (
                <div key={ind} className="radio-button-layout">
                  <input
                    type="radio"
                    name="vehicles3"
                    value={`${obj.name}`}
                    checked={ind === selected3}
                    disabled={obj.max_distance < distanceFromPlanet3}
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
                      let speedOfVehicle;
                      vehicles3.forEach((obj) => {
                        if (obj.name === e.target.value) {
                          let obj1 = { ...obj };
                          if (obj1.total_no > 0) obj1.total_no -= 1;
                          newVehicles.push(obj1);
                          speedOfVehicle = obj1.speed;
                        } else {
                          newVehicles.push(obj);
                        }
                      });

                      setVehicles3(newVehicles);
                      let presentPlanetList = [];
                      planets3.forEach((obj) => {
                        if (!formData.planet_names.includes(obj.name))
                          presentPlanetList.push(obj);
                        else
                          setTimeTaken(
                            timeTaken + obj.distance / speedOfVehicle
                          );
                      });

                      setPlanets4(presentPlanetList);
                    }}
                  />
                  <label
                    className={
                      obj.max_distance < distanceFromPlanet3 ? "label-font" : ""
                    }
                  >{`${obj.name} (${obj.total_no})`}</label>
                </div>
              );
            })}
          </div>
        </div>

        <div className="each-dropdown-layout">
          <label>Destination 4</label>
          <select
            name="planets4"
            id="4"
            onChange={async (e) => {
              if (formData.planet_names.length === 4) {
                formData.planet_names.pop();
              }
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
              planets.forEach((data) => {
                if (data.name === e.target.value) {
                  setDistanceFromPlanet4(data.distance);
                }
              });
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

          <div className="radio-list-layout">
            {vehicles4.map((obj, ind) => {
              return (
                <div key={ind} className="radio-button-layout">
                  <input
                    type="radio"
                    name="vehicles4"
                    value={`${obj.name}`}
                    checked={ind === selected4}
                    disabled={obj.max_distance < distanceFromPlanet4}
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
                      let speedOfVehicle;
                      vehicles4.forEach((obj) => {
                        if (obj.name === e.target.value) {
                          let obj1 = { ...obj };
                          if (obj1.total_no > 0) obj1.total_no -= 1;
                          newVehicles.push(obj1);
                          speedOfVehicle = obj1.speed;
                        } else {
                          newVehicles.push(obj);
                        }
                      });

                      planets4.forEach((obj) => {
                        if (formData.planet_names.includes(obj.name))
                          setTimeTaken(
                            timeTaken + obj.distance / speedOfVehicle
                          );
                      });

                      setVehicles4(newVehicles);
                    }}
                  />
                  <label
                    className={
                      obj.max_distance < distanceFromPlanet4 ? "label-font" : ""
                    }
                  >{`${obj.name} (${obj.total_no})`}</label>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="time-layout">
        <div className="time-font">Time taken: {timeTaken}</div>
      </div>

      <div className="find-button-layout">
        <button
          type="submit"
          className="find-button"
          onClick={async (e) => {
            e.preventDefault();
            try {
              let response = await fetch(
                "https://findfalcone.geektrust.com/token",
                {
                  method: "POST",
                  headers: {
                    accept: "application/json",
                  },
                }
              );
              let tokenJSON = await response.json();

              let form = {
                ...formData,
                token: tokenJSON.token,
              };

              try {
                let findQueenResponse = await fetch(
                  "https://findfalcone.geektrust.com/find",
                  {
                    method: "POST",
                    headers: {
                      accept: "application/json",
                      "content-type": "application/json",
                    },
                    body: JSON.stringify(form),
                  }
                );
                let jsonResponse = await findQueenResponse.json();
                console.log(jsonResponse);
                if (jsonResponse.status === "success") {
                  window.localStorage.setItem(
                    "planet",
                    jsonResponse.planet_name
                  );
                  window.localStorage.setItem("time", timeTaken);
                }
                history.push("/result", { from: "Falcone" });
              } catch (err) {
                if (err.status === 400) console.log(err.error);
              }
            } catch (err) {
              console.log(err);
            }
          }}
        >
          Find Falcone!
        </button>
      </div>
      <Footer />
    </>
  );
};

export default Falcone;
