const Restaurant = ({ restaurant, updateMenu }) => {
  return (
    <div>
      <a href="#menu" onClick={() => updateMenu(restaurant.id)}>
        <h3>{restaurant.name}</h3>
        <img src={restaurant.imageLink} alt="Restaurant" className="preview" />
      </a>
    </div>
  );
};

export default Restaurant;
