import Restauraunts from "./components/Restaurants";
import Menu from "./components/Menu";
import Forms from "./components/Forms";
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
      <hr />
      <Forms />
    </div>
  );
}

export default App;
