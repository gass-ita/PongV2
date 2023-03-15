class Container{

    constructor(w, h, blockInV){
        this.blocks = [];
        this.bullets = [];
        this.bulletsContainer;
        this.w = w;
        this.h = h;
        this.blockInV = blockInV;
        this.aimMode = false;
    }

    createDefaultBlocks(){
        //make a line of blocks on top
        for(let i = 0; i < this.blockInV; i++){

            this.createBlock(0, i, 60);
        }
    }

    step(){
        this.blocks.forEach((item) => {
            item.step();
        });
    }

    show(){
        push();
        angleMode(DEGREES);
        this.blocks.forEach((item) => {
            item.show();
        });
        this.bullets.forEach((item) => {
            item.show();
        });
        if(this.bulletsContainer)
            this.bulletsContainer.show()
        
        if(this.aimMode && this.bulletsContainer){
            stroke(0);
            //draw a line from the bulletsContainer going up to the direction of the mouse but it is under
            let angle = atan2(mouseY - this.bulletsContainer.y + 5, mouseX - this.bulletsContainer.x + 5) ;
            angle = 180 + angle;
            line(this.bulletsContainer.x + 5, this.bulletsContainer.y + 5, this.bulletsContainer.x + cos(angle) * 100, this.bulletsContainer.y + sin(angle) * 100);
        }
        pop();
    }

    update(){
        this.bullets.forEach((item) => {
            item.update();
        });
    }

    addBlock(item){
        this.blocks.push(item);
    }

    removeBlock(item){
        this.blocks = this.blocks.filter((i) => i !== item);
    }

    createBlock(i, j, count){
        let block = new Block(i, j, count, this, this.h/this.blockInV);
        this.addBlock(block);
    }

    addBullet(bullet){
        this.bullets.push(bullet);
    }

    removeBullet(bullet){
        this.bullets = this.bullets.filter((i) => i !== bullet);
    }

    createBullet(x, y, angle, speed, damage){
        let bullet = new Bullet(x, y, angle, speed, damage, this);
        this.addBullet(bullet);
    }

    createBulletContainer(nBullets){
        this.bulletsContainer = new BulletsContainer(this.w/2, this.h - 10, nBullets, this);
    }

    async noMoreBullets(){
        while(true){
            if(this.bullets.length == 0){
                console.log("no more bullets");
                return;
            }
            await this.sleep(100);
        }
    }

    

    async firstClick(){
        if(this.bullets.length > 0) return;
        this.aimMode = true;
        //await for a click
        let angle;
        await this.mouseClicked();
        this.aimMode = false;
        //get the angle
        angle = atan2(mouseY - this.bulletsContainer.y, mouseX - this.bulletsContainer.x);
        angle = 180 - angle;
        console.log(angle)
        
        if(angle < 0 || angle > 180) return;
        //shot the bullet
        let tmp = this.bulletsContainer;
        this.bulletsContainer = null;
        await tmp.shotEveryBullet( 10, 1, angle, 100);
        await this.noMoreBullets();
        this.step();
    }

    /* async mouseClicked(){
        if(this.bullets.length > 0)
            return;
        let tmp = this.bulletsContainer;
        this.bulletsContainer = null;
        await tmp.shotEveryBullet( 10, 1, 10, 100);
        await this.noMoreBullets();
        this.step();
    } */

    async mouseClicked(){
        //wait for a mouse click
        while(true){
            //if the mouse is clicked
            if(mouseIsPressed){
                return;
            }
            await this.sleep(100);
        }
    }
    bulletArrived(x){
        if(this.bulletsContainer == null)
            this.bulletsContainer = new BulletsContainer(x, this.h - 10, 1, this);
        else 
            this.bulletsContainer.addBullet();
    }


    sleep(millisecondsDuration) {
        return new Promise((resolve) => {
          setTimeout(resolve, millisecondsDuration);
        });
      }

    
}