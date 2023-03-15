class Block{
    constructor(i, j, count, container, w = 20){
        console.log("creating a block with i: " + i + " j: " + j + " count: " + count + " container: " + container + " w: " + w + "")
        this.i = i;
        this.j = j;
        this.count = count;
        this.container = container;
        this.w = w;
    }

    show(){
        let x = this.j * this.w;
        let y = this.i * this.w;
        stroke(0);
        if(this.count > 256){
            fill(255, 255, 255);
        } else if(this.count > 128){
            fill(255, 255, 255 * (this.count - 128)/128);
        } else {
            fill(255, 255 * this.count/128, 0);
        }
        rect(x, y, this.w, this.w);
        if(this.count > 0){
            textAlign(CENTER);
            fill(0);
            text(this.count, x + this.w / 2, y + this.w / 2);
        }
    }

    step(){
        //go down by 1 block
        this.i++;
    }

    hit(bullet){
        this.count -= bullet.damage;
        if(this.count <= 0){
            this.container.removeBlock(this);
            return true;
        }
        return false;
    }

    checkCollision(bullet){
        let x = this.j * this.w;
        let y = this.i * this.w;

        //return 0 if it hits the top
        if(bullet.y < y + this.w / 2 && bullet.y > y && bullet.x > x && bullet.x < x + this.w){
            //set the bullet to the edge of the block
            bullet.y = y;
            return 0;
        }

        //return 1 if it hits the right
        if(bullet.x > x + this.w / 2 && bullet.x < x + this.w && bullet.y > y && bullet.y < y + this.w){
            //set the bullet to the edge of the block
            bullet.x = x + this.w;
            return 1;
        }

        //return 2 if it hits the bottom
        if(bullet.y > y + this.w / 2 && bullet.y < y + this.w && bullet.x > x && bullet.x < x + this.w){
            //set the bullet to the edge of the block
            bullet.y = y + this.w;
            return 2;
        }

        //return 3 if it hits the left
        if(bullet.x < x + this.w / 2 && bullet.x > x && bullet.y > y && bullet.y < y + this.w){
            //set the bullet to the edge of the block
            bullet.x = x;
            return 3;
        }

        return -1;
    }
}