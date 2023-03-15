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
        if(this.count > 128){
            fill(255, 255, 0);
        }
        fill(255, 255 * this.count/128, 0);
        rect(x, y, this.w, this.w);
        if(this.count > 0){
            textAlign(CENTER);
            fill(0);
            text(this.count, x + this.w / 2, y + this.w / 2);
        }
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
        if(bullet.x > x && bullet.x < x + this.w && bullet.y > y && bullet.y < y + this.w){
            //return 0 if it hits the top
            if(bullet.y < y + this.w / 2){
                return 0;
            }

            //return 1 if it hits the right
            if(bullet.x > x + this.w / 2){
                return 1;
            }

            //return 2 if it hits the bottom
            if(bullet.y > y + this.w / 2){
                return 2;
            }

            //return 3 if it hits the left
            if(bullet.x < x + this.w / 2){
                return 3;
            }
            
        }
        return -1;
    }
}