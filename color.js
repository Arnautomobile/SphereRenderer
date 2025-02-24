class Color
{
    constructor(r = 0, g = 0, b = 0) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.reRange();
    }

    static white = new Color(255,255,255);
    static black = new Color(0,0,0);
    static red = new Color(255,0,0);
    static green = new Color(0,255,0);
    static blue = new Color(0,0,255);


    //-----------------------------------------------------------------------------
    clone() {
        return new Color(this.r, this.g, this.b, this.a);
    }

    reRange() {
        this.r = Math.max(Math.min(this.r,255),0);
        this.g = Math.max(Math.min(this.g,255),0);
        this.b = Math.max(Math.min(this.b,255),0);
        return this;
    }

    //-----------------------------------------------------------------------------
    add(other) {
        this.r += other.r;
        this.g += other.g;
        this.b += other.b;
        this.reRange();
        return this;
    }

    //-----------------------------------------------------------------------------
    multiply(factor) {
        if (factor < 0)
            return this;
        this.r = Math.min(this.r * factor, 255);
        this.g = Math.min(this.g * factor, 255);
        this.b = Math.min(this.b * factor, 255);
        return this;
    }

    //-----------------------------------------------------------------------------
    divide(factor) {
        if (factor <= 0)
            return this;
        this.r = this.r / factor;
        this.g = this.g / factor;
        this.b = this.b / factor;
        return this;
    }

    //-----------------------------------------------------------------------------
    addWithCoefficient(other, coef) {
        if (coef > 1 || coef < 0)
            return this;
        let coef2 = 1 - coef;
        this.r = this.r * coef2 + other.r * coef;
        this.g = this.g * coef2 + other.g * coef;
        this.b = this.b * coef2 + other.b * coef;
        this.reRange();
        return this;
    }

    //-----------------------------------------------------------------------------
    static mixFourPixels(c1, c2, c3, c4) {
        let r = (c1.r + c2.r + c3.r + c4.r) / 4;
        let g = (c1.g + c2.g + c3.g + c4.g) / 4;
        let b = (c1.b + c2.b + c3.b + c4.b) / 4;
        return new Color(r,g,b);
    }
}