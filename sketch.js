let container;

function setup() {
  createCanvas(480, 800);
  container = new Container(480, 600, 10);
  container.createDefaultBlocks();
  container.createBulletContainer(100);
}

function draw() {
  background(220);
  container.show();
  container.update();
  //make a base with an height of 200
  rect(0, 600, 480, 200);
}


let firstClick = false;
function mouseClicked(){
  if(!firstClick) {
    firstClick = true;
    container.firstClick();
  } else {
    container.mouseClicked();
    firstClick = false;
  }
}
