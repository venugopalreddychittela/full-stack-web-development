// Hybrid Inheritance
//
//        Shape
//       /     \
//   Circle   Polygon
//               |
//           Rectangle

class Shape {
    constructor(color) {
        this.color = color;
    }

    displayColor() {
        console.log("Shape Color:", this.color);
    }
}

class Circle extends Shape {
    constructor(color, radius) {
        super(color);
        this.radius = radius;
    }

    calculateArea() {
        return Math.PI * this.radius * this.radius;
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

const circle = new Circle("Orange", 4);
const rectangle = new Rectangle("Pink", 4, 8, 6);

console.log("----- HYBRID INHERITANCE -----");

console.log("Circle:");
circle.displayColor();
console.log("Circle Area:", circle.calculateArea().toFixed(2));

console.log("\nRectangle:");
rectangle.displayColor();
rectangle.displaySides();
console.log("Rectangle Area:", rectangle.calculateArea());