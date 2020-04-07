let c;
let d;
let e = false;
let f, g, h;
function setup() {
  createP('hoogte');
  f = createInput("2");
  createP('dak hoogte');
  h = createInput("1");
  g = createCheckbox('puntdak', false);
  k = createCheckbox('zadeldak', false);
  createCanvas(1475, 685);
  c = createVector(width/2+3,height+3);
  d = createVector(width/2-3,height/1.2-3);
}
function draw() {
  background(220);
  let a = createVector(0,height/2);
  let b = createVector(width,height/2);
  line(a.x,a.y,b.x,b.y);
  l = Cube(a,b,c,d);
  if(g.checked()){
    l1 = DrawRay(l[4],l[6]);
    l2 = DrawRay(l[7],l[5]);
    p = l2.cross(l1);
    p = createVector(p.x,p.y-h.value()*100);
    line(p.x,p.y,l[4].x,l[4].y);
    line(p.x,p.y,l[6].x,l[6].y);
    line(p.x,p.y,l[7].x,l[7].y);
    line(p.x,p.y,l[5].x,l[5].y);
  }
  if(k.checked()){
    l1 = DrawRay(l[0],l[4]);
    l2 = DrawRay(l[1],l[7]);
    l3 = DrawRay(l[2],l[6]);
    l4 = DrawRay(l[3],l[5]);
    p = l2.cross(l1);
    p2 = l4.cross(l3);
    p = createVector(p.x,p.y-h.value()*100-f.value()*50);
    l5 = DrawRay(p,b);
    p2 = createVector(p2.x,p2.x*l5.a+l5.b);
    line(p.x,p.y,l[4].x,l[4].y);
    line(p2.x,p2.y,l[6].x,l[6].y);
    line(p.x,p.y,l[7].x,l[7].y);
    line(p2.x,p2.y,l[5].x,l[5].y);
    line(p2.x,p2.y,p.x,p.y);
  }
}
function Cube(A,B,C,D){
  let l1 = Plane(A,B,C,D);
  let p1 = createVector(l1[1].x,l1[1].y-f.value()*100);
  let r1 = DrawRay(B,p1);
  let p2 = createVector(l1[2].x,l1[2].x*r1.a+r1.b);
  
  let r2 = DrawRay(A,p2);
  let p3 = createVector(l1[3].x,l1[3].x*r2.a+r2.b);
  
  let r3 = DrawRay(B,p3);
  let p4 = createVector(l1[0].x,l1[0].x*r3.a+r3.b);
  
  line(p1.x,p1.y,p2.x,p2.y);
  line(p2.x,p2.y,p3.x,p3.y);
  line(p3.x,p3.y,p4.x,p4.y);
  line(p4.x,p4.y,p1.x,p1.y);
  
  line(p1.x,p1.y,l1[1].x,l1[1].y);
  line(p2.x,p2.y,l1[2].x,l1[2].y);
  line(p3.x,p3.y,l1[3].x,l1[3].y);
  line(p4.x,p4.y,l1[0].x,l1[0].y);
  return [l1[0],l1[1],l1[2],l1[3],p1,p2,p3,p4];
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
  strokeWeight(4);
  return l;

}
function mouseDragged() {
  if(mouseY>10 && mouseX<1475-12)
  c = createVector(mouseX,mouseY);
}
function mousePressed() {
  if(mouseY>10 && mouseX<1475-12)
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
