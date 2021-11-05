import { useState, useEffect } from "react";
import Restaurant from "./Restaurant";

const Restauraunts = ({ updateMenu }) => {
  const [restaurantState, setRestaurauntState] = useState([]);

  const fetchRestaurants = () => {
    fetch("http://localhost:3002/api/restaurant", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((response) => setRestaurauntState(response))
      .catch((error) => console.error(error));
  };

  const deleteRestaurant = (id) => {
    fetch("http://localhost:3002/api/restaurant", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: `{"id": ${id}}`,
    })
      .then(() => fetchRestaurants())
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  return (
    <section>
      {restaurantState.map((restaurant) => (
        <Restaurant
          restaurant={restaurant}
          updateMenu={updateMenu}
          deleteRestaurant={deleteRestaurant}
          key={restaurant.id}
        />
      ))}
    </section>
  );
};

export default Restauraunts;
