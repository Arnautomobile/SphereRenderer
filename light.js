class Light
{
    constructor(position = Vector3.zero, direction = Vector3.zero, color = Color.white, intensity = 1, isDirectional = false) {
        this.position = position.clone();
        this.direction = direction.clone();
        this.intensity = intensity;
        this.isDirectional = isDirectional;
        this.rFactor = color.r / 255 * intensity;
        this.gFactor = color.g / 255 * intensity;
        this.bFactor = color.b / 255 * intensity;
    }

    getDirection(point) {
        if (this.isDirectional)
            return this.direction.clone().negate();
        return Vector3.fromToNormalized(point, this.position);
    }

    getLitColor(color, intensity) {
        return new Color(color.r * this.rFactor * intensity,
                         color.g * this.gFactor * intensity,
                         color.b * this.bFactor * intensity);
    }
}