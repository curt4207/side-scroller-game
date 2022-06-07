// Resources used Franks Laboratory 

window.addEventListener("load", function(){
    const canvas = document.getElementById("canvas1");
    const ctx = canvas.getContext("2d");

// Change to fit any screen size with some padding because i like the border outline so it works better
    canvas.width = 1200;
    canvas.height = 700;

    let enemies = [];
    let score = 0;
    let gameOver = false;

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
    };
    // Apply's Event Listener to keyboard events and will hold an Array of all active keys
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
            this.maxFrame = 8;
            this.enemyFps = 20;
            this.frameTimer = 0;
            this.frameInterval = 1000/this.enemyFps; 
            this.frameX = 0;
            this.frameY = 0;
            this.speed = 0;
            this.velocityY = 0;
            this.gravity = 1;
        }
        draw(context){
            // context.strokeStyle = "white";
            // context.beginPath();
            // context.arc(this.x + this.width/2, this.y + this.height/2, this.width/2, 0, Math.PI * 2);
            // context.stroke();
            // context.strokeStyle = "blue";
            // context.beginPath();
            // context.arc(this.x , this.y , this.width/2, 0, Math.PI * 2);
            // context.stroke();

            context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
            
    //Above code meaning = context.drawImage(source image, source x position, source y position, source image width, source image height, destination x, destination y, destination width, destination height= to place the cropped out rectangle)
        };
  
        update(input, deltaTime, enemies){
    // Collision detection
            enemies.forEach(enemy =>{
                const dx = (enemy.x + enemy.width/2) - (this.x + this.width/2);
                const dy = (enemy.y + enemy.height/2) - (this.y + this.height/2);
                const distance = Math.sqrt(dx * dx + dy *dy);
                if(distance < enemy.width/2 + this.width/2){
                    gameOver = true;
                }
            })    
    // Sprite animation
            if(this.frameTimer > this.frameInterval){
                if(this.frameX >= this.maxFrame) this.frameX = 0;
                else this.frameX ++;
                this.frameTimer = 0;
            } else {
                this.frameTimer += deltaTime;
            }
            

    // Player Controls    
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
                this.maxFrame = 5;
                this.frameY = 1;
            }else{
                this.velocityY = 0;
                this.maxFrame = 8;
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
    class Enemy {
        constructor(gameWidth, gameHeight){
            this.gameWidth = gameWidth;
            this.gameHeight = gameHeight;
            this.width = 160;
            this.height = 119;
            this.image = document.getElementById("enemyWorm");
            this.x = this.gameWidth;
            this.y = this.gameHeight -this.height;
            this.maxFrame = 5;
            this.enemyFps = 20;
            this.frameTimer = 0;
            this.frameInterval = 1000/this.enemyFps; 
            this.frameX = 0;
            this.speed = 8;
            this.markedForDeletion = false;
        }
        draw(context){
            // context.strokeStyle = "white";
            // context.beginPath();
            // context.arc(this.x + this.width/2, this.y + this.height/2, this.width/2, 0, Math.PI * 2);
            // context.stroke();
            // context.strokeStyle = "blue";
            // context.beginPath();
            // context.arc(this.x , this.y , this.width/2, 0, Math.PI * 2);
            // context.stroke();
            context.drawImage(this.image, this.frameX * this.width, 0, this.width, this.height, this.x, this.y, this.width, this.height);
        }
        update(deltaTime){
            if(this.frameTimer > this.frameInterval){
                if(this.frameX >= this.maxFrame) this.frameX = 0;
                else this.frameX ++;
                this.frameTimer = 0;
            } else {
                this.frameTimer += deltaTime;
            }
            this.x -= this.speed;
            if(this.x < 0 - this.width) {
                this.markedForDeletion = true;
                score ++;
            }
        }
    };

// function that adds and removes enemies     
    function handleEnemies(deltaTime){
       if(enemyTimer > enemyInterval + randomEnemyInterval){
        enemies.push(new Enemy(canvas.width, canvas.height));
        console.log(enemies)
        randomEnemyInterval = Math.random() * 1000 + 500;
        enemyTimer = 0;
       }else{
           enemyTimer += deltaTime;
       }
        enemies.forEach(enemy => {
            enemy.draw(ctx);
            enemy.update(deltaTime);
        })
        enemies = enemies.filter(enemy => !enemy.markedForDeletion);
    };

// function that displays score, you win, or game over
    function displayStatusText(context){
        context.save();
        context.shadowColor = "blue";
        context.shadowBlur = 15;
        context.fillStyle = "black";
        context.font = "40px fantasy";
        context.fillText("Score: " + score, 20, 50);
        context.restore();
        if (gameOver){
            context.save();
            context.shadowColor = "white";
            context.shadowBlur = 20;
            context.textAlign = "center";
            context.fillStyle = "black";
            context.font = "25px fantasy";
            context.fillText("Game Over, try again!",canvas.width/2, 200);
            context.restore();
        }
    };

// Instantiation - the creation of an object
    const input = new InputHandler();
    const player = new Player(canvas.width, canvas.height);
    const background = new Background(canvas.width, canvas.height);

// Helper Variable that add's a new Enemy to the array every few seconds, using timestamps and delta time.
// Enemy timer counts from 0ms to a certain number then trigger's an event, then resets back to 0ms.
// Enemy interval counts when an enemy will be added to the game im ms.
    let previousTime = 0;
    let enemyTimer = 0; 
    let enemyInterval = 1500;
    let randomEnemyInterval = Math.random() * 1000 + 500;

    function animate(timeStamp){
        const deltaTime = timeStamp - previousTime;
        // Gives the average of difference used to estimate the time for future and past (the time since previous frame).
        previousTime = timeStamp;


        ctx.clearRect(0, 0, canvas.width, canvas.height);
        background.draw(ctx);
        // background.update();
        player.draw(ctx);
        player.update(input, deltaTime, enemies);
        handleEnemies(deltaTime);
        displayStatusText(ctx);
        
        if(!gameOver) requestAnimationFrame(animate);
    };// function that runs 60 times a sec to updating and drawing the game

    animate(0);

});//load event waits for all assets to be fully loaded before it executes code in the callback function