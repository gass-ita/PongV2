let container;

function setup() {
  createCanvas(480, 800);
  container = new Container(480, 600, 10);
  container.createDefaultBlocks();
  container.createBulletContainer(1000);
}

function draw() {
  background(220);
  container.show();
  container.update();
  //make a base with an height of 200
  rect(0, 600, 480, 200);
}

function mouseClicked(){
  container.bulletsContainer.shotEveryBullet(10, 1, 10, 10);
}
