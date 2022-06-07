window.addEventListener("load", function(){
    const canvas = document.getElementById("canvas1");
    const ctx = canvas.getContext("2d");

    canvas.width = 1000;
    canvas.height = 700;

    class InputHandler {
        constructor(){
            this.keys = [];
//Key pressed down event            
            window.addEventListener("keydown", (event) => {
                if(( event.key === "ArrowDown" || 
                     event.key === "ArrowUp" || 
                     event.key === "ArrowLeft" || 
                     event.key == "ArrowRight") 
                     && this.keys.indexOf(event.key) === -1){
                    this.keys.push(event.key);
                };
                // (if indexOf = -1) that means that element is not present in the array 
            });

// When the key is released/up 
            window.addEventListener("keyup", (event) => {
                if( event.key === "ArrowDown" || 
                    event.key === "ArrowUp" || 
                    event.key === "ArrowLeft" || 
                    event.key == "ArrowRight"){
                    this.keys.splice(this.keys.indexOf(event.key), 1);
                }
                // when a key is released if that key is ArrowDown find the index of that key inside this.keys array then splice to remove one element from the array 
            });

        }
    };// Apply's Event Listener to keyboard events and will hold an Array of all active keys
    //arrow functions don't bind their own 'this' but they inherit the one for their Parent Scope, this is called ( lexical scoping )  

    class Player {
        constructor(gameWidth, gameHeight){
            this.gameWidth = gameWidth;
            this.gameHeight = gameHeight;
            this.width = 200;
            this.height = 200;
            this.x = 0;
            this.y = this.gameHeight - this.height;
            this.image = document.getElementById("playerImage");
            this.frameX = 0;
            this.frameY = 0;
            this.speed = 0;
            this.velocityY = 0;
            this.gravity = 1;
        }
        draw(context){
            context.fillStyle = "white";
            context.fillRect(this.x, this.y, this.width, this.height);
            context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
            
            //Above code meaning = context.drawImage(source image, source x position, source y position, source image width, source image height, destination x, destination y, destination width, destination height= to place the cropped out rectangle)
        };

     // Draw's and update's the player   
        update(input){
            if(input.keys.indexOf("ArrowRight") > -1){
                this.speed = 5;
            } else if(input.keys.indexOf("ArrowLeft") > -1){
                this.speed = -5;
            } else if(input.keys.indexOf("ArrowUp") > -1 && this.onGround()){
                this.velocityY -= 31;
            } else{
                this.speed = 0;
            }
        // Horizontal movement
            this.x += this.speed;
            if(this.x < 0) this.x = 0;
             else if (this.x > this.gameWidth - this.width) this.x = this.gameWidth - this.width;
        
        // Vertical movement
            this.y += this.velocityY;
            if(!this.onGround()){
                this.velocityY += this.gravity;
                this.frameY = 1;
            }else{
                this.velocityY = 0;
                this.frameY = 0;
            }
            if(this.y > this.gameHeight - this.height) this.y = this.gameHeight - this.height;
        }
        onGround(){
            return this.y >= this.gameHeight - this.height;
        }
    };

// Draw endlessly scrolling background
    class Background {
        constructor(gameWidth, gameHeight){
            this.gameWidth = gameWidth;
            this.gameHeight = gameHeight;
            this.image = document.getElementById("backgroundImage");
            this.x = 0;
            this.y = 0;
            this.width = 2400;
            this.height = 720;
            this.speed = 3;
        }
        draw(context){
            context.drawImage(this.image, this.x, this.y, this.width, this.height);
            context.drawImage(this.image, this.x + this.width - this.speed, this.y, this.width, this.height);
        }
        update(){
            this.x -= this.speed;
            if(this.x < 0 - this.width) this.x = 0;
        }
    };
    
// Draw's and update's enemy
    class enemy {

    };

// function that adds and removes enemies
    function handleEnemies(){

       
    };
// function that displays score, you win, or game over
    function displayStatusText(){

    };

// Instantiation
    const input = new InputHandler();
    const player = new Player(canvas.width, canvas.height);
    const background = new Background(canvas.width, canvas.height);



    function animate(){
        ctx.clearRect(0, 0, canvas.width, canvas.height );
        background.draw(ctx);
        // background.update();
        player.draw(ctx);
        player.update(input);
        
        requestAnimationFrame(animate);
    };// function that runs 60 times a sec to updating and drawing the game

    animate();

});//load event waits for all assets to be fully loaded before it executes code in the callback function