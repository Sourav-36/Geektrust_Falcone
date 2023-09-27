const Planet4 = ({
  originalPlanetsList,
  planets,
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

          setVehicles(prevVehicle);
          originalPlanetsList.forEach((data) => {
            if (data.name === e.target.value) {
              setDistanceFromPlanet(data.distance);
            }
          });
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
                name="vehicles4"
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

                  planets.forEach((obj) => {
                    if (formData.planet_names.includes(obj.name))
                      setTimeTaken(timeTaken + obj.distance / speedOfVehicle);
                  });

                  setVehicles(newVehicles);
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

export default Planet4;
