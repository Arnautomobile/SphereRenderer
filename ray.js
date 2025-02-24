class Ray
{
    constructor(origin = Vector3.zero, direction = Vector3.forward) {
        this.origin = origin.clone();
        this.direction = direction.clone().normalize();
    }

    clone() {
        return new Ray(this.origin.clone(), this.direction.clone());
    }

    offsetOrigin() {
        this.origin.add(this.direction.clone().scale(0.001));
        return this;
    }
}
