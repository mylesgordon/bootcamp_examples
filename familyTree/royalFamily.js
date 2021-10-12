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

const george_liz = [
  generation1.find((person) => person.name === "King George VI"),
  generation1.find((person) => person.name === "Queen Elizabeth"),
];

const generation2 = [
  new Person("Prince Philip", []),
  new Person("Queen Elizabeth II", george_liz),
  new Person("Princess Margaret", george_liz),
];

const phil_liz2 = [
  generation2.find((person) => person.name === "Prince Philip"),
  generation2.find((person) => person.name === "Queen Elizabeth II"),
];

const generation3 = [
  new Person("Camila", []),
  new Person("Charles", phil_liz2),
  new Person("Diana", []),
  new Person("Anne", phil_liz2),
  new Person("Prince Edward", phil_liz2),
];

console.log(generation3[3].childOf());
