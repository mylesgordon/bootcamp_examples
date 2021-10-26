-- Schema
CREATE TABLE restaurants (
  restaurant_id INTEGER NOT NULL PRIMARY KEY, 
  restaurant_name TEXT, 
  image_link TEXT
);

CREATE TABLE menus (
  menu_id INTEGER NOT NULL PRIMARY KEY,
  menu_title TEXT,
  restaurant_id INTEGER NOT NULL,
  FOREIGN KEY (restaurant_id) REFERENCES restaurants(restaurant_id)
);

CREATE TABLE menu_items (
  item_id INTEGER NOT NULL PRIMARY KEY,
  item_name TEXT,
  item_price INTEGER,
  menu_id INTEGER NOT NULL,
  FOREIGN KEY (menu_id) REFERENCES menus(menu_id)
);

-- Test Data
INSERT INTO restaurants VALUES (NULL, "Res 1", "link");
INSERT INTO restaurants VALUES (NULL, "Res 2", "link");

INSERT INTO menus VALUES (NULL, "Menu 1", 1);
INSERT INTO menus VALUES (NULL, "Menu 2", 1);
INSERT INTO menus VALUES (NULL, "Menu 3", 2);

INSERT INTO menu_items VALUES (NULL, "Toast", 900, 1);
INSERT INTO menu_items VALUES (NULL, "Untoasted toast", 300, 1);
INSERT INTO menu_items VALUES (NULL, "Egg", 500, 2);
INSERT INTO menu_items VALUES (NULL, "Water", 0, 2);
INSERT INTO menu_items VALUES (NULL, "Mushrooms", 1000, 3);

-- Task 1
SELECT restaurants.restaurant_name, menus.menu_title
FROM restaurants
JOIN menus ON restaurants.restaurant_id = menus.restaurant_id
WHERE restaurants.restaurant_id = 1;

-- Task 2
SELECT restaurants.restaurant_name, COUNT(menus.menu_id) AS "Menu Count" 
FROM restaurants 
JOIN menus ON restaurants.restaurant_id = menus.restaurant_id 
GROUP BY restaurant_name;

-- Task 3
SELECT menus.menu_title, SUM(menu_items.item_price) AS "Total Cost"
FROM menus
JOIN menu_items ON menus.menu_id = menu_items.menu_id
GROUP BY menu_title
ORDER BY "Total Cost" DESC;