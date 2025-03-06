
class Particle {
    
    static GRAVITY;
    static FRICTION;

    #position;
    #speed;
    #size;
    #gravity;
    #color;
    

    constructor(x, y, energy, maxSize, c) {

        Particle.DAMPING = createVector(1.0, 0.9)
;       Particle.FRICTION = 0.4;
        this.#gravity = createVector(0.0, 0.02);


        if (typeof x === 'number' && typeof y === 'number'){
            this.#position = createVector(x, y);
            console.log('x and y are both numbers');
        } else {
            this.#position = createVector(width/2.0, height/2.0);
            console.warn('x and y are not both numbers');
        }

        if (c) {
            if (c instanceof p5.Color) {
                this.#color = c;
            } else {
                this.#color = color(255, 255, 0);
            }
        } else {
            this.#color = color(255);
        }


        let speedX = random(-energy, energy);
        let speedY = random(-energy, -0.01);
        this.#speed = createVector(speedX, speedY);
        this.#size = random(1, maxSize);

    }

    draw() {
        this.#render();
        this.#move();
        this.#applyForces();
        this.#bounce();
    }

    #render() {
        ellipse(this.#position.x, this.#position.y, this.#size, this.#size);
    }

    #move() {
        this.#position.add(this.#speed);
    }

    #applyForces() {
        this.#speed.add(this.#gravity);
    }

    #bounce() {
        let r = this.#size / 2;
        if (this.#position.x >= (width - r || (this.#position.x < r))) {
            this.#speed.x = -this.#speed.x;
            this.#speed.x *= Particle.FRICTION;
            this.#position.x = constrain(this.#position.x, r, (width-r));
        }

        if (this.#position.y >= (height -r)) {
            this.#speed.y = - this.#speed.y;
            this.#speed.mult(Particle.DAMPING);
            this.#speed.x *= Particle.FRICTION;
            this.#speed.y *= Particle.FRICTION;
            this.#position.y = constrain(this.#position.y, r, (height-r));

        } else if (this.#position.y <= r) {
            this.#speed.y = -this.#speed.y;
            this.#position.y = constrain(this.#position.y, r, (height - r));
        
        }

        if (this.#speed.y > -0.001 && this.#speed.y < 0.001) {
            this.#speed.set(0,0);
            this.#gravity = 0;
        }
    }
}
