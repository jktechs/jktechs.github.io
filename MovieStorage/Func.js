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

  $(document).ready(function(){
    var array = ["   the bee movie","   the lego movie","   some ather movie"];
    var newHTML = [];
    for (var i = 0; i < array.length; i++) {
      newHTML.push('<p class="item" onclick="selectId('+i+');">' + array[i] + '</p>');
    }
    $("#con").append(newHTML.join(""));
  });
  function selectId(a){
    alert('alert' + a);
  }
  function getString(){
    var pathReference = storage.ref('downt.txt');
    pathReference.getDownloadURL().then(function(url) {
      // `url` is the download URL for 'downt.txt'
      // This can be downloaded directly:
      var xhr = new XMLHttpRequest();
      xhr.responseType = '';
      xhr.onload = function(event) {
        var blob = xhr.response;
        console.log(blob);
      };
      xhr.open('GET', url);
      xhr.send();
    }).catch(function(error) {});
  }
  function sendString(s){
    // Raw string is the default if no format is provided
    var message = 'This is my message.';
	var jsonRef = storageRef.child('downt.txt');
    jsonRef.putString(s).then(function(snapshot) {
      console.log('Uploaded a raw string!');
    });
  }