-- Schema
CREATE TABLE leagues (
  league_id INTEGER NOT NULL PRIMARY KEY, 
  league_name TEXT, 
  country TEXT, 
  tier INTEGER
);

CREATE TABLE stadia (
  stadium_id INTEGER NOT NULL PRIMARY KEY,
  stadium_name TEXT,
  location TEXT
);

CREATE TABLE teams (
  team_id INTEGER NOT NULL PRIMARY KEY,
  team_name TEXT,
  stadium_id INTEGER,
  league_id INTEGER,
  FOREIGN KEY (stadium_id) REFERENCES stadia (stadium_id),
  FOREIGN KEY (league_id) REFERENCES leagues (league_id)
);

CREATE TABLE players (
  player_id INTEGER NOT NULL PRIMARY KEY,
  player_name TEXT,
  team_id INT,
  strong_foot TEXT,
  birthplace TEXT,
  dob TEXT,
  FOREIGN KEY (team_id) REFERENCES teams (team_id)
);

-- Test Data
INSERT INTO leagues VALUES (
  NULL, 
  "League Two", 
  "United Kingdom", 
  4
);

INSERT INTO stadia VALUES (
  NULL, 
  "Glanford Park", 
  "Scunthorpe"
);

INSERT INTO teams VALUES (
  NULL, 
  "Scunthorpe United", 
  1, 
  1
);

INSERT INTO players VALUES (
  NULL,
  "Rory Watson",
  1,
  "N/A",
  "York",
  "1996-02-05"
);

-- Output
SELECT * FROM leagues;
SELECT * FROM stadia;
SELECT * FROM teams;
SELECT * FROM players;

SELECT teams.team_id, 
teams.team_name, 
stadia.stadium_name, 
stadia.location, 
leagues.league_name,
leagues.tier 
FROM teams INNER JOIN stadia ON 
teams.stadium_id=stadia.stadium_id
INNER JOIN leagues ON
teams.league_id=leagues.league_id WHERE
team_id=1;