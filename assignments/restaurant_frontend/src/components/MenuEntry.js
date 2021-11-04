import { useEffect, useState } from "react";

const MenuEntry = ({ menuID }) => {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    const fetchUrl = `http://localhost:3002/api/menu/${menuID}/items`;
    console.log(fetchUrl);

    fetch(fetchUrl, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((response) => {
        setMenuItems(response);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      {menuItems.map((item) => (
        <div key={item.id}>
          <h4>Name: {item.name}</h4>
          <h5>Price: {item.price}</h5>
        </div>
      ))}
    </>
  );
};
export default MenuEntry;
