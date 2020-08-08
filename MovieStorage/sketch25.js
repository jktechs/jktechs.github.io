let json = {}; // new  JSON Object

json.id = 0;
json.species = 'Panthera leo';
json.name = 'Lion';

function setup() {
  createCanvas(100, 100);
  background(200);
  text('click here to save', 10, 10, 70, 80);
}

function mousePressed() {
  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    saveJSON(json, 'Movies.json');
  }
}
