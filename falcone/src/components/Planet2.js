import "./Falcone.css";

const Planet2 = ({
  originalPlanetsList,
  planets,
  setPlanets,
  prevVehicle,
  vehicles,
  setVehicles,
  selected,
  setSelected,
  distanceFromPlanet,
  setDistanceFromPlanet,
  formData,
  setFormData,
  timeTaken,
  setTimeTaken,
}) => {
  return (
    <div className="each-dropdown-layout">
      <label>Destination 2</label>
      <select
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

          originalPlanetsList.forEach((data) => {
            if (data.name === e.target.value) {
              setDistanceFromPlanet(data.distance);
            }
          });

          setVehicles(prevVehicle);
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
                id="2"
                value={`${obj.name}`}
                checked={ind === selected}
                disabled={obj.max_distance < distanceFromPlanet}
                onChange={(e) => {
                  setSelected((prev) => {
                    return ind === prev ? null : ind;
                  });

                  let removedVehicle = "";
                  if (formData.vehicle_names.length === 2) {
                    removedVehicle =
                      formData.vehicle_names[formData.vehicle_names.length - 1];
                    formData.vehicle_names.pop();
                  }

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
                  let speedOfVehicle = 0,
                    prevSpeedOfVehicle = 0;
                  vehicles.forEach((obj) => {
                    if (obj.name === e.target.value) {
                      let obj1 = { ...obj };
                      if (obj1.total_no > 0) {
                        obj1.total_no -= 1;
                        speedOfVehicle = obj1.speed;
                      }
                      newVehicles.push(obj1);
                    } else if (
                      obj.name === removedVehicle &&
                      removedVehicle !== ""
                    ) {
                      let obj1 = { ...obj };
                      obj1.total_no += 1;
                      prevSpeedOfVehicle = obj1.speed;
                      newVehicles.push(obj1);
                    } else {
                      newVehicles.push(obj);
                    }
                  });

                  setVehicles(newVehicles);
                  let presentPlanetList = [];
                  planets.forEach((obj) => {
                    if (!formData.planet_names.includes(obj.name)) {
                      presentPlanetList.push(obj);
                    } else if (speedOfVehicle !== 0) {
                      if (prevSpeedOfVehicle !== 0) {
                        setTimeTaken(
                          timeTaken +
                            obj.distance / speedOfVehicle -
                            obj.distance / prevSpeedOfVehicle
                        );
                      } else {
                        setTimeTaken(timeTaken + obj.distance / speedOfVehicle);
                      }
                    }
                  });

                  setPlanets(presentPlanetList);
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
  );
};

export default Planet2;
