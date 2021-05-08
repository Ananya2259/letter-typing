let sound =  document.getElementById("sound")
let help  =  document.getElementById("help")
var music = document.getElementById("background-music")

function backFunction(){//Helps in displaying and controlling the back button given in each page.
    document.getElementById("btn-div").style.display="block"
    document.getElementById("help-text").style.display="none"
    document.getElementById("backbtn").style.display="none"   
    document.getElementById("music-on-off").style.display="none"   

}
function on(){//Turns on the music.
    document.getElementById("background-music").play()
}
function off(){//Stops the musoc.
    document.getElementById("background-music").pause();
}

function helpText()//Helps in displaying the help page,
{
    document.getElementById("btn-div").style.display="none"  
    document.getElementById("help-text").style.display="block"
    document.getElementById("backbtn").style.display="block"
}
function startMusic(){//Helps in Displaying the sound control page.
    document.getElementById("btn-div").style.display="none"
    document.getElementById("music-on-off").style.display="block"
    document.getElementById("music-on-off").style.color="white"
    document.getElementById("backbtn").style.display="block"  
}
function gamestart() {//Helps in displaying the game page.
    document.getElementById("homepage").style.display = "none"
    document.getElementById("letter").style.display = "block"
    document.getElementById("time").style.display = "block"
    document.getElementById("points").style.display = "block"
    
    let canvas = document.getElementById('letter');
    let ctx = canvas.getContext('2d');
    let letterBoxSize = 50; //The size of the square inside which a letter will be displayed.
    let yaxis = 0; //Setting the y axis to 0 to make the letterbox drop from the top.
    let yaxis2 = -50; //Setting the y axis2 to -50 to make the 2nd letterbox drop from this axis.
    let yaxis3 = -100; //Setting the y axis3 to 100 to make the 3rd letterbox drop from theis axis.
    let xaxis = 125;//This is the default xaxix and all the boxes droping in 1st speed will drop in this x axis only.
    let clearingTime; //This is the variable in which the id of the set interval will be stored.
    let points = 0;//Stores the points.
    let time = Number(prompt("How many seconds do you want to play -->max:100-->min:10")); //Takes the input from the user on how many seconds the user wants to play.
    let gameTime = time; //Gametime variable is used to show the user the balance time the user has for playing this game.
    let speed = 10;//The default speed or the first speed in which the game will start.
    let speedChange = false;//This boolean variable is used to clear the canvas whenever the speed is changing .
    

    if (time >= 10 && time <= 100) { //The minimum and the maximum time a user should play this game is 10 and 100.
        start();
    } else { //If the condition is not satisfied I again ask the user for another input.eventhen also if it is still wrong I refresh the page.
        time = Number(prompt("Invalid input please try again"));
        if (time >= 10 && time <= 100) {
            gameTime = time;
            start();
        } else {
            window.location.reload(); //reloads the page
        }
    }

    function start() {//This is the function in which all the gaming functions will be excecuted.
        droping();
        let firstgameTime = gameTime;//This variable will help us in calculating the percentage from the time given from the user so that we can increase the  speed according to the percentage.
        let baltime = setInterval(() => { //This function keeps track of the time which is left for the user to play the game.
            document.getElementById("time").innerHTML = "Balance Time: " + gameTime;
            if (gameTime === 0) { // checks if the game is over
                clearInterval(baltime);
                alert("Game over")
                window.location.reload() //reloads the page
            } //below the else if conditions checks the gameTime for reaching a certain percentage and increases the droping time accordingly so the game becomes even more intresting.
            else if (gameTime < firstgameTime * 80 / 100 && gameTime >= firstgameTime * 60 / 100) {
                speed = 5;
            } else if (gameTime < firstgameTime * 60 / 100 && gameTime >= firstgameTime * 40 / 100) {
                speed = 3;
            } else if (gameTime < firstgameTime * 40 / 100) {
                speed = 1.5;
            }
            gameTime = gameTime - 1;//Here we minus the gametime by minus one  so that we can show the balance time to the user.
        }, 1000);

        function droping() {
            clearingTime = setInterval(() => createAndClear(), speed); //Here the box is set to drop in the speed of  the mili second which will be stored in the variable "speed" and also the createandclear function is called.
            document.addEventListener('keydown', function (event) { //The set interval function and eventlistener function will work parallely with no intersection between them.
                if (speed == 3) {//The eventlistener function mainly focuses on the shooting object.
                    xaxis = 100;//The xaxis is altered according to the speed in which the boxes will be droping so that the shooting object can shoot the laser correctly.
                } else if (speed == 1.5) {
                    xaxis = 50;
                }

                if (event.key === generatedLetter) {//If the speed is the default speed(1st speed)and the user presses the key which is equal to the generated letter
                    shoot(xaxis, yaxis);//The shoot function is called so that the shooting object will shoot a laser to the xaxis and the yaxis given.
                    canvasUpdate();//We then call the canvasupdate to clear the laser and increase the point.
                    nextLetterBox(generatedLetter);//Then we call the nextLetter box function and send the generated letter as paramater so that we can identify which key is peing pressed.
                }
                if (speed == 3) {//If the speed is the 2nd speed(3rd speed)and the user presses the key which is equal to the generated letter2
                    if (event.key === generatedLetter2) {
                        shoot(200, yaxis2);//The shoot function is called so that the shooting object will shoot a laser to the xaxis and the yaxis given.
                        canvasUpdate();//We then call the canvasupdate to clear the laser and increase the point.
                        nextLetterBox(generatedLetter2);//Then we call the nextLetter box function and send the generated letter as paramater so that we can identify which key is peing pressed.
                    }
                }
                if (speed == 1.5) {//If the speed is the last speed(1.5 speed)and the user presses the key which is equal to the generated letter2 and aslo presses another key which is equal to generatedletter 3 
                    //The below to if conditions will call shoot function so that the shooting object will shoot a laser to the xaxis and the yaxis given.
                    //We then call the canvasupdate to clear the laser and increase the point.
                    //Then we call the nextLetter box function and send the generated letter as paramater so that we can identify which key is peing pressed.
                    if (event.key === generatedLetter2) {
                        shoot(130, yaxis2);
                        canvasUpdate();
                        nextLetterBox(generatedLetter2);
                    }
                    if (event.key === generatedLetter3) {
                        shoot(200, yaxis3);
                        canvasUpdate();
                        nextLetterBox(generatedLetter3);
                    }
                }
            });

        }

        function createAndClear() { //This function helps the box in moving down.as this function clears  the box then increases the yaxis and  again creates the same box it appears as if the box is moving.
            clear("clicked"); //To clear the previous letterbox only we send clicked as the parameter.
            ++yaxis; //
            if (speed == 3) {
                ++yaxis2;
                if (speedChange == false) //to clear the canvas  once when the speed changes from the default speed to speed 3.
                {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    speedChange = true;
                }
            }
            if (speed == 1.5) {
                ++yaxis2;
                ++yaxis3;
                if (speedChange == true) {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    speedChange = false; //to clear the canvas  once when the speed changes from the  speed 3 to speed 1.5
                }
            }
            create();//Create function is called to create the letterbox.
            if (yaxis === 350) { //and here I check if the box has touched the bottom of the canvas if yes I again call the nextLetterBox function to drop another box from the top.
                clear("boundary");
                nextLetterBox(generatedLetter);
            }
            if (yaxis2 === 350) {
                clear("boundary");
                nextLetterBox(generatedLetter2);
            }
            if (yaxis3 === 350) {
                clear("boundary");
                nextLetterBox(generatedLetter3);
            }
        }

        function clear(param) {//This function recieves a parameter which will either be a boundry or clicked.
            //Boundary means that a letter box has reached the end of the canvas so that we can clear the entire canvas.
            //Clicked means the box has been clicked or pressed so that we can clear only the space which was occupied by the particular letter box.
            if (param == "boundary") {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            } else if (param == "clicked") {
                if (speed > 3) {
                    ctx.clearRect(125 - 2, yaxis - 2, 50 + 3, 50 + 3);
                }
                if (speed == 3) {
                    ctx.clearRect(100 - 2, yaxis - 2, 50 + 3, 50 + 3);
                    ctx.clearRect(200 - 2, 0, canvas.width, yaxis2);
                }
                if (speed == 1.5) {
                    ctx.clearRect(50 - 2, yaxis - 2, 50 + 3, 50 + 3);
                    ctx.clearRect(130 - 2, 0, canvas.width, yaxis2);
                    ctx.clearRect(200 - 2, 0, canvas.width, yaxis3);
                }
            }
        }

        function generateLetters() { //Generates random letters
            let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
            return characters.charAt(Math.floor(Math.random() *
                characters.length));
        }
        //Generates three random letters and stores it in three variables
        generatedLetter = generateLetters(); 
        generatedLetter2 = generateLetters(); 
        generatedLetter3 = generateLetters(); 

        function create() {//Draws the letter box.
            if (speed > 3) {
                drawLetterBox(generatedLetter, 125, yaxis, letterBoxSize, "red"); 
            }
            if (speed == 3) {
                drawLetterBox(generatedLetter, 100, yaxis, letterBoxSize, "red"); 
                drawLetterBox(generatedLetter2, 200, yaxis2, letterBoxSize, "red"); 
            }
            if (speed == 1.5) {
                drawLetterBox(generatedLetter, 50, yaxis, letterBoxSize, "red"); 
                drawLetterBox(generatedLetter2, 130, yaxis2, letterBoxSize, "red"); 
                drawLetterBox(generatedLetter3, 200, yaxis3, letterBoxSize, "red"); 
            }

        }

        function drawLetterBox(letter, x, y, size, color) {
            //draws a box which will contain the letter.
            //x decides the position of the box in x axis.
            //y decides  the position of the box in y axis
            ctx.lineWidth = 2; //stroke width
            ctx.fillStyle = "white"; //box color
            ctx.fillRect(x, y, size, size);
            ctx.strokeStyle = color; //border color
            ctx.strokeRect(x, y, size, size); //border
            ctx.fillStyle = color; //font color
            ctx.font = "25px Arial" //font size
            ctx.fillText(letter, x + 20, y + 30); //position of the letter inside the box.

            ctx.beginPath();//Helps in drawing a triangle.
            ctx.moveTo(145, 420);
            ctx.lineTo(120, 445);
            ctx.lineTo(170, 445);
            ctx.closePath();//draws the third line
            ctx.strokeStyle = 'black'; //triangle border color
            ctx.stroke(); //triangle border
            // the fill color
            ctx.fillStyle = "red";
            ctx.fill();
        }

        function shoot(endX, endY) {//Shoots a line or laser to the given target.
            ctx.lineWidth = 4;
            ctx.moveTo(145, 420);//Starting point
            ctx.lineTo(endX + 20, endY + 50);//This endx+20 and endY+20 are the ending coordinates which will help in shooting the laser correctly to a point where the box is positioned
            ctx.strokeStyle = "black";
            ctx.stroke();
        }

        function canvasUpdate() {//After shooting function this function is called to clear the laser and increase the point.
            pointIncrease();
            setTimeout(() => {
                clearLaser();
                clear("clicked");
            }, 200);
        }

        function clearLaser() {//If I use the clearect directly it was not working so I used it by putting it in a function.
            ctx.clearRect(0, 0, canvas.width, canvas.height)
        }

        function pointIncrease() {
            points = points + 10;//Increases the point and passes it through the inner html to display.
            document.getElementById("points").innerHTML = "Points: " + points;
            clear(); //Then to make the box disappear I call the clear function.
        }

        function nextLetterBox(letter) { //This function helps to find which letter is being clicked.
            clearInterval(clearingTime); //Stops the set interval.as the id of the set interval will be stored in clearingTime.we stop the setinterval by passing the clearingTime into the clearinterval function.
          
            if (letter == generatedLetter) {
                yaxis = 0; //To generate the letterbox again from the top.
                generatedLetter = generateLetters();//Then we again randomly generate letters and store it in the respective variable.
            }
            if (letter == generatedLetter2) {
                yaxis2 = -50;
                generatedLetter2 = generateLetters();
            }
            if (letter == generatedLetter3) {
                yaxis3 = -100;
                generatedLetter3 = generateLetters();
            }
            droping();// we again call the dropping function.
        }
    }
}
