// Royal Family assignment
const generationCount = 3;
const generationData = require("./royalData.json");

class Person {
  constructor(name) {
    this.name = name;
    this.parents = [];
  }
  addParent(parent) {
    this.parents.push(parent);
  }
  childOf() {
    return (
      this.parents.map((parent) => parent.name).join(" & ") ||
      "No known parents"
    );
  }
}

class Generation {
  constructor() {
    this.members = [];
  }
  addMember(newMember) {
    this.members.push(newMember);
  }
  findMember(personToFind) {
    this.members.find((person) => person.name === personToFind);
  }
}

const findGenerations = () => {
  let generations = [];
  let jsonIndex = 0;

  for (let i = 0; i < generationCount; i++) {
    let generation = new Generation();

    while (
      jsonIndex < generationData.length &&
      generationData[jsonIndex].generation == i
    ) {
      const memberObj = generationData[jsonIndex];
      let person = new Person(memberObj.name);

      if (generations.length != 0) {
        person.addParent(generations[i - 1].findMember(memberObj.parents[0]));
        person.addParent(generations[i - 1].findMember(memberObj.parents[1]));
      }

      generation.addMember(person);
      jsonIndex++;
    }

    generations.push(generation);
  }

  return generations;
};

console.log(findGenerations());
