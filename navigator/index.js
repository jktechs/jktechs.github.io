let tmp = {}
var img = document.getElementById("theImg");
var cnvs = document.getElementById("myCanvas");
var i1 = document.getElementById("i1");
var i2 = document.getElementById("i2");
var flr = document.getElementById("floor");
var ctx = cnvs.getContext("2d");
var path = [];
function draw() {

    ctx.lineWidth = 10;
    ctx.strokeStyle = '#00ff00';

    for (x in tmp.Points) {
        if(tmp.Points[x][2] == flr.value || tmp.Points[x][2] == 3)
        circle(tmp.Points[x][0], tmp.Points[x][1], ctx);
    }
    for (x in tmp.Connections) {
        if(tmp.Points[tmp.Connections[x][0]][2] != flr.value && tmp.Points[tmp.Connections[x][0]][2] != 3) continue;
        if(tmp.Points[tmp.Connections[x][1]][2] != flr.value && tmp.Points[tmp.Connections[x][1]][2] != 3) continue;
        line(tmp.Points[tmp.Connections[x][0]][0], tmp.Points[tmp.Connections[x][0]][1], tmp.Points[tmp.Connections[x][1]][0], tmp.Points[tmp.Connections[x][1]][1], ctx);
    }
    ctx.strokeStyle = '#ff0000';
    for (x in tmp.Groups) {
        
        if(tmp.Points[tmp.Groups[x][0]][2] == flr.value || tmp.Points[tmp.Groups[x][0]][2] == 3) {
        text(x, tmp.Points[tmp.Groups[x][0]][0], tmp.Points[tmp.Groups[x][0]][1], ctx);
        circle(tmp.Points[tmp.Groups[x][0]][0], tmp.Points[tmp.Groups[x][0]][1], ctx);
        }
    }
    ctx.strokeStyle = '#0000ff';
    let last = path[0]
    circle(tmp.Points[last][0], tmp.Points[last][1], ctx);
    for(let p = 1;p<path.length;p++){
        console.log(path[p]+" "+last)
        if(tmp.Points[path[p]][2] == flr.value || tmp.Points[path[p]][2] == 3)
        circle(tmp.Points[path[p]][0], tmp.Points[path[p]][1], ctx);
        if(tmp.Points[tmp.Connections[path[p]][0]][2] != flr.value && tmp.Points[tmp.Connections[path[p]][0]][2] != 3 && tmp.Points[tmp.Connections[path[p]][1]][2] != flr.value && tmp.Points[tmp.Connections[path[p]][1]][2] != 3)
        line(tmp.Points[path[p]][0], tmp.Points[path[p]][1], tmp.Points[last][0], tmp.Points[last][1], ctx);
        last = path[p];
    }
}
function updateMap(){
    img.src = "/navigator/P"+(parseInt(flr.value)+1)+".PNG";
    draw();
}
function calcPath(){
    path = find(tmp.Groups[i1.value], tmp.Groups[i2.value], tmp.Connections, tmp.Points.length, tmp.Points);
    draw();
}
function circle(x, y, c) {
    c.beginPath();
    c.arc(x, y, 5, 0, 2 * Math.PI, true);
    c.stroke();
}
function line(x1, y1, x2, y2, c) {
    c.moveTo(x1, y1);
    c.lineTo(x2, y2);
    c.stroke();
}
function text(s, x, y, c) {
    c.font = "30px Arial";
    c.fillText(s, x, y);
}
document.addEventListener("pointerdown", e => {
    console.log((e.pageX-8) + ", " + (e.pageY-8));
});
var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            tmp = JSON.parse(xmlHttp.responseText);
            draw();
        }
    }
    xmlHttp.open("GET", "https://raw.githubusercontent.com/jktechs/jktechs.github.io/master/schoolLayout.json", true); // true for asynchronous 
    xmlHttp.send(null);
function find(beginG, endG, Connections, pointCount, positions) {
    let openSet = [beginG[0]];
    let comeFrom = [];
    let gScore = [];
    let fScore = [];
    for (let x = 0; x < pointCount; x++) {
        gScore[x] = Infinity;
        fScore[x] = Infinity;
        comeFrom[x]=-1;
    }
    gScore[beginG[0]] = 0;
    fScore[beginG[0]] = h(beginG[0], endG[0], positions);
    console.log("["+gScore+"],\n["+fScore+"],\n["+openSet+"]");
    while (openSet.length != 0) {
        openSet.sort(function (a, b) { return fScore[a] - fScore[b] });
        let current = openSet[0];
        console.log("["+gScore+"],\n["+fScore+"],\n["+openSet+"],\n"+current);
        for (x in endG) {
            if (endG[x] == current){
                console.log(comeFrom)
                return reconstruct(comeFrom, current);
            }
        }
        openSet.splice(openSet.indexOf(current), 1);
        for (c in Connections) {
            //console.log(Connections[c]);
            let p = -1;
            if (Connections[c][0] == current) {
                p = Connections[c][1];
            } else if (Connections[c][1] == current) {
                p = Connections[c][0];
            }
            //console.log(p);
            if (p != -1) {
                let score = gScore[current] + d(current, p, positions);
                if (score < gScore[p]) {
                    comeFrom[p] = current;
                    gScore[p] = score;
                    fScore[p] = score + h(p, endG[0], positions);
                    if (openSet.indexOf(p) == -1)
                        openSet.push(p);
                }
            }
        }
    }
}
function reconstruct(camefrom, current) {
    let c = current;
    let path = [current];
    while (camefrom[c] != -1) {
        c = camefrom[c];
        path.push(c);
        console.log(c+" "+camefrom+" "+camefrom.indexOf(c))
    }
    return path;
}
function h(p, end, pos) {
    return d(p, end, pos);
}
function d(p, c, pos) {
    return Math.sqrt((pos[p][0] - pos[c][0]) * (pos[p][0] - pos[c][0]) + (pos[p][1] - pos[c][1]) * (pos[p][1] - pos[c][1]));
}