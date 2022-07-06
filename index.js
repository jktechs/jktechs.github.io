let tmp = {}//{"Connections":[[51,52],[6,51],[5,6],[7,5],[49,5],[50,49],[48,50],[6,4],[4,8],[3,4],[9,3],[2,3],[10,2],[1,2],[59,1],[60,59],[0,59],[11,0],[35,11],[40,35],[42,40],[44,42],[46,44],[48,46],[47,46],[45,44],[43,42],[41,40],[36,35],[15,11],[12,11],[37,36],[38,37],[39,38],[13,37],[15,13],[14,13],[16,14],[16,16],[17,16],[18,14],[32,18],[33,32],[34,33],[19,20],[16,19],[21,19],[23,21],[24,23],[25,23],[26,23],[27,26],[28,26],[29,26],[30,31],[22,30],[12,22]],"Points":[[219,488],[225,307],[222,208],[269,208],[306,209],[394,204],[355,207],[394,149],[303,163],[268,156],[162,209],[297,493],[257,544],[280,640],[275,668],[284,602],[252,663],[256,631],[272,701],[218,658],[214,691],[199,655],[216,569],[174,651],[177,629],[170,680],[145,650],[145,623],[143,679],[103,640],[118,556],[109,600],[252,701],[237,771],[303,783],[357,493],[346,586],[336,652],[361,655],[371,615],[404,491],[398,551],[430,496],[423,557],[453,498],[444,555],[492,504],[482,571],[534,447],[528,205],[532,342],[358,229],[484,226],[276,365],[250,364],[308,363],[309,423],[278,421],[247,421],[222,431],[162,433]],"Groups":{"H":[0,2,3,4,5,6,11,12,13,14,15,16,19,21,22,23,26,30,33,34,35,37,38,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60],"A007":[7],"B008":[29],"B009":[28],"A005":[9],"B006":[27],"A006":[8],"B007":[31],"B004":[17],"A004":[10],"B005":[24],"A001":[1],"B011":[20],"B033":[36],"B012":[18,32],"B010":[25],"B032":[39]}}
function draw() {
    var img = document.getElementById("theImg");
    var cnvs = document.getElementById("myCanvas");

    var ctx = cnvs.getContext("2d");

    ctx.lineWidth = 10;
    ctx.strokeStyle = '#00ff00';

    for (x in tmp.Points) {
        circle(tmp.Points[x][0], tmp.Points[x][1], ctx);
    }
    for (x in tmp.Connections) {
        line(tmp.Points[tmp.Connections[x][0]][0], tmp.Points[tmp.Connections[x][0]][1], tmp.Points[tmp.Connections[x][1]][0], tmp.Points[tmp.Connections[x][1]][1], ctx);
    }
    ctx.strokeStyle = '#ff0000';
    for (x in tmp.Groups) {
        //text(x, tmp.Points[tmp.Groups[x][0]][0], tmp.Points[tmp.Groups[x][0]][1], ctx);
        circle(tmp.Points[tmp.Groups[x][0]][0], tmp.Points[tmp.Groups[x][0]][1], ctx);
    }
    ctx.strokeStyle = '#0000ff';
    let path = find(tmp.Groups["B005"], tmp.Groups["A006"], tmp.Connections, tmp.Points.length, tmp.Points)
    console.log(path)
    let last = path[0]
    circle(tmp.Points[last][0], tmp.Points[last][1], ctx);
    for(let p = 1;p<path.length;p++){
        console.log(path[p]+" "+last)
        circle(tmp.Points[path[p]][0], tmp.Points[path[p]][1], ctx);
        line(tmp.Points[path[p]][0], tmp.Points[path[p]][1], tmp.Points[last][0], tmp.Points[last][1], ctx);
        last = path[p];
    }
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