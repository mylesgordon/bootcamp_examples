import MenuEntry from "./MenuEntry";

const Menu = ({ menus }) => {
  if (menus.length === 0) {
    return (
      <div id="menu">
        <h3>No menus found</h3>
      </div>
    );
  } else {
    return (
      <div id="menu">
        {menus.map((menu) => (
          <div key={menu.id}>
            <h2>{menu.title}</h2>
            <MenuEntry menuID={menu.id} />
          </div>
        ))}
      </div>
    );
  }
};
export default Menu;
