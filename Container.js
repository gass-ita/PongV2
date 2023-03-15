class Container{

    constructor(w, h, blockInV){
        this.blocks = [];
        this.bullets = [];
        this.bulletsContainer;
        this.w = w;
        this.h = h;
        this.blockInV = blockInV;
    }

    createDefaultBlocks(){
        //make a line of blocks on top
        for(let i = 0; i < this.blockInV; i++){

            this.createBlock(0, i, 80);
        }
    }

    

    show(){
        push();
        this.blocks.forEach((item) => {
            item.show();
        });
        this.bullets.forEach((item) => {
            item.show();
        });
        this.bulletsContainer.show()
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


    
}