import { Collapse } from "react-collapse";
import { useState } from "react";
import Form from "./Form";

const Restaurant = ({ restaurant, updateMenu, deleteRestaurant }) => {
  const [isEditOpen, setEditOpen] = useState(false);

  const handleEdit = () => {
    setEditOpen(!isEditOpen);
  };

  return (
    <div>
      <h3>{restaurant.name}</h3>
      <img src={restaurant.imageLink} alt="Restaurant" className="preview" />
      <br />
      <a href="#menu" onClick={() => updateMenu(restaurant.id)}>
        <button>Menu</button>
      </a>
      <button onClick={() => handleEdit()}>Edit</button>
      <button onClick={() => deleteRestaurant(restaurant.id)}>Delete</button>

      <Collapse isOpened={isEditOpen} theme={{ content: "editBox" }}>
        <Form method="PUT" id={restaurant.id} />
      </Collapse>
    </div>
  );
};

export default Restaurant;
