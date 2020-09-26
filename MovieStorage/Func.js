  // Your web app's Firebase configuration
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

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  // Get a reference to the storage service, which is used to create references in your storage bucket
  var storage = firebase.storage();
  // Create a storage reference from our storage service
  var storageRef = storage.ref();
  //color selected id
  var style = document.createElement('style');
  document.head.appendChild(style);

  var id = -1;
  var obj;
  $(document).ready(function(){
    getString();
  });
  function updateList(){
    obj.movies.sort(function(a, b) {
      return ((a.name < b.name) ? -1 : ((a.name == b.name) ? 0 : 1));
    });
    $('.item').remove();
	var list = [];
	for (var i = 0; i < obj.movies.length; i++) {
	  var add = true;
	  //#enName
	  if(document.getElementById("enName").checked){
	    if(!obj.movies[i].name.includes(document.getElementById("sortName").value)){
		  add = false;
		}
	  }
	  //#enCompany
	  if(document.getElementById("enComp").checked){
	    if(!obj.movies[i].comp.includes(document.getElementById("sortComp").value)){
		  add = false;
		}
	  }
	  //#enCompany
	  if(document.getElementById("enPart").checked){
	    if(obj.movies[i].part != document.getElementById("sortPart").value){
		  add = false;
		}
	  }
	  //#enLang
	  if(document.getElementById("enLang").checked){
	    var containsObj = false;
	    for (var j = 0; j < obj.movies[i].lang.length; j++) {
		  if(obj.movies[i].lang[j].includes(document.getElementById("sortLang").value)){
		    containsObj |= true;
		  }
        }
		if(!containsObj){
		  add = false;
		}
	  }
	  //#enDvd
	  if(document.getElementById("enDvd").checked){
	    if(obj.movies[i].dvd != document.getElementById("sortDvd").checked){
		  add = false;
		}
	  }
	  if(add)
	    list.push(obj.movies[i]);
    }


	var newHTML = [];
    for (var i = 0; i < list.length; i++) {
      var nam = list[i].name;
	  if(nam.includes("<") || nam.includes(">"))
		nam = "";
      newHTML.push('<p class="item" id="num'+i+'" onclick="selectId('+i+');">' + (i+1).toString() + ' ' + nam + '</p>');
    }
    $("#con").append(newHTML.join(""));
  }
  function changeE(){
    if(id != -1){
      obj.movies[id].name = document.getElementById("name").value;
	  obj.movies[id].lang = document.getElementById("lang").value.split(",");
	  obj.movies[id].dvd = document.getElementById("dvd").checked;
	  obj.movies[id].comp = document.getElementById("comp").value;
	  obj.movies[id].part = document.getElementById("part").value;
	}
    updateList();
  }
  function addE(){
    var nb = {"name":document.getElementById("name").value,"lang":document.getElementById("lang").value.split(","),"dvd":document.getElementById("dvd").checked,"comp":document.getElementById("comp").value,"part":document.getElementById("part").value};
	obj.movies.push(nb);
	updateList();
  }
  function remE(){
  	  obj.movies.splice(id, 1);
	  updateList();
  }
  function selectId(a){
    style.innerHTML = '#num'+a+'{background-color: #f0f0f0;}';
	document.getElementById("name").value = obj.movies[a].name;
	document.getElementById("lang").value = obj.movies[a].lang.join();
	document.getElementById("dvd").checked = obj.movies[a].dvd;
	document.getElementById("part").value = obj.movies[a].part;
	document.getElementById("comp").value = obj.movies[a].comp;
	id = a;
  }
  function getString(){
    var pathReference = storage.ref('movies.json');
    pathReference.getDownloadURL().then(function(url) {
      // `url` is the download URL for 'movies.json'
      // This can be downloaded directly:
      var xhr = new XMLHttpRequest();
      xhr.responseType = '';
      xhr.onload = function(event) {
        var blob = xhr.response;
		obj = JSON.parse(blob);
		updateList();
      };
      xhr.open('GET', url);
      xhr.send();
    }).catch(function(error) {});
  }
  function sendString(){
    // Raw string is the default if no format is provided
    var message =  JSON.stringify(obj);
	var jsonRef = storageRef.child('movies.json');
    jsonRef.putString(message);//.then(function(snapshot) {
      //console.log('Uploaded a raw string!');
    //});
  }
