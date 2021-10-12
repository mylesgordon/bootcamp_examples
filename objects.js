// lesson notes: https://multiverselearningproducts.github.io/curriculum/Bootcamp/Unit-1-Object_Oriented_Programming/0.1.1-JavaScript_Objects_And_Functions.html#javascript

const myObject = {
  name: "inalone", // key + value
  age: 20,
  likes: ["a", "b", "c"],
  getLikes: () => {
    return likes;
  },
};

const arrayOfObjects = [
  {
    name: "test",
    age: 15,
  },
  {
    name: "test2",
    age: 22,
  },
];

// Royal Family assignment

class Person {
  constructor(name, parents) {
    this.name = name;
    this.parents = parents;
    this.childOf = () => {
      return (
        this.parents.map((parent) => parent.name).join(" & ") ||
        "No known parents"
      );
    };
  }
}

const generation1 = [
  new Person("King George VI", []),
  new Person("Queen Elizabeth", []),
];

const generation2 = [
  new Person("Prince Philip", []),
  new Person("Queen Elizabeth II", [
    generation1.find((person) => person.name === "King George VI"),
    generation1.find((person) => person.name === "Queen Elizabeth"),
  ]),
  new Person("Princess Margaret", [
    generation1.find((person) => person.name === "King George VI"),
    generation1.find((person) => person.name === "Queen Elizabeth"),
  ]),
];

const generation3 = [
  new Person("Camila", []),
  new Person("Charles", [
    generation2.find((person) => person.name === "Prince Philip"),
    generation2.find((person) => person.name === "Queen Elizabeth II"),
  ]),
  new Person("Diana", []),
  new Person("Anne", [
    generation2.find((person) => person.name === "Prince Philip"),
    generation2.find((person) => person.name === "Queen Elizabeth II"),
  ]),
  new Person("Prince Edward", [
    generation2.find((person) => person.name === "Prince Philip"),
    generation2.find((person) => person.name === "Queen Elizabeth II"),
  ]),
];

console.log(generation3[3].childOf());
