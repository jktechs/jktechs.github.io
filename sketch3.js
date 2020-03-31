let c;
let d;
let e = false;
function setup() {
  createCanvas(400, 400);
  c = createVector(width/2,height);
  d = createVector(width/2,height/1.2);
}
function draw() {
  background(220);
  let a = createVector(0,height/2);
  let b = createVector(width,height/2);
  line(a.x,a.y,b.x,b.y);
  Cube(a,b,c,d);
}
function Cube(A,B,C,D){
  let l1 = Plane(A,B,C,D);
  let c2 = createVector(C.x,-C.y+height);
  let d2 = createVector(D.x,-D.y+height);
  let l2 = Plane(A,B,c2,d2);
  for(let i = 0;i<4;i++){
    line(l1[i].x,l1[i].y,l2[i].x,l2[i].y)
  }
}
function Plane(A,B,C,D){
  let l1 = DrawRay(A,C);
  let l2 = DrawRay(B,C);
  let l3 = DrawRay(A,D);
  let l4 = DrawRay(B,D);
  let p1 = l1.cross(l4);
  let p2 = l2.cross(l1);
  let p3 = l3.cross(l2);
  let p4 = l4.cross(l3);
  line(p1.x,p1.y,p2.x,p2.y);
  line(p2.x,p2.y,p3.x,p3.y);
  line(p3.x,p3.y,p4.x,p4.y);
  line(p4.x,p4.y,p1.x,p1.y);
  return [p1,p2,p3,p4];
}
function DrawRay(A,B){
  let l = new Jitter(A.x,A.y,B.x,B.y);
  let p = createVector((height-l.b)/l.a,height);
  let p2 = createVector(-l.b/l.a,0);
  strokeWeight(1);
  //line(p2.x,p2.y,p.x,p.y);
  //strokeWeight(10);
  return l;

}
function mouseDragged() {
  c = createVector(mouseX,mouseY);
}
function mousePressed() {
  d = createVector(mouseX,mouseY);
}

class Jitter {
  constructor(x,y,x1,y1) {
    this.a = (y-y1)/(x-x1);
    this.b = y-this.a*x;
  }
  cross(l){
    let x = (l.b-this.b)/(this.a-l.a);
    let y = x*this.a+this.b;
    return createVector(x,y);
  }
}
