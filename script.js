function gamestart() {
    document.getElementById("homepage").style.display = "none"
    document.getElementById("letter").style.display = "block"
    document.getElementById("time").style.display = "block"
    document.getElementById("points").style.display = "block"

    let canvas = document.getElementById('letter');
    let ctx = canvas.getContext('2d');
    let letterBoxSize = 50; //The size of the square inside which a letter will be displayed.
    let yaxis = 0; //setting the y axis to 0 to make the letterbox drop from the top.
    let clearingtime; //This is the variable in which the id of the set interval will be stored.
    let points = 0;
    let time = Number(prompt("How many seconds do you want to play")); //Takes the input from the user on how many seconds the user wants to play.
    let gametime = time; //Gametime variable is used to show the user the bal time.
    let speed = 10;

    if (time >= 10 && time <= 100) { //The minimum and the maximum time a user shoul play is 10 and 100.
        start();
    } else { //If the condition is not satisfied I again ask the user for another input.eventhen also if it is still wrong I refresh the page.
        time = Number(prompt("Invalid input please try again"));
        if (time >= 10 && time <= 100) {
            gametime = time;
            start();
        } else {
            window.location.reload(); //reloads the page
        }
    }

    function start() {
        droping();
        let firstgametime = gametime;
        let baltime = setInterval(() => { //This function keeps track of the time which is left for the user to play the game.
            //60 *20/100 // 12
            document.getElementById("time").innerHTML = "Balance Time: " + gametime;
            if (gametime === 0) { // checks if the game is over
                clearInterval(baltime);
                alert("Game over")
                window.location.reload() //reloads the page
            } //below the else if conditions checks the gametime for reaching a certain percentage and reduces the droping time accordingly so the game becomes even more intresting.
            else if (gametime < firstgametime * 80 / 100 && gametime >= firstgametime * 60 / 100) {
                speed = 4;
            } else if (gametime < firstgametime * 60 / 100 && gametime >= firstgametime * 40 / 100) {
                speed = 3;
            } else if (gametime < firstgametime * 40 / 100) {
                speed = 0.5;
            }
            gametime = gametime - 1;
        }, 1000);

        function drawletterbox(letter, x, y, size, color) {
            //draws a box which will contain the letter.
            //x decides the position of the box in x axis.
            //y decides  the position of the box in y axis
            ctx.fillStyle = "white"; //box color
            ctx.fillRect(x, y, size, size);
            ctx.strokeStyle = color; //border color
            ctx.strokeRect(x, y, size, size);
            ctx.fillStyle = color; //font color
            ctx.font = "25px aeriel" //font size
            ctx.fillText(letter, x + 20, y + 30); //position of the letter inside the box.
        }

        function generateletters() { //Generates random letters
            let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
            return characters.charAt(Math.floor(Math.random() *
                characters.length));
        }
        generatedletter = generateletters(); //Stores the random letter in variable

        function droping() { //Checks weather the generated letter and the key which is pressed are the same if yes I increase the score by 10 points.
            clearingtime = setInterval(() => createAndClear(), speed); //here the box is set to drop in the speed of 5 mili second.
            document.addEventListener('keydown', function (event) {
                if (event.key === generatedletter) {
                    points = points + 10;
                    document.getElementById("points").innerHTML = "Points: " + points;
                    clear(); //Then to make the box disappear I call the clear function.
                    repeat(); //and I also call the repeat function to have the next piece droping.
                }
            });

        }

        function createAndClear() { //This function helps the box in moving down.as this function clears  the box then increases the yaxis and  again creates the same box it appears as if the box is moving.
            clear();
            ++yaxis;
            create();
            if (yaxis === 400) { //and here I check if the box has touched the bottom of the canvas if yes I again call the repeat function to drop another box from the top.
                repeat();
            }
        }

        function clear() {
            drawletterbox(generatedletter, 125 - 1, yaxis - 1, letterBoxSize + 2, "white"); //Calls the letterbox function and changes the color to white to make it disappear.
        }

        function create() {
            drawletterbox(generatedletter, 125, yaxis, letterBoxSize, "red"); //Draws the letter box.
        }

        function repeat() {
            clearInterval(clearingtime); //Stops the set interval.as the id of the set interval will be stored in clearingtime.we stop the setinterval by passing the clearingtime into the clearinterval function.
            yaxis = 0; //Here we set the yaxis to be zero to make the next piece start droping from the top.
            generatedletter = generateletters(); //Then we again generate a new letter and call the droping function to make the box drop from the top. 
            droping();
        }
    }
}
