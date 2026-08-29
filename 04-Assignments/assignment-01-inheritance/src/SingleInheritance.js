// Single Inheritance
// Shape → Circle

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

const circle = new Circle("Red", 5);

console.log("----- SINGLE INHERITANCE -----");
circle.displayColor();
console.log("Circle Radius:", circle.radius);
console.log("Circle Area:", circle.calculateArea().toFixed(2));