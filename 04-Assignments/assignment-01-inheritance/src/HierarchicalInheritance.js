// Hierarchical Inheritance
//       Shape
//      /     \
//   Circle   Rectangle

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

class Rectangle extends Shape {
    constructor(color, length, width) {
        super(color);
        this.length = length;
        this.width = width;
    }

    calculateArea() {
        return this.length * this.width;
    }
}

const circle = new Circle("Green", 3);
const rectangle = new Rectangle("Yellow", 6, 4);

console.log("----- HIERARCHICAL INHERITANCE -----");

console.log("Circle:");
circle.displayColor();
console.log("Circle Area:", circle.calculateArea().toFixed(2));

console.log("\nRectangle:");
rectangle.displayColor();
console.log("Rectangle Area:", rectangle.calculateArea());