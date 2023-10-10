import Header from "./Header.js";
import Destination from "./Destination.js";
import Footer from "./Footer.js";
import "./Falcone.css";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

const Falcone = () => {
  let [originalPlanetsList, setOriginalPlanetsList] = useState([]);
  let [userId, setUserId] = useState(1);
  let [planets, setPlanets] = useState([]);
  let [vehicles, setVehicles] = useState([]);
  let [prevVehicles, setPrevVehicles] = useState([]);
  let [selected, setSelected] = useState(null);
  let [distanceFromPlanet, setDistanceFromPlanet] = useState(0);

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
      setPlanets(response);
      setOriginalPlanetsList(response);
    })();
  }, []);

  return (
    <div>
      <Header
        setUserId={setUserId}
        setPlanets={setPlanets}
        setOriginalPlanetsList={setOriginalPlanetsList}
        setVehicles={setVehicles}
        setSelected={setSelected}
        setDistanceFromPlanet={setDistanceFromPlanet}
        setTimeTaken={setTimeTaken}
        setFormData={setFormData}
      />
      <div className="body-layout">
        <div className="body-font">Select planets you want to search in: </div>
      </div>
      <div className="form-layout">
        <Destination
          userId={userId}
          setUserId={setUserId}
          planets={planets}
          setPlanets={setPlanets}
          vehicles={vehicles}
          setVehicles={setVehicles}
          prevVehicles={prevVehicles}
          setPrevVehicles={setPrevVehicles}
          formData={formData}
          setFormData={setFormData}
          distanceFromPlanet={distanceFromPlanet}
          setDistanceFromPlanet={setDistanceFromPlanet}
          originalPlanetsList={originalPlanetsList}
          timeTaken={timeTaken}
          setTimeTaken={setTimeTaken}
          selected={selected}
          setSelected={setSelected}
        />
      </div>

      <div className="time-layout">
        <div className="time-font">Time taken: {timeTaken}</div>
      </div>

      <div id="error-msg"></div>

      <div className="find-button-layout">
        <button
          type="submit"
          className="find-button"
          onClick={async (e) => {
            e.preventDefault();
            let tokenJSON;
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
              tokenJSON = await response.json();
            } catch (err) {
              console.log(err);
            }

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
              if (findQueenResponse.status !== 400) {
                let jsonResponse = await findQueenResponse.json();
                if (jsonResponse.status === "success") {
                  window.localStorage.setItem(
                    "planet",
                    jsonResponse.planet_name
                  );
                  window.localStorage.setItem("time", timeTaken);
                }
                history.push("/result", { from: "Falcone" });
              } else {
                let jsonResponse = await findQueenResponse.json();
                document
                  .querySelector("#error-msg")
                  .setAttribute("class", "error-margin");
                document.querySelector("#error-msg").innerHTML = `
                  <div class="error-message-layout" >
                    <div id="error-msg" class="error-font">
                      ERROR : ${jsonResponse.error}
                    </div>
                  </div>`;
                setTimeout(() => {
                  document.querySelector("#error-msg").innerHTML = "";
                  document.querySelector("#error-msg").removeAttribute("class");
                }, 3000);
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
