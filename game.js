window.addEventListener("load", function(){
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

    canvas.width = 800;
    canvas.height = 700;

    class InputHandler {
        constructor(){
            this.keys = [];

            window.addEventListener("keydown", (event) => {
                if((event.key === "ArrowDown" || event.key === "ArrowUp" || event.key === "ArrowLeft" || event.key == "ArrowRight") && this.keys.indexOf(event.key) === -1){
                    this.keys.push(event.key);
                };
                // (if indexOf = -1) that means that element is not present in the array
                console.log(event.key, this.keys);
            });

            window.addEventListener("keyup", (event) => {
                if(event.key === "ArrowDown"){
                    this.keys.splice(this.keys.indexOf(event.key), 1);
                }
                console.log(event.key, this.keys);
                // when a key is released if that key is ArrowDown find the index of that key inside this.keys array then splice to remove one element from the array 
            });

        }
    };// Apply's Event Listener to keyboard events and will hold an Array of all active keys
    //arrow functions don't bind their own 'this' but they inherit the one for their Parent Scope, this is called ( lexical scoping )  

    class Player {

    };// Draw's and update's the player

    class Background {

    };// Draw endlessly scrolling background

    class enemy {

    };// Draw's and update's enemy

    function handleEnemies(){

        // function that adds and removes enemies
    };

    function displayStatusText(){

    };// function that displays score, you win, or game over

const input = new InputHandler();

    function animate(){

    };// function that runs 60 times a sec to updating and drawing the game


});//load event waits for all assets to be fully loaded before it executes code in the callback function