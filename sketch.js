let button = [],
	start = [],
	bool = [true,true,true,true],
	timer = 0,
	hand = false,
	buttonId = -1,
 	leftP = false,
	rightP = false;
let my=[0,0,0,0], y = [0,0,0,0];
let mx=[0,0,0,0], x = [0,0,0,0];

function setup() {
	// create canvas
	a = -PI/2;
	createCanvas(600, 600)
	start[0] = createButton('start');
	start[0].position(140, 0);
	start[0].mousePressed(starting);
	start[1] = createButton('links');
	start[1].position(180, 0);
	start[1].mousePressed(left);
	start[2] = createButton('rechts');
	start[2].position(220, 0);
	start[2].mousePressed(right);
	start[3] = createButton('reset');
	start[3].position(280, 0);
	start[3].mousePressed(reset);
}
function reset(){
  bool = [true,true,true,true];
  y = [0,0,0,0];
  x = [0,0,0,0];
}
function left(){
  leftP = true;
}
function right(){
  richtP = true;
}
function starting(){
  y = [0,0,0,0];
  if(bool[1])
    my[0] = 25;
  if(bool[2])
    my[3] = 25;
}
function draw() {
  hand = false;
  buttonId = -1;
  clear();
  for(let i = 0;i<4;i++){
    if(bool[i]) {
      if(mouseX>25*i+100 && mouseX<25*(i+1)+100 && mouseY<125 && mouseY>100){
        fill(100);
        hand = hand || true;
        buttonId = i;
      } else {
        fill(200);  
      }
      circle(x[i]+12.5+i*25+100, 12.5+y[i]+100, 25);
      circle(x[i]+12.5+i*25+100+cos(a)*10, y[i]+112.5+sin(a)*10, 5);
    }
  }
  if(hand) {
    cursor(HAND);
  } else {
    cursor(ARROW);
  }
  for(let i = 0;i<4;i++){
    if(my[i]!=0){
      y[i] = y[i] +sign(my[i]);
      my[i] = my[i]-sign(my[i]);
    } else {
    	if(rightP){
    		  //x = [0,0,0,0];
              mx[0] = 25;
              mx[3] = -25;
              rightP = !rightP;
    	} else if(leftP){
    		  //x = [0,0,0,0];
  				mx[0] = 25;
  				mx[3] = -25;
  				leftP = !leftP;
    	}
    }
  }
  for(let i = 0;i<4;i++){
    if(mx[i]!=0){
      x[i] = x[i] +sign(mx[i]);
     mx[i] = mx[i]-sign(mx[i]);
    }
  }
  
}
function b1() {
  bool[0] = !bool[0];
}
function b2() {
  bool[1] = !bool[1];
}
function b3() {
  bool[2] = !bool[2];
}
function b4() {
  bool[3] = !bool[3];
}
function sign(x){
  return abs(x)/x;
}
function mousePressed() {
  bool[buttonId] = !bool[buttonId];
}