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
  //var style = document.createElement('style');
  //document.head.appendChild(style);

  //var id = -1;
  var obj;
  $(document).ready(function(){
	getString();
  });
  function updateList(){
	//obj.movies.sort(function(a, b) {
	//	return ((a.name < b.name) ? -1 : ((a.name == b.name) ? 0 : 1));
	//});
	var currentValue = 0;
	var currentValue =
	document.getElementById("oneCent").value*0.01+
	document.getElementById("twoCent").value*0.02+
	document.getElementById("fiveCent").value*0.05+
	document.getElementById("oneTenCent").value*0.1+
	document.getElementById("twoTenCent").value*0.2+
	document.getElementById("fiveTenCent").value*0.5+
	document.getElementById("oneEuro").value*1.0+
	document.getElementById("twoEuro").value*2.0+
	document.getElementById("fiveEuro").value*5.0+
	document.getElementById("oneTenEuro").value*10.0+
	document.getElementById("twoTenEuro").value*20.0+
	document.getElementById("fiveTenEuro").value*50.0+
	document.getElementById("oneHunEuro").value*100.0+
	document.getElementById("twoHunEuro").value*200.0+
	document.getElementById("fiveHunEuro").value*500.0;
	currentValue = Math.round(currentValue*100.0)/100.0;
	var currentValue = currentValue.toLocaleString(undefined, { minimumFractionDigits: 2 });
	document.getElementById("current").innerText = "€"+currentValue;
	
	$('.item').remove();
	var newHTML = [];
	for (var i = 0; i < 4; i++) {
	  newHTML.push('<a class="item">' + i.toString() + '</a>');
	}
	$("#con").append(newHTML.join(""));
  }
  function calcVal(){
		var currentValue = obj.cent.one*0.01+obj.cent.two*0.02+obj.cent.five*0.05+obj.tenCent.one*0.1+obj.tenCent.two*0.2+obj.tenCent.five*0.5+obj.euro.one+obj.euro.two*2+
	obj.euro.five*5+obj.tenEuro.one*10+obj.tenEuro.two*20+obj.tenEuro.five*50+obj.hunEuro.one*100+obj.hunEuro.two*200+obj.hunEuro.five*500;
	document.getElementById("current").innerText = currentValue;
  }
  function getString(){
	var pathReference = storage.ref('money.json');
	pathReference.getDownloadURL().then(function(url) {
	  // `url` is the download URL for 'money.json'
	  // This can be downloaded directly:
	  var xhr = new XMLHttpRequest();
	  xhr.responseType = '';
	  xhr.onload = function(event) {
		var blob = xhr.response;
		obj = JSON.parse(blob);
		document.getElementById("oneCent").value = obj.cent.one;
		document.getElementById("twoCent").value = obj.cent.two;
		document.getElementById("fiveCent").value = obj.cent.five;
		document.getElementById("oneTenCent").value = obj.tenCent.one;
		document.getElementById("twoTenCent").value = obj.tenCent.two;
		document.getElementById("fiveTenCent").value = obj.tenCent.five;
		document.getElementById("oneEuro").value = obj.euro.one;
		document.getElementById("twoEuro").value = obj.euro.two;
		document.getElementById("fiveEuro").value = obj.euro.five;
		document.getElementById("oneTenEuro").value = obj.tenEuro.one;
		document.getElementById("twoTenEuro").value = obj.tenEuro.two;
		document.getElementById("fiveTenEuro").value = obj.tenEuro.five;
		document.getElementById("oneHunEuro").value = obj.hunEuro.one;
		document.getElementById("twoHunEuro").value = obj.hunEuro.two;
		document.getElementById("fiveHunEuro").value = obj.hunEuro.five;
		updateList();
	  };
	  xhr.open('GET', url);
	  xhr.send();
	}).catch(function(error) {});
  }
  function sendString(){
	obj.cent.one = document.getElementById("oneCent").value;
	obj.cent.two = document.getElementById("twoCent").value;
	obj.cent.five = document.getElementById("fiveCent").value;
	obj.tenCent.one = document.getElementById("oneTenCent").value;
	obj.tenCent.two = document.getElementById("twoTenCent").value;
	obj.tenCent.five = document.getElementById("fiveTenCent").value;
	obj.euro.one = document.getElementById("oneEuro").value;
	obj.euro.two = document.getElementById("twoEuro").value;
	obj.euro.five = document.getElementById("fiveEuro").value;
	obj.tenEuro.one = document.getElementById("oneTenEuro").value;
	obj.tenEuro.two = document.getElementById("twoTenEuro").value;
	obj.tenEuro.five = document.getElementById("fiveTenEuro").value;
	obj.hunEuro.one = document.getElementById("oneHunEuro").value;
	obj.hunEuro.two = document.getElementById("twoHunEuro").value;
	obj.hunEuro.five = document.getElementById("fiveHunEuro").value;
	console.log(obj);
	// Raw string is the default if no format is provided
	var message =  JSON.stringify(obj);
	var jsonRef = storageRef.child('money.json');
	jsonRef.putString(message);//.then(function(snapshot) {
	  //console.log('Uploaded a raw string!');
	//});
  }