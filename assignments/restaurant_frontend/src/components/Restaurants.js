import { useState, useEffect } from "react";
import Restaurant from "./Restaurant";

const Restauraunts = ({ updateMenu }) => {
  const [restaurantState, setRestaurauntState] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3002/api/restaurant", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((response) => setRestaurauntState(response))
      .catch((error) => console.error(error));
  }, []);

  return (
    <section>
      {restaurantState.map((restaurant) => (
        <Restaurant
          restaurant={restaurant}
          updateMenu={updateMenu}
          key={restaurant.id}
        />
      ))}
    </section>
  );
};

export default Restauraunts;
