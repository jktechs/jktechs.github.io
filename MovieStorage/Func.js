var firebaseConfig = {
  apiKey: "AIzaSyDI1U4PjjT9d--anXP0r4zT4m1P0-dqoc4",
  authDomain: "moviedata-base.firebaseapp.com",
  databaseURL: "https://moviedata-base.firebaseio.com",
  projectId: "moviedata-base",
  storageBucket: "moviedata-base.appspot.com",
  messagingSenderId: "668249048227",
  appId: "1:668249048227:web:052564296dcc5c3fa9eb16",
  measurementId: "G-YPM8QNYGC3"
};
var obj;
var id;
var file;
var storage;
var style;
addEventListener('DOMContentLoaded', () => {
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
  storage = firebase.storage();
  style = document.getElementById("highlight");
  file = storage.ref('movies.json');
  id = -1;
  getString();
  setTimeout(checkForUpdates);
});
var lastV = "";
var lastT = 0;
function checkForUpdates(){
  let now = Date.now()/1000 % 60;
  document.getElementById("autoSaveTime").innerHTML = now;
  if((document.getElementById("auto-save").checked && now-lastT) < 0){
    sendString();
    console.log("saved");
  }
  if(document.getElementById("enName").checked && document.getElementById("sortName").value !== lastV)
  updateList();
  lastV = document.getElementById("sortName").value;
  lastT = now;
  setTimeout(checkForUpdates, 100);
}
function updateList(){
  obj.sort((a, b)=>a.name.localeCompare(b.name));
  var newHTML = [];
  for (var i = 0; i < obj.length; i++) {
    if(document.getElementById("enName").checked && !(obj[i].pre.toLowerCase()+" "+obj[i].name.toLowerCase()).includes(document.getElementById("sortName").value.toLowerCase())) continue;
    if(document.getElementById("enDvd").checked && !obj[i].dvd != document.getElementById("sortDvd").checked) continue;
    newHTML.push('<p class="item" id="num'+i+'" onclick="selectId('+i+');">' + (i+1).toString() + ' ' + obj[i].pre + " " + obj[i].name + '</p>');
  }
  document.getElementById("con").innerHTML = newHTML.join("");
}
function changeE(){
  if(id == -1) return;
  obj[id].name = document.getElementById("name").value;
  obj[id].dvd = document.getElementById("dvd").checked;
  obj[id].pre = document.getElementById("pre").value;
  updateList();
}
function addE(){
  obj.push({name: document.getElementById("name").value,dvd: document.getElementById("dvd").checked,pre: document.getElementById("pre").value});
  updateList();
}
function remE(){
  obj.splice(id, 1);
  updateList();
}
function selectId(a,inc = false){
  if(!inc) id = 0;
  id += a;
  style.innerHTML = '#num'+id+'{background-color: #f0f0f0;}';
  document.getElementById("pre").value = obj[id].pre;
  document.getElementById("name").value = obj[id].name;
  document.getElementById("dvd").checked = obj[id].dvd;
}
function getString(){
  file.getDownloadURL().then(url=>fetch(url)).then(text=>text.json()).then(list=>{
    obj = list;
    updateList();
  }).catch(err=>console.error(err));
}
function sendString(){
  file.putString(JSON.stringify(obj));
}
