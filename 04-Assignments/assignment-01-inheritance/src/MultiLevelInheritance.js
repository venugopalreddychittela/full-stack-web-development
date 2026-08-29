// Multilevel Inheritance
// Shape → Polygon → Rectangle

class Shape {
    constructor(color) {
        this.color = color;
    }

    displayColor() {
        console.log("Shape Color:", this.color);
    }
}

class Polygon extends Shape {
    constructor(color, sides) {
        super(color);
        this.sides = sides;
    }

    displaySides() {
        console.log("Number of Sides:", this.sides);
    }
}

class Rectangle extends Polygon {
    constructor(color, sides, length, width) {
        super(color, sides);
        this.length = length;
        this.width = width;
    }

    calculateArea() {
        return this.length * this.width;
    }
}

const rectangle = new Rectangle("Blue", 4, 10, 5);

console.log("----- MULTILEVEL INHERITANCE -----");
rectangle.displayColor();
rectangle.displaySides();
console.log("Rectangle Area:", rectangle.calculateArea());