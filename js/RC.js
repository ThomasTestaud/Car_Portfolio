class RC { //RC is the Radio Controller of all objects in the game. It has to be mapped to all objects created

    mapAccelerate(x, btn) {
        let input = document.querySelector(btn);
        input.addEventListener('click', function () {
            x.accelerate();
        })
        document.addEventListener("keydown", function (event) {
            if (event.code === "ArrowUp") {
                x.accelerate();
            }
        })
        document.addEventListener("keyup", function (event) {
            if (event.code === "ArrowUp") {
                x.toZero();
            }
        })
    }

    mapDecelerate(x, btn) {
        let input = document.querySelector(btn);
        input.addEventListener('click', function () {
            x.decelerate();
        })
        document.addEventListener("keydown", function (event) {
            if (event.code === "ArrowDown") {
                x.decelerate();
            }
        })
        document.addEventListener("keyup", function (event) {
            if (event.code === "ArrowDown") {
                x.toZero();
            }
        })
    }

    mapTurnLeft(x, btn) {
        let input = document.querySelector(btn);
        input.addEventListener('click', function () {
            x.turnLeft();
        })
        document.addEventListener("keydown", function (event) {
            if (event.code === "ArrowLeft") {
                x.turnLeft();
            }
        })
    }

    mapTurnRight(x, btn) {
        let input = document.querySelector(btn);
        input.addEventListener('click', function () {
            x.turnRight();
        })
        document.addEventListener("keydown", function (event) {
            if (event.code === "ArrowRight") {
                x.turnRight();
            }
        })
    }



}

export default RC
