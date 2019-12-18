//position to go to
let Mpos = [[0,0],[0,0],[0,0],[0,0]];
//current possision
let pos = [[0,0],[0,0],[0,0],[0,0]];
//enabled
let bool=[true,true,true,true];
//button array
let start = [];
//current rotation
let deg = [0,0,0,0];
//rotation to go to
let Mdeg = [0,0,0,0];
//right/left
let side = false;
//object selected
let hand = false;
let size = 30;
let time = -1;


	var l = 6;
	var p;
	
function setup() {
	p = (l-(l%4));
	// setup buttons
	createCanvas(600, 600);
	start[0] = createButton('start');
	start[0].position(0, 0);
	start[0].mousePressed(startB);
	start[1] = createButton('reset');
	start[1].position(0, start[0].height);
	start[1].mousePressed(setBool);
	start[2] = createInput('6');
	start[2].input(checkinp);
	start[2].position(200,200);
	start[3] = createCheckbox("L",false);
	start[3].changed(c1);
	start[3].position(0,start[0].height+start[1].height);
	start[4] = createCheckbox("R",true);
	start[4].changed(c2);
	start[4].position(0,start[0].height+start[1].height+start[3].height);
	setBool();
}
function checkinp(){
	let string = start[2].value();
	let regexp = '[0-9][0-9]|[0-9]';
	let m = match(string, regexp);
	start[2].value(m);
	setBool();
}
function c1() {
		start[4].checked(!start[3].checked());
		side = start[4].checked();
		setBool();
}
function c2() {
		start[3].checked(!start[4].checked());
		side = start[4].checked();
		setBool();
}
function startB(){
	time = 0;
	for(var i = 0;i<floor(l/4)+1;i=i+1){
		if(bool[1+i*4])
			Mpos[  i*4] = [0,size];
		if(bool[2+i*4])
			Mpos[3+i*4] = [0,size];
	}
}
function draw(){
	if(time!=-1){
		time = time+1;
	}
	if(time == size){
		for(var i = 0;i<floor(l/4)+1;i=i+1){
			Mpos[3+i*4][0] = [-size];
			Mpos[  i*4][0] = [ size];
		}
		if(side){
			for(var i = 0;i<(p+4);i=i+1){
				Mdeg[i] = size;
			}
		} else {
			for(var i = 0;i<(p+4);i=i+1){
				Mdeg[i] = -size;
			}
		}
	}
	clear();
	hand = false;
	for(let i = 0;i<(p+4);i++){
		if(pos[i][0]>Mpos[i][0]){
			pos[i][0] = pos[i][0]-1;
		} else if(pos[i][0]<Mpos[i][0]){
			pos[i][0] = pos[i][0]+1;
		}
		if(pos[i][1]>Mpos[i][1]){
			pos[i][1] = pos[i][1]-1;
		} else if(pos[i][1]<Mpos[i][1]){
			pos[i][1] = pos[i][1]+1;
		}
		if(deg[i]>Mdeg[i]){
			deg[i] = deg[i]-1;
		} else if(deg[i]<Mdeg[i]){
			deg[i] = deg[i]+1;
		}
		if(bool[i]) {
			size = 30;
			let tsize = 20;
			let bx = (i%4)*size;
			let by = floor(i/4)*size*2;
			let xoff = 100;
			let yoff = 100;
			let xB = mouseX>bx+xoff+pos[i][0] && mouseX<bx+25+xoff+pos[i][0];
			let yB = mouseY>by+yoff+pos[i][1] && mouseY<by+25+yoff+pos[i][1];
			let cx = pos[i][0]+bx+size/2+xoff;
			let cy = pos[i][1]+by+size/2+yoff;
			if(xB && yB){
				fill(100);
				hand = hand || true;
				buttonId = i;
			} else {
				fill(200);
			}
			circle(cx, cy, size);
			circle(cx+cos((deg[i]/(2*size)-0.5)*PI)*(size-tsize)/2, cy+sin((deg[i]/(2*size)-0.5)*PI)*(size-tsize)/2, tsize);
		}
	}
}
function mousePressed() {
	if(hand)
		bool[buttonId] = !bool[buttonId];
}
function setBool(){
	l=parseInt(start[2].value());
	p = (l-(l%4));
	for(var i = 0;i < (4-l % 4)+l;i = i+1){
		pos[i] = [0,0];
		Mpos[i] = [0,0];
		deg[i] = 0;
		Mdeg[i] = 0;
	}
	bool = [];
	for(var i = 0;i<l-l%4;i++){
		bool[i] = true;
	}
	if(l%4==3){
		bool[l-l%4+0] = true;
		bool[l-l%4+3] = true;
		if(side){
			bool[l-l%4+2] = true;
		} else {
			bool[l-l%4+1] = true;
		}
	} else if(l%4==2){
		bool[l-l%4] = true;
		bool[l-l%4+3] = true;
	} else if(l%4==1){
		if(side){
			bool[l-l%4+3] = true;
		} else {
			bool[l-l%4] = true;
		}
	}
}