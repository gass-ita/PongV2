class Bullet{

    constructor(x, y, angle, speed, damage, container){
        this.x = x;
        this.y = y;
        this.angle = angle;
        this.speed = speed;
        this.damage = damage;
        this.container = container;
        
        //angle mode degrees
        angleMode(DEGREES);
    }

    update(){
        this.tAngle = 360 - this.angle;
        this.x += this.speed * cos(this.tAngle);
        this.y += this.speed * sin(this.tAngle);
        this.checkCollision();
    }

    checkCollision(){
        //check if bullet is out of bounds
        //the x and y are the center of the bullet
        if(this.x < 0 || this.x > this.container.w || this.y < 0 || this.y > this.container.h){
            //set it to the edge of the screen
            if(this.x < 0){
                this.x = 0;
                this.angle = 180 - this.angle;
            }
            if(this.x > this.container.w){
                this.x = this.container.w;
                this.angle = 180 - this.angle;
            }
            if(this.y < 0){
                this.y = 0;
                this.angle = 360 - this.angle;
            }
            if(this.y > this.container.h){
                this.y = this.container.h;
                //TODO: the ball has to disappear
                this.container.removeBullet(this);
            }
            
        }

        //check collision with other blocks
        for(let i = 0; i < this.container.blocks.length; i++){
            let direction = this.container.blocks[i].checkCollision(this);
            if(direction != -1){
                console.log("hit the block i:", this.container.blocks[i].i, " j:", this.container.blocks[i].j, direction);
                this.container.blocks[i].hit(this);

                //make it bounce off the block in the right direction
                if(direction == 0){
                    this.angle = 180 - this.angle;
                }

                if(direction == 1){
                    this.angle = 360 - this.angle;
                }

                if(direction == 2){
                    this.angle = 180 - this.angle;
                }

                if(direction == 3){
                    this.angle = 360 - this.angle;
                }


            }
        }

    }


    show(){
        stroke(0);
        fill(255);
        ellipse(this.x, this.y, 10, 10);
    }

}