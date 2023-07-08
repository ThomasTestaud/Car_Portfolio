class Car {

    used = true;
    acceleration = 0.1;
    speed = 0;
    gear = 0;
    positionX = 0;
    positionY = 0;
    direction = 90;
    model;
    color;

    on = true;
    interval;

    constructor(x, y, direction, model, color) {
        this.positionX = x;
        this.positionY = y;
        this.direction = direction;
        this.model = model;
        this.color = color;

        this.for = false;
        this.refresh();
    }



    accelerate() {
        //console.log('forward');
        this.gear = 4; //Change the target speed on 1
        this.inercia(); //Call inertia() to reach that new target speed
    }

    toZero() {
        this.gear = 0;
        this.inercia();
    }

    decelerate() {
        //console.log('backward');
        this.gear = -4; //Change the target speed on 1
        this.inercia(); //Call inertia() to reach that new target speed

    }

    turnLeft() {
        if (this.speed !== 0) { //And car is on and is moving
            //console.log('left');
            let i = 0;
            let turn = setInterval(() => {
                i++;
                this.direction -= 1; //Change direction of 1 deg every 10 millisecond
                if (i >= 30) { //Stop turning when 30 is reached
                    clearInterval(turn);
                }
            }, 10)
        }
    }

    turnRight() {
        if (this.speed !== 0) { //And car is on and is moving
            //console.log('right');
            let i = 0;
            let turn = setInterval(() => {
                i++;
                this.direction += 1; //Change direction of 1 deg every 10 millisecond
                if (i >= 30) { //Stop turning when 30 is reached
                    clearInterval(turn);
                }
            }, 10)
        }
    }

    refresh() { //Display the position of the car on the screen
        this.calculateDirection();
    }

    lights() { //Turn on the lights of the car

    }

    engine() { //This function calculate the position of the car on the X and Y axes
        this.interval = setInterval(() => {
            //console.log('engine run');
            this.calculateDirection();
            this.positionX += this.Xcoef;
            this.positionY -= this.Ycoef;
        }, 35);
    }

    inercia() { //This function create the inertia of the car
        //console.log('innertia');
        if (this.speed <= this.gear) {
            let run = setInterval(() => {
                //console.log('innertia run');
                this.speed += this.acceleration; //Increment the speed every 35 millisecond by the amount of acceleration until the target speed has been reached
                if (this.speed >= this.gear) {
                    this.speed = this.gear;
                    clearInterval(run);
                }
            }, 35)
        }
        else if (this.speed > this.gear) { //Decrement the speed every 35 millisecond by the amount of acceleration until the target speed has been reached
            let run = setInterval(() => {
                this.speed -= this.acceleration;
                if (this.speed <= this.gear) {
                    this.speed = this.gear;
                    clearInterval(run);
                }
            }, 35)
        }
    }

    calculateDirection() { //This function calculate the Ycoef and Xcoef by taking the speed and direction as inputs
        this.Ycoef = this.speed * (Math.cos(this.direction * Math.PI / 180));
        this.Xcoef = this.speed * (Math.sin(this.direction * Math.PI / 180));
    } //Then Ycoef and Xcoef are used in the engine() function to calculate the position of the car on the page



}

export default Car
