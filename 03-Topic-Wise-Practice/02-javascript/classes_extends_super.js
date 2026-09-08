class Animal {
    constructor(name) {
        this.name = name;
    }


    eat() {
        console.log(`${this.name} is eating.`);
    }
}


class Cat extends Animal { // Cat inherits from Animal
    constructor(name, color) {
        super(name); // Call the parent (Animal) constructor
        this.color = color;
    }


    meow() {
        console.log(`${this.color} cat ${this.name} says Meow!`);
    }


    // Override the eat method from the parent
    eat() {
        console.log(`${this.name} (a ${this.color} cat) is gracefully eating cat food.`);
    }
}


const myCat = new Cat("Whiskers", "black");
myCat.eat();  // Output: Whiskers (a black cat) is gracefully eating cat food.
myCat.meow(); // Output: black cat Whiskers says Meow!


const genericAnimal = new Animal("Lion");
genericAnimal.eat(); // Output: Lion is eating.
