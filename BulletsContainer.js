class BulletsContainer {
  constructor(x, y, nBullets, container) {
    this.nBullets = nBullets;
    this.x = x;
    this.y = y;
    this.container = container;
  }

  show() {
    push();
    translate(this.x, this.y);
    fill(255, 0, 0);
    rect(0, 0, 10, 10);
    pop();
  }

  shot(speed, damage, angle) {
    if (this.nBullets > 0) {
      this.nBullets--;
      let bullet = new Bullet(
        this.x,
        this.y,
        angle,
        speed,
        damage,
        this.container
      );
      this.container.addBullet(bullet);
    }
  }

  async shotEveryBullet(speed, damage, angle, fireRate) {
    do {
      this.shot(speed, damage, angle);
      await this.sleep(fireRate);
    } while (this.nBullets > 0);
  }

  addBullet() {
    this.nBullets++;
  }

  removeBullet() {
    this.nBullets--;
  }

  sleep(millisecondsDuration) {
    return new Promise((resolve) => {
      setTimeout(resolve, millisecondsDuration);
    });
  }
}
