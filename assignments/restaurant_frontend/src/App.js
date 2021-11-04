import Restauraunts from "./components/Restaurants";
import Menu from "./components/Menu";
import { useState } from "react";

function App() {
  const [menu, setMenu] = useState([]);

  const updateMenu = (restaurantID) => {
    fetch("http://localhost:3002/api/restaurant/" + restaurantID + "/menu", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((response) => {
        setMenu(response);
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="App">
      <Restauraunts updateMenu={updateMenu} />
      <hr />
      <Menu menus={menu} />
    </div>
  );
}

export default App;
