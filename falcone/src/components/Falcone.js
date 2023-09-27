import Header from "./Header.js";
import Planet1 from "./Planet1.js";
import Planet2 from "./Planet2.js";
import Planet3 from "./Planet3.js";
import Planet4 from "./Planet4.js";
import Footer from "./Footer.js";
import "./Falcone.css";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

const Falcone = () => {
  let [originalPlanetsList, setOriginalPlanetsList] = useState([]);

  let [planets1, setPlanets1] = useState([]);
  let [vehicles1, setVehicles1] = useState([]);
  let [selected1, setSelected1] = useState(null);
  let [distanceFromPlanet1, setDistanceFromPlanet1] = useState(0);

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
    try {
      let response = await fetch("https://findfalcone.geektrust.com/planets");
      return response.json();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    (async () => {
      let response = await fetchPlanets();
      setPlanets1(response);
      setOriginalPlanetsList(response);
    })();
  }, []);

  return (
    <div>
      <Header
        setPlanet1={setPlanets1}
        setVehicle1={setVehicles1}
        setSelected1={setSelected1}
        setDistanceFromPlanet1={setDistanceFromPlanet1}
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
        <Planet1
          originalPlanetsList={originalPlanetsList}
          planets={planets1}
          setPlanets={setPlanets2}
          vehicles={vehicles1}
          setVehicles={setVehicles1}
          selected={selected1}
          setSelected={setSelected1}
          distanceFromPlanet={distanceFromPlanet1}
          setDistanceFromPlanet={setDistanceFromPlanet1}
          formData={formData}
          setFormData={setFormData}
          timeTaken={timeTaken}
          setTimeTaken={setTimeTaken}
        />

        <Planet2
          originalPlanetsList={originalPlanetsList}
          planets={planets2}
          setPlanets={setPlanets3}
          prevVehicle={vehicles1}
          vehicles={vehicles2}
          setVehicles={setVehicles2}
          selected={selected2}
          setSelected={setSelected2}
          distanceFromPlanet={distanceFromPlanet2}
          setDistanceFromPlanet={setDistanceFromPlanet2}
          formData={formData}
          setFormData={setFormData}
          timeTaken={timeTaken}
          setTimeTaken={setTimeTaken}
        />

        <Planet3
          originalPlanetsList={originalPlanetsList}
          planets={planets3}
          setPlanets={setPlanets4}
          prevVehicle={vehicles2}
          vehicles={vehicles3}
          setVehicles={setVehicles3}
          selected={selected3}
          setSelected={setSelected3}
          distanceFromPlanet={distanceFromPlanet3}
          setDistanceFromPlanet={setDistanceFromPlanet3}
          formData={formData}
          setFormData={setFormData}
          timeTaken={timeTaken}
          setTimeTaken={setTimeTaken}
        />

        <Planet4
          originalPlanetsList={originalPlanetsList}
          planets={planets4}
          prevVehicle={vehicles3}
          vehicles={vehicles4}
          setVehicles={setVehicles4}
          selected={selected4}
          setSelected={setSelected4}
          distanceFromPlanet={distanceFromPlanet4}
          setDistanceFromPlanet={setDistanceFromPlanet4}
          formData={formData}
          setFormData={setFormData}
          timeTaken={timeTaken}
          setTimeTaken={setTimeTaken}
        />
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
    </div>
  );
};

export default Falcone;
