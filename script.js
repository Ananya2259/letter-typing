let canvas = document.getElementById('letter');
let ctx = canvas.getContext('2d');
let letterBoxSize = 50;
let yaxis = 0
let clearingtime;
let points = 0;
let time = Number(prompt("How many seconds do you want to play"));
let gametime = time;

if (time >= 10 && time <= 100) {
    start();
} else {
    time = Number(prompt("Invalid input please try again"));
    if (time >= 10 && time <= 100) {
        gametime = time;
        start();
    } else {
        window.location.reload();
    }
}

function start() {
    droping();
    let baltime = setInterval(() => {

        document.getElementById("time").innerHTML = "Balance Time: " + gametime;
        if (gametime === 0) {
            clearInterval(baltime);
            alert("Game over")
            window.location.reload()
        }
        gametime = gametime - 1;
    }, 1000);

    function drawletterbox(letter, x, y, size, color) {
        ctx.fillStyle = "white";
        ctx.fillRect(x, y, size, size);
        ctx.strokeStyle = color;
        ctx.strokeRect(x, y, size, size);
        ctx.fillStyle = color;
        ctx.font = "25px aeriel"
        ctx.fillText(letter, x + 20, y + 30);
    }

    function generateletters() {
        let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        return characters.charAt(Math.floor(Math.random() *
            characters.length));
    }
    generatedletter = generateletters();

    function droping() {
        document.addEventListener('keydown', function (event) {
            if (event.key === generatedletter) {
                points = points + 10;
                document.getElementById("points").innerHTML = "Points: " + points;
                clear();
                repeat();
            }
        });
        clearingtime = setInterval(() => createAndClear(), 5);
    }

    function createAndClear() {
        clear();
        ++yaxis;
        create();
        if (yaxis === 400) {
            repeat();
        }
    }

    function clear() {
        drawletterbox(generatedletter, 125 - 1, yaxis - 1, letterBoxSize + 2, "white");
    }

    function create() {
        drawletterbox(generatedletter, 125, yaxis, letterBoxSize, "red");
    }

    function repeat() {
        clearInterval(clearingtime);
        yaxis = 0;
        generatedletter = generateletters();
        droping();
    }
}
