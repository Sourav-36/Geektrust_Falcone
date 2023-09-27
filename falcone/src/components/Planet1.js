import "./Falcone.css";

const Planet1 = ({
  originalPlanetsList,
  planets,
  setPlanets,
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
  let fetchVehicles = async () => {
    try {
      let response = await fetch("https://findfalcone.geektrust.com/vehicles");
      return response.json();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="each-dropdown-layout">
      <label>Destination 1</label>
      <select
        name="planets1"
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

          originalPlanetsList.forEach((data) => {
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

export default Planet1;