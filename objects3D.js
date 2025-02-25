class Object3D
{
    constructor(position = Vector3.zero, color = Color.black, reflectivity = 0, transparency = 0) {
        this.position = position.clone();
        this.color = color.clone();
        this.reflectivity = reflectivity;
        this.transparency = transparency;
    }
}


class Sphere extends Object3D
{
    constructor(position, color, reflectivity, transparency, radius = 1) {
        super(position, color, reflectivity, transparency);
        this.radius = radius;
    }

    raycast(ray) {
        const result = {
            hit: false,
            point: Vector3.zero,
            normal: Vector3.zero,
            in: ray.direction,
            distance: 0,
            object: this,
        };

        var a = ray.direction.x * ray.direction.x + ray.direction.y * ray.direction.y + ray.direction.z * ray.direction.z;
        a *= a;
        var b = 2 * (ray.direction.x * (ray.origin.x - this.position.x)
                    + ray.direction.y * (ray.origin.y - this.position.y)
                    + ray.direction.z * (ray.origin.z - this.position.z));
        var c = ray.origin.x * ray.origin.x + this.position.x * this.position.x - 2 * ray.origin.x * this.position.x +
                ray.origin.y * ray.origin.y + this.position.y * this.position.y - 2 * ray.origin.y * this.position.y +
                ray.origin.z * ray.origin.z + this.position.z * this.position.z - 2 * ray.origin.z * this.position.z -
                this.radius * this.radius;
        
        var delta = b * b - 4 * a * c;

        if (delta < 0) {
            return result;
        }
        if (delta == 0) {
            result.distance = -b / 2 * a;
        }
        else {
            var sqrtDelta = Math.sqrt(delta);
            var solution1 = (-b - sqrtDelta) / 2 * a;
            var solution2 = (-b + sqrtDelta) / 2 * a;

            if (solution1 < 0) {
                result.distance = solution2;
            }
            else if (solution2 < 0) {
                result.distance = solution1;
            }
            else {
                result.distance = solution1 < solution2 ? solution1 : solution2;
            }
        }

        if (result.distance < 0) {
            return result;
        }
        
        result.hit = true;
        result.point = ray.origin.clone().add(ray.direction.clone().scale(result.distance));
        result.normal = result.point.clone().subtract(this.position).normalize();

        return result;
    }
}



class Plane extends Object3D
{
	constructor(position, color, reflectivity, transparency, normal = Vector3.up) {
        super(position, color, reflectivity, transparency);
		this.normal = normal.clone().normalize();
	}
	
	raycast(ray) {
		const result = {
			hit: false,
			point: Vector3.zero,
			normal: Vector3.zero,
            in: ray.direction,
			distance: 0,
            object: this
		}

		var numerator = this.normal.dot(this.position) - (this.normal.dot(ray.origin));
		var denominator = this.normal.dot(ray.direction);
		var alpha = numerator / denominator;

		if (alpha > 0 && this.normal.dot(ray.direction) < 0) {
			result.hit = true;
			result.point = ray.origin.clone().add(ray.direction.clone().scale(alpha));
			result.normal = this.normal;
			result.distance = alpha;
		}
		
		return result;
	}
}