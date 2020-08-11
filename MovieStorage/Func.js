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

  var nameAr = [];
  var langAr = [];
  var vzAr = [];
  var dvdAr = [];
  $(document).ready(function(){
    updateList();
  });
  function updateList(){
    $('.item').remove();
	var newHTML = [];
    for (var i = 0; i < nameAr.length; i++) {
      newHTML.push('<p class="item" id="num'+i+'" onclick="selectId('+i+');">' + vzAr[i] + " " + nameAr[i] + '</p>');
    }
    $("#con").append(newHTML.join(""));
  }
  function changeE(){
    if(id != -1){
      nameAr[id] = document.getElementById("name").value;
	  langAr[id] = document.getElementById("lang").value.split(",");
	  vzAr[id] = document.getElementById("vz").value;
	}
    updateList();
  }
  function addE(){
	nameAr.push(document.getElementById("name").value);
	langAr.push(document.getElementById("lang").value.split(","));
	vzAr.push(document.getElementById("vz").value);
	updateList();
  }
  function remE(){
  	  nameAr.splice(id, 1);
	  langAr.splice(id, 1);
	  vzAr.splice(id, 1);
	  updateList();
  }
  function selectId(a){
    style.innerHTML = '#num'+a+'{background-color: #f0f0f0;}';
	document.getElementById("name").value = nameAr[a];
	document.getElementById("lang").value = langAr[a].join();
	document.getElementById("vz").value = vzAr[a];
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
		var obj = JSON.parse(blob); 
		nameAr = obj.names;
		langAr = obj.lang;
		vzAr = obj.vz;
		dvdAr = obj.dvd;
		updateList();
      };
      xhr.open('GET', url);
      xhr.send();
    }).catch(function(error) {});
  }
  function sendString(){
    var obj = {"names":nameAr,"dvd":dvdAr,"lang":langAr,"vz":vzAr};
	//console.log(obj);
    // Raw string is the default if no format is provided
    var message =  JSON.stringify(obj);
	var jsonRef = storageRef.child('movies.json');
    jsonRef.putString(message);//.then(function(snapshot) {
      //console.log('Uploaded a raw string!');
    //});
  }