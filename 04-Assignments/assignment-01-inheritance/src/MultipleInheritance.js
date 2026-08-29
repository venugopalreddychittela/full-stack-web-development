// Multiple Inheritance using Mixins
// Shape + Drawable → GraphicShape

class Shape {
    constructor(color) {
        this.color = color;
    }

    displayColor() {
        console.log("Shape Color:", this.color);
    }
}

// Mixin object
const Drawable = {
    draw() {
        console.log("Shape is drawn successfully.");
    }
};

class GraphicShape extends Shape {
    constructor(color) {
        super(color);
    }
}

// Adding Drawable methods to GraphicShape
Object.assign(GraphicShape.prototype, Drawable);

const graphicShape = new GraphicShape("Purple");

console.log("----- MULTIPLE INHERITANCE -----");
graphicShape.displayColor();
graphicShape.draw();