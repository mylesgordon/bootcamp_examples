const Restaurant = ({ restaurant, updateMenu, deleteRestaurant }) => {
  return (
    <div>
      <h3>{restaurant.name}</h3>
      <img src={restaurant.imageLink} alt="Restaurant" className="preview" />
      <br />
      <a href="#menu" onClick={() => updateMenu(restaurant.id)}>
        <button>Menu</button>
      </a>
      <button onClick={() => deleteRestaurant(restaurant.id)}>Delete</button>
    </div>
  );
};

export default Restaurant;
