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
    return this.members.find((person) => person.name === personToFind);
  }
}

const findGenerations = () => {
  let generations = [];
  let jsonIndex = 0;

  for (let i = 0; i < generationCount; i++) {
    let generation = new Generation();

    // Keep looping until the current generation in the JSON at the given index ends
    while (
      jsonIndex < generationData.length &&
      generationData[jsonIndex].generation == i
    ) {
      const memberObj = generationData[jsonIndex];
      let person = new Person(memberObj.name);

      if (generations.length != 0 && memberObj.hasParents) {
        const previousGeneration = generations[i - 1];
        person.addParent(previousGeneration.findMember(memberObj.parents[0]));
        person.addParent(previousGeneration.findMember(memberObj.parents[1]));
      }

      generation.addMember(person);
      jsonIndex++;
    }

    generations.push(generation);
  }

  return generations;
};

console.log(findGenerations()[1].members[1].childOf());
